import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Button } from './Button'

describe('Button Component', () => {
  it('should render with default props', () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole('button', { name: 'Click me' })

    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('bg-blue-600', 'px-4', 'text-sm')
  })

  it('should render with primary variant by default', () => {
    render(<Button>Primary Button</Button>)
    const button = screen.getByRole('button')

    expect(button).toHaveClass('bg-blue-600', 'text-white')
  })

  it('should render with secondary variant', () => {
    render(<Button variant='secondary'>Secondary Button</Button>)
    const button = screen.getByRole('button')

    expect(button).toHaveClass('bg-gray-600', 'text-white')
  })

  it('should render with outline variant', () => {
    render(<Button variant='outline'>Outline Button</Button>)
    const button = screen.getByRole('button')

    expect(button).toHaveClass('border-blue-600', 'text-blue-600')
  })

  it('should render with small size', () => {
    render(<Button size='sm'>Small Button</Button>)
    const button = screen.getByRole('button')

    expect(button).toHaveClass('px-3', 'text-sm')
  })

  it('should render with large size', () => {
    render(<Button size='lg'>Large Button</Button>)
    const button = screen.getByRole('button')

    expect(button).toHaveClass('px-6', 'text-base')
  })

  it('should apply custom className', () => {
    render(<Button className='custom-class'>Custom Button</Button>)
    const button = screen.getByRole('button')

    expect(button).toHaveClass('custom-class')
  })

  it('should handle click events', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Clickable Button</Button>)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>)
    const button = screen.getByRole('button')

    expect(button).toBeDisabled()
  })

  it('should pass through additional HTML button attributes', () => {
    render(
      <Button type='submit' data-testid='submit-btn'>
        Submit Button
      </Button>
    )

    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('type', 'submit')
    expect(button).toHaveAttribute('data-testid', 'submit-btn')
  })

  it('should have proper focus styles', () => {
    render(<Button>Focusable Button</Button>)
    const button = screen.getByRole('button')

    expect(button).toHaveClass('focus:ring-4', 'focus:outline-none')
  })

  it('should have transition effects', () => {
    render(<Button>Transition Button</Button>)
    const button = screen.getByRole('button')

    expect(button).toHaveClass('transition-colors', 'duration-200')
  })
})
