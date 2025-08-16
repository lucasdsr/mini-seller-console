import { ChangeEventHandler } from 'react'

type InputType = {
  value?: string
  label?: string
  placeholder?: string
  onChange: ChangeEventHandler<HTMLInputElement>
}

export const Input = ({
  label,
  onChange,
  value = '',
  placeholder
}: InputType) => (
  <div>
    {label && (
      <label
        htmlFor='first_name'
        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
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
      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
    />
  </div>
)
