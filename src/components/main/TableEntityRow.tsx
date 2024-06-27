import { FC, useContext, useEffect, useState } from 'react'
import { TableCell, TableRow } from '@mui/material'

import { Entity } from '../../constants'
import { LevelCell } from './LevelCell'
import { useDeleteRowInEntityMutation } from '../../entityApi'
import { TableEntityCreate } from './TableEntityCreate'
import { ViewEntity } from './ViewEntity'
import { useEId } from './hooks/entityId.hook'
import { EditEntity } from './EditEntity'
import { Tree } from './Tree'
import { EntityContext } from './contexts/EntityContext'

type Props = {
  entity: Entity
  level: number
  parentId: number | null
  setDotElement(element: HTMLElement): void
}

export const TableEntityRow: FC<Props> = ({ entity, level, parentId, setDotElement }) => {
  const [remove, { isLoading }] = useDeleteRowInEntityMutation()
  const { eId } = useEId()
  const context = useContext(EntityContext)

  const [isEditing, setIsEditing] = useState(false)
  const [isShared, setIsShared] = useState(false)

  const [paper, setPaper] = useState<HTMLElement | null>(null)
  const [lastDot, setLastDot] = useState<HTMLElement | null>(null)
  const [addChildDot, setAddChildDot] = useState<HTMLElement | null>(null)

  useEffect(() => {
    function handler({ key }: KeyboardEvent) {
      if (key === 'Escape') {
        setIsEditing(false)
        setIsShared(false)
        context?.setDisableCreateEdit(false)
      }
    }

    if (isEditing || isShared) {
      document.addEventListener('keydown', handler)
    } else {
      document.removeEventListener('keydown', handler)
    }

    return () => {
      document.removeEventListener('keydown', handler)
    }
  }, [isEditing, isShared, context])

  useEffect(() => {
    if (isLoading) {
      context?.setDisableCreateEdit(true)
    }
  }, [context, isLoading])

  return (
    <>
      <Tree lastDot={isShared ? addChildDot : lastDot} paper={paper} />
      <TableRow
        onDoubleClick={() => {
          setIsEditing(true)
          context?.setDisableCreateEdit(true)
        }}
      >
        <TableCell>
          <LevelCell
            level={level}
            onEntityClick={() => {
              setIsShared(true)
              context?.setDisableCreateEdit(true)
            }}
            onRemoveClick={() => {
              remove({ eId, rId: entity.id, parentId })
            }}
            setDotElement={setDotElement}
            setPaperElement={setPaper}
          />
        </TableCell>
        {isEditing ? (
          <EditEntity entity={entity} onSuccess={() => setIsEditing(false)} />
        ) : (
          <ViewEntity entity={entity} />
        )}
      </TableRow>
      {entity.child?.filter(Boolean).map((item, index) => (
        <TableEntityRow
          key={item!.id}
          entity={item!}
          level={level + 1}
          parentId={entity.id}
          setDotElement={entity.child?.filter(Boolean).length - 1 === index ? setLastDot : () => {}}
        />
      ))}
      {isShared && (
        <TableEntityCreate
          level={level + 1}
          onSuccess={() => setIsShared(false)}
          parentId={entity.id}
          setDotElement={setAddChildDot}
        />
      )}
    </>
  )
}
