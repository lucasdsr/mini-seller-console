import { ReactNode } from 'react'

interface ColProps {
  children: ReactNode
  className?: string
}

export const Col = ({ children, className = '' }: ColProps) => (
  <div className={`flex flex-col ${className}`.trim()}>{children}</div>
)
