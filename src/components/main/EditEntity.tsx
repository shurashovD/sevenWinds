import { FC, useContext, useEffect } from 'react'
import { useFormik } from 'formik'

import { Entity } from '../../constants'
import { entityFormFromEntity, entityFormToUpdateRowInEntity } from '../../utils'
import { TableEntityForm } from './TableEntityForm'
import { useUpateRowInEntityMutation } from '../../entityApi'
import { useEId } from './hooks/entityId.hook'
import { EntityContext } from './contexts/EntityContext'

type Props = {
  entity: Entity
  onSuccess(): void
}

export const EditEntity: FC<Props> = ({ entity, onSuccess }) => {
  const context = useContext(EntityContext)
  const [update, { isSuccess }] = useUpateRowInEntityMutation()
  const { eId } = useEId()

  useEffect(() => {
    if (isSuccess) {
      onSuccess()
      context?.setDisableCreateEdit(false)
    }
  }, [context, isSuccess, onSuccess])

  const formik = useFormik({
    initialValues: entityFormFromEntity(entity),
    onSubmit: (values) => {
      update({ body: entityFormToUpdateRowInEntity(values), eId, rId: entity.id })
    },
  })

  return <TableEntityForm formik={formik} />
}
