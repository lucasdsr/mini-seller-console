import { ReactNode } from 'react'

interface RowProps {
  children: ReactNode
  className?: string
}

export const Row = ({ children, className = '' }: RowProps) => (
  <div className={`flex flex-row ${className}`.trim()}>{children}</div>
)
