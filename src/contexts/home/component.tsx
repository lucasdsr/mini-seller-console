import { PropsWithChildren } from 'react'

import { useHomeState } from './states'
import { Context } from './context'

export const HomeProvider = ({ children }: PropsWithChildren) => {
  const homeState = useHomeState()

  return <Context.Provider value={homeState}>{children}</Context.Provider>
}
