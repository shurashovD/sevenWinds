import { FC } from 'react'
import { TableCell, TextField } from '@mui/material'
import { FormikProps } from 'formik'

import { ENTITY_FORM_LABELS, EntityForm } from '../../constants'

type Props = {
  formik: FormikProps<EntityForm>
}

export const TableEntityForm: FC<Props> = ({ formik }) => {
  return (
    <>
      {Object.entries(ENTITY_FORM_LABELS).map(([name, label]) => (
        <TableCell key={name}>
          <TextField
            label={label}
            onChange={formik.handleChange}
            onKeyDown={({ key }) => (key === 'Enter' ? formik.handleSubmit() : {})}
            name={name}
            size="small"
            value={formik.values[name as keyof typeof ENTITY_FORM_LABELS]}
            variant="outlined"
          />
        </TableCell>
      ))}
    </>
  )
}
