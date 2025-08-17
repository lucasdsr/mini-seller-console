import React, { ReactNode, useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

interface DropdownProps {
  trigger: ReactNode
  children: ReactNode
  className?: string
  placement?: 'top' | 'bottom' | 'left' | 'right'
}

export const Dropdown = ({
  trigger,
  children,
  className = '',
  placement = 'bottom'
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const triggerRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()

      let top = 0
      let left = 0

      switch (placement) {
        case 'top':
          top = rect.top - 8 // 8px de margem
          left = rect.left
          break
        case 'bottom':
          top = rect.bottom + 8 // 8px de margem
          left = rect.left
          break
        case 'left':
          top = rect.top
          left = rect.left - 8 // 8px de margem
          break
        case 'right':
          top = rect.top
          left = rect.right + 8 // 8px de margem
          break
        default:
          top = rect.bottom + 8
          left = rect.left
      }

      setPosition({ top, left })
    }
  }, [isOpen, placement])

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false)
    }, 150) // Pequeno delay para evitar que feche muito rápido
  }

  const handleItemClick = () => {
    // Fechar dropdown quando um item for clicado
    setIsOpen(false)
  }

  // Cleanup do timeout quando o componente for desmontado
  useEffect(
    () => () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    },
    []
  )

  // Atualizar posição quando houver scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isOpen && triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect()

        let top = 0
        let left = 0

        switch (placement) {
          case 'top':
            top = rect.top - 8
            left = rect.left
            break
          case 'bottom':
            top = rect.bottom + 8
            left = rect.left
            break
          case 'left':
            top = rect.top
            left = rect.left - 8
            break
          case 'right':
            top = rect.top
            left = rect.right + 8
            break
          default:
            top = rect.bottom + 8
            left = rect.left
        }

        setPosition({ top, left })
      }
    }

    if (isOpen) {
      window.addEventListener('scroll', handleScroll, true)
      // Também escutar scroll em elementos com overflow
      document.addEventListener('scroll', handleScroll, true)
    }

    return () => {
      window.removeEventListener('scroll', handleScroll, true)
      document.removeEventListener('scroll', handleScroll, true)
    }
  }, [isOpen, placement])

  return (
    <div
      className={`relative inline-block text-left ${className}`}
      ref={triggerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div>{trigger}</div>

      {isOpen &&
        createPortal(
          <div
            ref={dropdownRef}
            className='fixed z-[9999] bg-white divide-y divide-gray-100 rounded-lg shadow-lg min-w-[120px] max-w-xs dark:bg-gray-700 dark:divide-gray-600'
            style={{
              top: position.top,
              left: position.left
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className='py-1'>
              {React.Children.map(children, child => {
                if (React.isValidElement(child)) {
                  return React.cloneElement(
                    child as React.ReactElement<{ onClick?: () => void }>,
                    {
                      onClick: () => {
                        // Executar o onClick original do item
                        if (child.props.onClick) {
                          child.props.onClick()
                        }
                        // Fechar o dropdown
                        handleItemClick()
                      }
                    }
                  )
                }
                return child
              })}
            </div>
          </div>,
          document.body
        )}
    </div>
  )
}

interface DropdownItemProps {
  children: ReactNode
  onClick?: () => void
  className?: string
  disabled?: boolean
}

export const DropdownItem = ({
  children,
  onClick,
  className = '',
  disabled = false
}: DropdownItemProps) => (
  <button
    type='button'
    className={`w-full rounded-lg px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
)
