import { ChangeEventHandler } from 'react'

type InputType = {
  label?: string
  value?: string
  placeholder?: string
  onChange: ChangeEventHandler<HTMLInputElement>
  className?: string
}

export const Input = ({
  label,
  onChange,
  value = '',
  placeholder,
  className = ''
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
        bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 sm:p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500,
        ${className}`}
    />
  </div>
)
