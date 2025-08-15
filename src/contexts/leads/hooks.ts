import { useContext } from 'react'

import { Context } from './context'
import { UseLeadState } from './interface'

export const useLeadContext = (): UseLeadState => {
  const value = useContext(Context)

  if (!value)
    throw new Error('useLeadContext must be used insided LeadProvider')

  return value
}
