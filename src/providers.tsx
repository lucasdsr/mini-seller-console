import { PropsWithChildren } from 'react'
import { HomeProvider } from './contexts/home'

export const Providers = ({ children }: PropsWithChildren) => (
  <HomeProvider>{children}</HomeProvider>
)
