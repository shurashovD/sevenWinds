import { configureStore } from '@reduxjs/toolkit'
import { entityApi } from './entityApi'

export const store = configureStore({
  reducer: {
    [entityApi.reducerPath]: entityApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(entityApi.middleware),
})
