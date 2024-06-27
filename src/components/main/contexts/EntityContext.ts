import { createContext } from 'react'

type Context = {
  entityId: number
  disableCreateEdit: boolean
  setDisableCreateEdit(payload: boolean): void
}

export const EntityContext = createContext<Context | null>(null)
