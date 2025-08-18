import React, { createContext, useContext, ReactNode } from 'react'

export interface ValidationContextType {
  validateEmail: (email: string) => string | null
}

const ValidationContext = createContext<ValidationContextType | undefined>(
  undefined
)

interface ValidationProviderProps {
  children: ReactNode
}

export const ValidationProvider = ({ children }: ValidationProviderProps) => {
  const validateEmail = (email: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address'
    }
    return null
  }

  const value: ValidationContextType = {
    validateEmail
  }

  return (
    <ValidationContext.Provider value={value}>
      {children}
    </ValidationContext.Provider>
  )
}

export const useValidation = (): ValidationContextType => {
  const context = useContext(ValidationContext)
  if (context === undefined) {
    throw new Error('useValidation must be used within a ValidationProvider')
  }
  return context
}
