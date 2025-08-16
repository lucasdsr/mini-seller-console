import { PropsWithChildren } from 'react'
import { LeadsProvider, ThemeProvider } from './contexts'

export const Providers = ({ children }: PropsWithChildren) => (
  <ThemeProvider>
    <LeadsProvider>{children}</LeadsProvider>
  </ThemeProvider>
)
