import { PropsWithChildren } from 'react'
import { Col } from '../atoms'

export const MainLayout = ({ children }: PropsWithChildren) => (
  <div className='p-4 sm:p-6 min-h-screen bg-black text-white transition-colors duration-200'>
    <Col>{children}</Col>
  </div>
)
