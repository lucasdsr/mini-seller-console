import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Input } from './Input'

describe('Input Component', () => {
  const mockOnChange = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render with placeholder when provided', () => {
    render(<Input onChange={mockOnChange} placeholder='Enter text here' />)

    const input = screen.getByPlaceholderText('Enter text here')
    expect(input).toBeInTheDocument()
  })

  it('should render with initial value when provided', () => {
    const initialValue = 'Initial value'
    render(<Input onChange={mockOnChange} value={initialValue} />)

    const input = screen.getByDisplayValue(initialValue)
    expect(input).toBeInTheDocument()
  })

  it('should call onChange when input value changes', () => {
    render(<Input onChange={mockOnChange} value='' />)

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'New value' } })

    expect(mockOnChange).toHaveBeenCalledTimes(1)
  })

  it('should render label when provided', () => {
    render(<Input onChange={mockOnChange} label='Input Label' />)

    expect(screen.getByText('Input Label')).toBeInTheDocument()
  })

  it('should render error message when provided', () => {
    render(<Input onChange={mockOnChange} error='This field is required' />)

    expect(screen.getByText('This field is required')).toBeInTheDocument()
  })

  it('should apply custom className', () => {
    render(<Input onChange={mockOnChange} className='custom-class' />)

    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('custom-class')
  })

  it('should have proper input attributes', () => {
    render(<Input onChange={mockOnChange} />)

    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('type', 'text')
    expect(input).toHaveAttribute('id', 'first_name')
  })

  it('should handle empty value correctly', () => {
    render(<Input onChange={mockOnChange} value='' />)

    const input = screen.getByRole('textbox')
    expect(input).toHaveValue('')
  })

  it('should handle undefined value correctly', () => {
    render(<Input onChange={mockOnChange} />)

    const input = screen.getByRole('textbox')
    expect(input).toHaveValue('')
  })

  it('should apply error styling when error is present', () => {
    render(<Input onChange={mockOnChange} error='Error message' />)

    const input = screen.getByRole('textbox')
    expect(input).toHaveClass(
      'border-red-500',
      'focus:ring-red-500',
      'focus:border-red-500'
    )
  })

  it('should apply default styling when no error', () => {
    render(<Input onChange={mockOnChange} />)

    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('border-gray-300', 'dark:border-gray-600')
  })

  it('should handle multiple props correctly', () => {
    render(
      <Input
        onChange={mockOnChange}
        label='Test Label'
        placeholder='Test placeholder'
        value='Test value'
        className='test-class'
        error='Test error'
      />
    )

    expect(screen.getByText('Test Label')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Test placeholder')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Test value')).toBeInTheDocument()
    expect(screen.getByText('Test error')).toBeInTheDocument()

    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('test-class')
  })
})
