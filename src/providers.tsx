import { PropsWithChildren } from 'react'
import { TasksProvider } from './contexts'

export const Providers = ({ children }: PropsWithChildren) => (
  <TasksProvider>{children}</TasksProvider>
)
