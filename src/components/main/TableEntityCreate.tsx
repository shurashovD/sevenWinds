import { FC, useContext, useEffect } from 'react'
import { TableCell, TableRow } from '@mui/material'
import { useFormik } from 'formik'

import { EntityForm } from '../../constants'
import { LevelCell } from './LevelCell'
import { TableEntityForm } from './TableEntityForm'
import { useCreateRowInEntityMutation } from '../../entityApi'
import { entityFormToCreateRowInEntity } from '../../utils'
import { useEId } from './hooks/entityId.hook'
import { EntityContext } from './contexts/EntityContext'

type Props = {
  level: number
  onSuccess(): void
  parentId: number | null
  setDotElement(element: HTMLElement): void
}

const initialValues: EntityForm = {
  equipmentCosts: '0',
  estimatedProfit: '0',
  overheads: '0',
  rowName: '',
  salary: '0',
}

export const TableEntityCreate: FC<Props> = ({ level, onSuccess, parentId, setDotElement }) => {
  const context = useContext(EntityContext)
  const [create, { isSuccess }] = useCreateRowInEntityMutation()
  const { eId } = useEId()

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      create({
        body: entityFormToCreateRowInEntity(values, parentId),
        id: eId,
      })
    },
  })

  useEffect(() => {
    if (isSuccess) {
      onSuccess()
      context?.setDisableCreateEdit(false)
    }
  }, [context, isSuccess, onSuccess])

  return (
    <TableRow>
      <TableCell>
        <LevelCell
          level={level}
          onEntityClick={() => {}}
          onRemoveClick={() => {}}
          setDotElement={setDotElement}
          setPaperElement={() => {}}
        />
      </TableCell>
      <TableEntityForm formik={formik} />
    </TableRow>
  )
}
