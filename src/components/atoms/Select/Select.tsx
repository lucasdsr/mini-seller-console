import { ChangeEventHandler } from 'react'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  label?: string
  value?: string
  onChange: ChangeEventHandler<HTMLSelectElement>
  placeholder?: string
  options: SelectOption[]
  className?: string
}

export const Select = ({
  label,
  value,
  onChange,
  placeholder,
  options,
  className = ''
}: SelectProps) => (
  <div className={className}>
    {label && (
      <label
        htmlFor='select'
        className='block mb-2 text-xs sm:text-sm font-medium text-gray-900 dark:text-white'
      >
        {label}
      </label>
    )}
    <select
      id='select'
      value={value}
      onChange={onChange}
      className={`bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className}`.trim()}
    >
      {placeholder && (
        <option value='' disabled>
          {placeholder}
        </option>
      )}
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
)
