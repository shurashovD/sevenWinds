import { useContext } from 'react'
import { EntityContext } from '../contexts/EntityContext'

export const useEId = () => {
  const context = useContext(EntityContext)!

  return { eId: context.entityId }
}
