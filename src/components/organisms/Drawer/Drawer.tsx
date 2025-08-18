interface DrawerProps {
  children?: React.ReactNode
  isOpen?: boolean
  onClose?: () => void
  className?: string
}

export const Drawer = ({
  children,
  isOpen = false,
  onClose,
  className = ''
}: DrawerProps) => (
  <>
    {isOpen && (
      <div
        className='fixed top-0 left-0 z-30 h-screen w-[calc(100vw-20rem)] sm:w-[calc(100vw-24rem)] lg:w-[calc(100vw-33.333333%)] bg-black opacity-60'
        onClick={onClose}
        aria-hidden='true'
      />
    )}

    <div
      className={`fixed top-0 right-0 z-40 h-screen p-3 sm:p-4 overflow-y-auto transition-transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } bg-white w-[90vw] sm:w-[50vw] lg:w-[33.333333vw] dark:bg-gray-800 shadow-2xl ${className}`}
      tabIndex={-1}
      aria-labelledby='drawer-right-label'
    >
      <button
        type='button'
        className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-7 h-7 sm:w-8 sm:h-8 absolute top-2 sm:top-2.5 end-2 sm:end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white'
        onClick={onClose}
        aria-controls='drawer-right-example'
      >
        <svg
          className='w-2.5 h-2.5 sm:w-3 sm:h-3'
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
        <span className='sr-only'>Close menu</span>
      </button>
      {children}
    </div>
  </>
)
