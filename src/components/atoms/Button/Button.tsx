import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) => {
  const baseClasses =
    'h-10 font-medium rounded-lg focus:ring-4 focus:outline-none transition-colors duration-200'

  const variantClasses = {
    primary:
      'text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
    secondary:
      'text-white bg-gray-600 hover:bg-gray-700 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800',
    outline:
      'text-blue-600 border border-blue-600 hover:bg-blue-50 focus:ring-blue-300 dark:text-blue-500 dark:border-blue-500 dark:hover:bg-blue-900 dark:focus:ring-blue-800'
  }

  const sizeClasses = {
    sm: 'px-3 text-sm',
    md: 'px-4 text-sm',
    lg: 'px-6 text-base'
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  )
}
