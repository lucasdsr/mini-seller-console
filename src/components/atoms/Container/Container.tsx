import { PropsWithChildren } from 'react'
import { Col } from '../Col'

type IContainer = {
  className?: string
}

export const Container = ({
  children,
  className
}: PropsWithChildren<IContainer>) => (
  <Col
    className={`w-full gap-6 h-min p-6 bg-secondary rounded-lg ${className}`}
  >
    {children}
  </Col>
)
