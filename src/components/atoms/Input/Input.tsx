import { ChangeEventHandler } from 'react'

type InputType = {
  label?: string
  value?: string
  placeholder?: string
  onChange: ChangeEventHandler<HTMLInputElement>
  className?: string
  error?: string | null
}

export const Input = ({
  label,
  onChange,
  value = '',
  placeholder,
  className = '',
  error
}: InputType) => (
  <div>
    {label && (
      <label
        htmlFor='first_name'
        className='block mb-2 text-xs sm:text-sm font-medium text-gray-900 dark:text-white'
      >
        {label}
      </label>
    )}
    <input
      type='text'
      value={value}
      id='first_name'
      onChange={onChange}
      placeholder={placeholder}
      className={`
        bg-gray-50 border text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 sm:p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
        ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 dark:border-gray-600'}
        ${className}`.trim()}
    />
    {error && (
      <p className='mt-1 text-xs text-red-600 dark:text-red-400'>{error}</p>
    )}
  </div>
)
