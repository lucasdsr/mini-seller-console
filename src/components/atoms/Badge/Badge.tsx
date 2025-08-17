import React, { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  className?: string
}

export const Badge = ({
  children,
  variant = 'primary',
  size = 'md',
  className = ''
}: BadgeProps) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full'

  const variantClasses = {
    primary: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    secondary: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    success:
      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    danger: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    warning:
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    info: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300',
    light: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    dark: 'bg-gray-900 text-gray-300 dark:bg-gray-700 dark:text-gray-300'
  }

  const sizeClasses = {
    xs: 'px-2 py-0.5 text-xs',
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-sm'
  }

  return (
    <span
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim()}
    >
      {children}
    </span>
  )
}
