import { PropsWithChildren } from 'react'

type IContainer = {
  className?: 'string'
}

export const Container = ({
  children,
  className
}: PropsWithChildren<IContainer>) => (
  <div className={`w-full h-min p-6 bg-tertiary rounded-lg ${className}`}>
    {children}
  </div>
)
