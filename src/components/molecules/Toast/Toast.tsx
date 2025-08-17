import { ReactNode, useEffect } from 'react'

interface ToastProps {
  children: ReactNode
  isVisible: boolean
  onClose: () => void
  type?: 'success' | 'error' | 'warning' | 'info'
  duration?: number
  className?: string
}

export const Toast = ({
  children,
  isVisible,
  onClose,
  type = 'success',
  duration = 5000,
  className = ''
}: ToastProps) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, onClose])

  if (!isVisible) return null

  const getTypeClasses = () => {
    switch (type) {
      case 'success':
        return 'text-green-800 bg-green-50 border-green-200 dark:bg-green-800/20 dark:text-green-400 dark:border-green-800'
      case 'error':
        return 'text-red-800 bg-red-50 border-red-200 dark:bg-red-800/20 dark:text-red-400 dark:border-red-800'
      case 'warning':
        return 'text-yellow-800 bg-yellow-50 border-yellow-200 dark:bg-yellow-800/20 dark:text-yellow-400 dark:border-yellow-800'
      case 'info':
        return 'text-blue-800 bg-blue-50 border-blue-200 dark:bg-blue-800/20 dark:text-blue-400 dark:border-blue-800'
      default:
        return 'text-green-800 bg-green-50 border-green-200 dark:bg-green-800/20 dark:text-green-400 dark:border-green-800'
    }
  }

  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg
            className='w-4 h-4'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z' />
          </svg>
        )
      case 'error':
        return (
          <svg
            className='w-4 h-4'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z' />
          </svg>
        )
      case 'warning':
        return (
          <svg
            className='w-4 h-4'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z' />
          </svg>
        )
      case 'info':
        return (
          <svg
            className='w-4 h-4'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z' />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center w-full max-w-xs p-4 border rounded-lg shadow-lg ${getTypeClasses()} ${className}`}
    >
      <div className='inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200'>
        {getIcon()}
      </div>
      <div className='ms-3 text-sm font-normal'>{children}</div>
      <button
        type='button'
        className='ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700'
        onClick={onClose}
        aria-label='Fechar'
      >
        <span className='sr-only'>Fechar</span>
        <svg
          className='w-3 h-3'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 14 14'
        >
          <path
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
          />
        </svg>
      </button>
    </div>
  )
}
