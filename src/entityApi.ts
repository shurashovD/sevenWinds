import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  CreateRowInEntity,
  Entity,
  EntityChild,
  EntityMutationResponse,
  UpdateRowInEntity,
} from './constants'
import { findByIdInEntitiesTree, mutateFlatFieldsInEntitesTree } from './utils'

export const entityApi = createApi({
  reducerPath: 'entityApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://185.244.172.108:8081',
  }),
  tagTypes: ['Entity'],
  endpoints: (build) => ({
    getEnityRowList: build.query<Entity[], string>({
      query: (id) => ({ url: `/v1/outlay-rows/entity/${id}/row/list` }),
      providesTags: () => ['Entity'],
    }),
    createRootEntity: build.mutation<undefined, void>({
      query: () => ({
        url: '/v1/outlay-rows/entity/create',
        method: 'POST',
      }),
    }),
    createRowInEntity: build.mutation<
      EntityMutationResponse,
      { id: number; body: CreateRowInEntity }
    >({
      query: ({ body, id }) => ({
        body,
        url: `/v1/outlay-rows/entity/${id}/row/create`,
        method: 'POST',
      }),
      async onQueryStarted({ body, id }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(
            entityApi.util.updateQueryData('getEnityRowList', id.toString(), (draft) => {
              if (!data.current) {
                return
              }

              if (body.parentId) {
                const parentEntity = findByIdInEntitiesTree(draft, body.parentId)
                if (parentEntity) {
                  parentEntity.child = [
                    ...(parentEntity.child?.filter(Boolean) || []),
                    data.current,
                  ] as EntityChild
                } else {
                  console.warn('Родительская сущность не найдена в сторе')
                }
              } else {
                draft.push(data.current)
              }

              data.changed
                .filter(Boolean)
                .forEach((item) => mutateFlatFieldsInEntitesTree(draft, item!))
            }),
          )
        } catch (e) {
          console.log(e)
        }
      },
    }),
    upateRowInEntity: build.mutation<
      EntityMutationResponse,
      { eId: number; rId: number; body: UpdateRowInEntity }
    >({
      query: ({ body, eId, rId }) => ({
        body,
        url: `/v1/outlay-rows/entity/${eId}/row/${rId}/update`,
        method: 'POST',
      }),
      async onQueryStarted({ eId }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(
            entityApi.util.updateQueryData('getEnityRowList', eId.toString(), (draft) => {
              if (!data.current) {
                return
              }

              mutateFlatFieldsInEntitesTree(draft, data.current)

              data.changed
                .filter(Boolean)
                .forEach((item) => mutateFlatFieldsInEntitesTree(draft, item!))
            }),
          )
        } catch (e) {
          console.log(e)
        }
      },
    }),
    deleteRowInEntity: build.mutation<
      EntityMutationResponse,
      { eId: number; rId: number; parentId: number | null }
    >({
      query: ({ eId, rId }) => ({
        url: `/v1/outlay-rows/entity/${eId}/row/${rId}/delete`,
        method: 'DELETE',
      }),
      async onQueryStarted({ eId, rId, parentId }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(
            entityApi.util.updateQueryData('getEnityRowList', eId.toString(), (draft) => {
              const entities = parentId
                ? findByIdInEntitiesTree(draft, parentId)?.child || []
                : draft

              const index = entities.findIndex((item) => item?.id === rId)
              if (index !== -1) {
                entities.splice(index, 1)
              }

              data.changed
                .filter(Boolean)
                .forEach((item) => mutateFlatFieldsInEntitesTree(draft, item!))
            }),
          )
        } catch (e) {
          console.log(e)
        }
      },
    }),
  }),
})

export const {
  useCreateRootEntityMutation,
  useGetEnityRowListQuery,
  useCreateRowInEntityMutation,
  useDeleteRowInEntityMutation,
  useUpateRowInEntityMutation,
} = entityApi
