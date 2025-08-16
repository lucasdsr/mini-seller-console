import { PropsWithChildren } from 'react'
import { ThemeToggle } from '../atoms'

export const MainLayout = ({ children }: PropsWithChildren) => (
  <div className='p-6 min-h-screen bg-gray-900 text-white transition-colors duration-200'>
    <div className='flex flex-col gap-6'>
      <div className='flex justify-end'>
        <ThemeToggle />
      </div>

      {children}
    </div>
  </div>
)
