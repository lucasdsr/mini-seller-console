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
        return 'text-white bg-green-600 border-green-700 shadow-green-200/20'
      case 'error':
        return 'text-white bg-red-600 border-red-700 shadow-red-200/20'
      case 'warning':
        return 'text-white bg-yellow-600 border-yellow-700 shadow-yellow-200/20'
      case 'info':
        return 'text-white bg-blue-600 border-blue-700 shadow-blue-200/20'
      default:
        return 'text-white bg-green-600 border-green-700 shadow-green-200/20'
    }
  }

  const getIconClasses = () => {
    switch (type) {
      case 'success':
        return 'text-green-100 bg-green-700/30'
      case 'error':
        return 'text-red-100 bg-red-700/30'
      case 'warning':
        return 'text-yellow-100 bg-yellow-700/30'
      case 'info':
        return 'text-blue-100 bg-blue-700/30'
      default:
        return 'text-green-100 bg-green-700/30'
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
      className={`fixed top-4 right-4 z-50 flex items-center w-full max-w-sm p-4 border rounded-lg shadow-lg backdrop-blur-sm ${getTypeClasses()} ${className}`}
    >
      <div
        className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg ${getIconClasses()}`}
      >
        {getIcon()}
      </div>
      <div className='ms-3 text-sm font-medium flex-1'>{children}</div>
      <button
        type='button'
        className='ms-auto -mx-1.5 -my-1.5 text-white/80 hover:text-white rounded-lg focus:ring-2 focus:ring-white/20 p-1.5 hover:bg-white/10 inline-flex items-center justify-center h-8 w-8 transition-colors'
        onClick={onClose}
        aria-label='Close'
      >
        <span className='sr-only'>Close</span>
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
