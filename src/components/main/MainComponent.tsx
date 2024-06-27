import { useCallback, useState } from 'react'
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, styled } from '@mui/material'

import { useGetEnityRowListQuery } from '../../entityApi'
import { TableEntityCreate } from './TableEntityCreate'
import { ENTITY_COLUMNS } from '../../constants'
import { TableEntityRow } from './TableEntityRow'
import { EntityContext } from './contexts/EntityContext'

const ROOT_ENTITY_ID = 128713

const TH = styled(TableCell)(({ theme }) => ({
  color: theme.palette.text.disabled,
  width: '18%',
}))

export const MainComponent = () => {
  const { data, isError, isLoading } = useGetEnityRowListQuery(ROOT_ENTITY_ID.toString())
  const [disableCreateEdit, setDisableCreateEdit] = useState(false)

  const setDisableCreateEditMemo = useCallback((payload: boolean) => {
    setDisableCreateEdit(payload)
  }, [])

  const showTableEntityCreate = !data?.length && !isLoading && !isError

  return (
    <Paper>
      <Table>
        <TableHead sx={({ palette }) => ({ color: palette.text.disabled })}>
          <TableRow>
            {Object.entries(ENTITY_COLUMNS).map(([name, label]) => (
              <TH key={name}>{label}</TH>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <EntityContext.Provider
            value={{
              entityId: ROOT_ENTITY_ID,
              disableCreateEdit,
              setDisableCreateEdit: setDisableCreateEditMemo,
            }}
          >
            {data?.map((item) => (
              <TableEntityRow
                key={item.id}
                entity={item}
                level={0}
                parentId={null}
                setDotElement={() => {}}
              />
            ))}
            {showTableEntityCreate && (
              <TableEntityCreate
                level={0}
                onSuccess={() => {}}
                parentId={null}
                setDotElement={() => {}}
              />
            )}
          </EntityContext.Provider>
        </TableBody>
      </Table>
    </Paper>
  )
}
