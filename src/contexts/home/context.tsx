import { createContext } from 'react'

import { HomeContextData } from './interface'

export const Context = createContext<HomeContextData | null>(null)
