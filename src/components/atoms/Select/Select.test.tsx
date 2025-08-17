import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Select } from './Select'

describe('Select', () => {
  const mockOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ]

  const mockOnChange = () => {}

  it('renders without label', () => {
    render(<Select options={mockOptions} onChange={mockOnChange} value='' />)

    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(screen.queryByText('Label')).not.toBeInTheDocument()
  })

  it('renders with label', () => {
    render(
      <Select
        label='Test Label'
        options={mockOptions}
        onChange={mockOnChange}
        value=''
      />
    )

    expect(screen.getByText('Test Label')).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('renders all options', () => {
    render(<Select options={mockOptions} onChange={mockOnChange} value='' />)

    expect(screen.getByText('Option 1')).toBeInTheDocument()
    expect(screen.getByText('Option 2')).toBeInTheDocument()
    expect(screen.getByText('Option 3')).toBeInTheDocument()
  })

  it('renders with placeholder', () => {
    render(
      <Select
        options={mockOptions}
        onChange={mockOnChange}
        value=''
        placeholder='Select an option'
      />
    )

    expect(screen.getByText('Select an option')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(
      <Select
        options={mockOptions}
        onChange={mockOnChange}
        value=''
        className='custom-class'
      />
    )

    const selectContainer = screen.getByRole('combobox').parentElement
    expect(selectContainer).toHaveClass('custom-class')
  })
})
