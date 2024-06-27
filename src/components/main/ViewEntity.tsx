import { FC } from 'react'
import { TableCell } from '@mui/material'

import { ENTITY_FORM_LABELS, Entity } from '../../constants'

export const ViewEntity: FC<{ entity: Entity }> = ({ entity }) => {
  return (
    <>
      {Object.keys(ENTITY_FORM_LABELS).map((item) => (
        <TableCell key={item}>{entity[item as keyof typeof ENTITY_FORM_LABELS]}</TableCell>
      ))}
    </>
  )
}
