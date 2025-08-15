import { createContext } from 'react'

import { UseLeadState } from './interface'

export const Context = createContext<UseLeadState | null>(null)
