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
    {/* Overlay escuro e transparente - apenas à esquerda do Drawer */}
    {isOpen && (
      <div
        className='fixed top-0 left-0 z-30 h-screen w-[calc(100vw-24rem)] bg-black opacity-60'
        onClick={onClose}
        aria-hidden='true'
      />
    )}

    <div
      className={`fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } bg-white w-1/3 dark:bg-gray-800 shadow-2xl ${className}`}
      tabIndex={-1}
      aria-labelledby='drawer-right-label'
    >
      <button
        type='button'
        className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white'
        onClick={onClose}
        aria-controls='drawer-right-example'
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
        <span className='sr-only'>Close menu</span>
      </button>
      {children}
    </div>
  </>
)
