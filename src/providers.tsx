import { PropsWithChildren } from 'react'
import { LeadsProvider } from './contexts'

export const Providers = ({ children }: PropsWithChildren) => (
  <LeadsProvider>{children}</LeadsProvider>
)
