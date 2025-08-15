import { PropsWithChildren } from 'react'

export const MainLayout = ({ children }: PropsWithChildren) => (
  <div className='m-0 flex justify-center min-w-80 min-h-screen font-sans leading-normal font-normal text-white/87 bg-gray-900 antialiased'>
    {children}
  </div>
)
