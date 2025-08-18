interface EmptyTableStateProps {
  title: string
  description: string
}

export const EmptyTableState = ({
  title,
  description
}: EmptyTableStateProps) => (
  <div className='text-center py-6 sm:py-8 text-gray-500 dark:text-gray-400'>
    <svg
      className='mx-auto h-8 w-8 sm:h-12 sm:w-12 text-gray-400'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
      />
    </svg>
    <h3 className='mt-2 text-base sm:text-sm font-medium text-gray-900 dark:text-white'>
      {title}
    </h3>
    <p className='mt-1 text-sm sm:text-sm text-gray-500 dark:text-gray-400 px-4 sm:px-0'>
      {description}
    </p>
  </div>
)
