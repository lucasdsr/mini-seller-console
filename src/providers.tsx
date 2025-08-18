import { PropsWithChildren } from 'react'
import { HomeProvider } from './contexts/home'
import { ValidationProvider } from './contexts/validation'

export const Providers = ({ children }: PropsWithChildren) => (
  <ValidationProvider>
    <HomeProvider>{children}</HomeProvider>
  </ValidationProvider>
)
