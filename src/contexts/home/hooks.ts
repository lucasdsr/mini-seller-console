import { useContext } from 'react'

import { Context } from './context'

export const useHomeContext = () => {
  const context = useContext(Context)
  if (!context) {
    throw new Error('useHomeContext must be used within a HomeProvider')
  }
  return context
}
