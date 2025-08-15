import { PropsWithChildren } from 'react'

import { useLeadState } from './state'
import { Context } from './context'
import { contextDefaultValue } from './consts'

export const LeadsProvider = ({ children }: PropsWithChildren) => {
  const leadsState = useLeadState()

  const value = { ...contextDefaultValue, ...leadsState }

  return <Context.Provider value={value}>{children}</Context.Provider>
}
