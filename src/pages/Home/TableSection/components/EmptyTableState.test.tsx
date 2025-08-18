import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { EmptyTableState } from './EmptyTableState'

describe('EmptyTableState Component', () => {
  const defaultProps = {
    title: 'No items found',
    description: 'Try adding some items to see them here'
  }

  it('should render the title correctly', () => {
    render(<EmptyTableState {...defaultProps} />)

    expect(screen.getByText('No items found')).toBeInTheDocument()
  })

  it('should render the description correctly', () => {
    render(<EmptyTableState {...defaultProps} />)

    expect(
      screen.getByText('Try adding some items to see them here')
    ).toBeInTheDocument()
  })

  it('should render the document icon', () => {
    render(<EmptyTableState {...defaultProps} />)

    const icon = document.querySelector('svg')
    expect(icon).toBeInTheDocument()
  })

  it('should have proper icon styling', () => {
    render(<EmptyTableState {...defaultProps} />)

    const icon = document.querySelector('svg')
    expect(icon).toHaveClass(
      'mx-auto',
      'h-8',
      'w-8',
      'sm:h-12',
      'sm:w-12',
      'text-gray-400'
    )
  })

  it('should have proper icon viewBox', () => {
    render(<EmptyTableState {...defaultProps} />)

    const icon = document.querySelector('svg')
    expect(icon).toHaveAttribute('viewBox', '0 0 24 24')
  })

  it('should have proper icon stroke attributes', () => {
    render(<EmptyTableState {...defaultProps} />)

    const icon = document.querySelector('svg')
    expect(icon).toHaveAttribute('stroke', 'currentColor')
    expect(icon).toHaveAttribute('fill', 'none')
  })

  it('should have proper container styling', () => {
    render(<EmptyTableState {...defaultProps} />)

    const container = screen.getByText('No items found').closest('div')
    expect(container).toHaveClass(
      'text-center',
      'py-6',
      'sm:py-8',
      'text-gray-500',
      'dark:text-gray-400'
    )
  })

  it('should have proper title styling', () => {
    render(<EmptyTableState {...defaultProps} />)

    const title = screen.getByText('No items found')
    expect(title).toHaveClass(
      'mt-2',
      'text-base',
      'sm:text-sm',
      'font-medium',
      'text-gray-900',
      'dark:text-white'
    )
  })

  it('should have proper description styling', () => {
    render(<EmptyTableState {...defaultProps} />)

    const description = screen.getByText(
      'Try adding some items to see them here'
    )
    expect(description).toHaveClass(
      'mt-1',
      'text-sm',
      'sm:text-sm',
      'text-gray-500',
      'dark:text-gray-400',
      'px-4',
      'sm:px-0'
    )
  })

  it('should handle different title and description content', () => {
    const customProps = {
      title: 'Custom Empty State',
      description: 'This is a custom message for when there are no items'
    }

    render(<EmptyTableState {...customProps} />)

    expect(screen.getByText('Custom Empty State')).toBeInTheDocument()
    expect(
      screen.getByText('This is a custom message for when there are no items')
    ).toBeInTheDocument()
  })

  it('should handle long title and description text', () => {
    const longProps = {
      title:
        'This is a very long title that might wrap to multiple lines and should still look good',
      description:
        'This is a very long description that contains a lot of text and might also wrap to multiple lines, but the component should handle it gracefully'
    }

    render(<EmptyTableState {...longProps} />)

    expect(screen.getByText(longProps.title)).toBeInTheDocument()
    expect(screen.getByText(longProps.description)).toBeInTheDocument()
  })

  it('should handle special characters in text', () => {
    const specialProps = {
      title: 'Special chars: !@#$%^&*()',
      description: 'Unicode: ñáéíóú, emojis: 🚀✨🎉'
    }

    render(<EmptyTableState {...specialProps} />)

    expect(screen.getByText('Special chars: !@#$%^&*()')).toBeInTheDocument()
    expect(
      screen.getByText('Unicode: ñáéíóú, emojis: 🚀✨🎉')
    ).toBeInTheDocument()
  })

  it('should have proper responsive behavior', () => {
    render(<EmptyTableState {...defaultProps} />)

    const icon = document.querySelector('svg')
    const title = screen.getByText('No items found')
    const description = screen.getByText(
      'Try adding some items to see them here'
    )

    expect(icon).toHaveClass('h-8', 'w-8', 'sm:h-12', 'sm:w-12')
    expect(title).toHaveClass('text-base', 'sm:text-sm')
    expect(description).toHaveClass('text-sm', 'sm:text-sm')
  })

  it('should have proper dark mode support', () => {
    render(<EmptyTableState {...defaultProps} />)

    const container = screen.getByText('No items found').closest('div')
    const title = screen.getByText('No items found')
    const description = screen.getByText(
      'Try adding some items to see them here'
    )

    expect(container).toHaveClass('dark:text-gray-400')
    expect(title).toHaveClass('dark:text-white')
    expect(description).toHaveClass('dark:text-gray-400')
  })

  it('should maintain proper spacing between elements', () => {
    render(<EmptyTableState {...defaultProps} />)

    const title = screen.getByText('No items found')
    const description = screen.getByText(
      'Try adding some items to see them here'
    )

    expect(title).toHaveClass('mt-2')
    expect(description).toHaveClass('mt-1')
  })

  it('should have proper padding for different screen sizes', () => {
    render(<EmptyTableState {...defaultProps} />)

    const container = screen.getByText('No items found').closest('div')
    expect(container).toHaveClass('py-6', 'sm:py-8')
  })

  it('should handle empty strings gracefully', () => {
    const emptyProps = {
      title: '',
      description: ''
    }

    render(<EmptyTableState {...emptyProps} />)

    const title = screen.getByRole('heading')
    const description = document.querySelector('p')

    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
  })
})
