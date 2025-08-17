import { ReactNode, useEffect } from 'react'

interface ModalProps {
  children: ReactNode
  isOpen: boolean
  onClose: () => void
  title?: string
  size?:
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | '7xl'
  showCloseButton?: boolean
  className?: string
}

export const Modal = ({
  children,
  isOpen,
  onClose,
  title,
  size = 'md',
  showCloseButton = true,
  className = ''
}: ModalProps) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl'
  }

  return (
    <>
      {/* Overlay de fundo - atrás de tudo */}
      <div
        className='fixed inset-0 z-40 bg-gray-900 opacity-80 transition-opacity'
        onClick={onClose}
        aria-hidden='true'
      />

      {/* Container da modal - na frente */}
      <div className='fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none'>
        <div
          className={`relative w-full ${sizeClasses[size]} bg-white rounded-lg shadow-xl dark:bg-gray-800 ${className} pointer-events-auto`}
          role='dialog'
          aria-modal='true'
          aria-labelledby={title ? 'modal-title' : undefined}
        >
          {(title || showCloseButton) && (
            <div className='flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700'>
              {title && (
                <h3
                  id='modal-title'
                  className='text-xl font-semibold text-gray-900 dark:text-white'
                >
                  {title}
                </h3>
              )}
              {showCloseButton && (
                <button
                  type='button'
                  className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
                  onClick={onClose}
                  aria-label='Fechar modal'
                >
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
                  <span className='sr-only'>Fechar modal</span>
                </button>
              )}
            </div>
          )}

          <div className='p-4'>{children}</div>
        </div>
      </div>
    </>
  )
}
