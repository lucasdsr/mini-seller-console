import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Dropdown, DropdownItem } from './Dropdown'

describe('Dropdown Component', () => {
  const mockTrigger = <button>Click me</button>
  const mockChildren = [
    <DropdownItem key='1' onClick={() => {}}>
      Option 1
    </DropdownItem>,
    <DropdownItem key='2' onClick={() => {}}>
      Option 2
    </DropdownItem>
  ]

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render trigger element', () => {
    render(<Dropdown trigger={mockTrigger}>{mockChildren}</Dropdown>)

    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('should not render dropdown content initially', () => {
    render(<Dropdown trigger={mockTrigger}>{mockChildren}</Dropdown>)

    expect(screen.queryByText('Option 1')).not.toBeInTheDocument()
    expect(screen.queryByText('Option 2')).not.toBeInTheDocument()
  })

  it('should show dropdown on mouse enter', async () => {
    render(<Dropdown trigger={mockTrigger}>{mockChildren}</Dropdown>)

    const trigger = screen.getByText('Click me')
    fireEvent.mouseEnter(trigger)

    await waitFor(() => {
      expect(screen.getByText('Option 1')).toBeInTheDocument()
      expect(screen.getByText('Option 2')).toBeInTheDocument()
    })
  })

  it('should hide dropdown on mouse leave', async () => {
    render(<Dropdown trigger={mockTrigger}>{mockChildren}</Dropdown>)

    const trigger = screen.getByText('Click me')
    fireEvent.mouseEnter(trigger)

    await waitFor(() => {
      expect(screen.getByText('Option 1')).toBeInTheDocument()
    })

    fireEvent.mouseLeave(trigger)

    await waitFor(
      () => {
        expect(screen.queryByText('Option 1')).not.toBeInTheDocument()
      },
      { timeout: 200 }
    )
  })

  it('should close dropdown when item is clicked', async () => {
    const handleClick = vi.fn()
    const childrenWithClick = [
      <DropdownItem key='1' onClick={handleClick}>
        Option 1
      </DropdownItem>
    ]

    render(<Dropdown trigger={mockTrigger}>{childrenWithClick}</Dropdown>)

    const trigger = screen.getByText('Click me')
    fireEvent.mouseEnter(trigger)

    await waitFor(() => {
      expect(screen.getByText('Option 1')).toBeInTheDocument()
    })

    const option = screen.getByText('Option 1')
    fireEvent.click(option)

    expect(handleClick).toHaveBeenCalledTimes(1)

    await waitFor(() => {
      expect(screen.queryByText('Option 1')).not.toBeInTheDocument()
    })
  })

  it('should apply custom className', () => {
    render(
      <Dropdown trigger={mockTrigger} className='custom-dropdown'>
        {mockChildren}
      </Dropdown>
    )

    const container = document.querySelector('.custom-dropdown')
    expect(container).toBeInTheDocument()
    expect(container).toHaveClass('custom-dropdown')
  })

  it('should position dropdown correctly for bottom placement', async () => {
    render(
      <Dropdown trigger={mockTrigger} placement='bottom'>
        {mockChildren}
      </Dropdown>
    )

    const trigger = screen.getByText('Click me')
    fireEvent.mouseEnter(trigger)

    await waitFor(() => {
      const dropdown = screen.getByText('Option 1').closest('div')
      expect(dropdown).toBeInTheDocument()
    })
  })

  it('should handle different placement options', async () => {
    const { rerender } = render(
      <Dropdown trigger={mockTrigger} placement='top'>
        {mockChildren}
      </Dropdown>
    )

    let trigger = screen.getByText('Click me')
    fireEvent.mouseEnter(trigger)

    await waitFor(() => {
      expect(screen.getByText('Option 1')).toBeInTheDocument()
    })

    rerender(
      <Dropdown trigger={mockTrigger} placement='left'>
        {mockChildren}
      </Dropdown>
    )

    trigger = screen.getByText('Click me')
    fireEvent.mouseEnter(trigger)

    await waitFor(() => {
      expect(screen.getByText('Option 1')).toBeInTheDocument()
    })
  })

  it('should render dropdown in portal', async () => {
    render(<Dropdown trigger={mockTrigger}>{mockChildren}</Dropdown>)

    const trigger = screen.getByText('Click me')
    fireEvent.mouseEnter(trigger)

    await waitFor(() => {
      const dropdown = document.querySelector('.fixed.z-\\[9999\\]')
      expect(dropdown).toBeInTheDocument()
      expect(dropdown).toHaveClass('fixed', 'z-[9999]')
    })
  })

  it('should handle scroll events and reposition dropdown', async () => {
    render(<Dropdown trigger={mockTrigger}>{mockChildren}</Dropdown>)

    const trigger = screen.getByText('Click me')
    fireEvent.mouseEnter(trigger)

    await waitFor(() => {
      expect(screen.getByText('Option 1')).toBeInTheDocument()
    })

    fireEvent.scroll(window)

    await waitFor(() => {
      expect(screen.getByText('Option 1')).toBeInTheDocument()
    })
  })

  it('should clean up timeout on unmount', async () => {
    const { unmount } = render(
      <Dropdown trigger={mockTrigger}>{mockChildren}</Dropdown>
    )

    const trigger = screen.getByText('Click me')
    fireEvent.mouseEnter(trigger)

    unmount()

    await waitFor(() => {
      expect(screen.queryByText('Option 1')).not.toBeInTheDocument()
    })
  })

  it('should handle multiple children correctly', async () => {
    const multipleChildren = [
      <DropdownItem key='1' onClick={() => {}}>
        Option 1
      </DropdownItem>,
      <DropdownItem key='2' onClick={() => {}}>
        Option 2
      </DropdownItem>,
      <DropdownItem key='3' onClick={() => {}}>
        Option 3
      </DropdownItem>
    ]

    render(<Dropdown trigger={mockTrigger}>{multipleChildren}</Dropdown>)

    const trigger = screen.getByText('Click me')
    fireEvent.mouseEnter(trigger)

    await waitFor(() => {
      expect(screen.getByText('Option 1')).toBeInTheDocument()
      expect(screen.getByText('Option 2')).toBeInTheDocument()
      expect(screen.getByText('Option 3')).toBeInTheDocument()
    })
  })

  it('should have proper styling classes', async () => {
    render(<Dropdown trigger={mockTrigger}>{mockChildren}</Dropdown>)

    const trigger = screen.getByText('Click me')
    fireEvent.mouseEnter(trigger)

    await waitFor(() => {
      const dropdown = document.querySelector('.fixed.z-\\[9999\\]')
      expect(dropdown).toHaveClass(
        'bg-white',
        'divide-y',
        'divide-gray-100',
        'rounded-lg',
        'shadow-lg'
      )
    })
  })

  it('should handle disabled dropdown items', async () => {
    const childrenWithDisabled = [
      <DropdownItem key='1' onClick={() => {}} disabled>
        Disabled Option
      </DropdownItem>
    ]

    render(<Dropdown trigger={mockTrigger}>{childrenWithDisabled}</Dropdown>)

    const trigger = screen.getByText('Click me')
    fireEvent.mouseEnter(trigger)

    await waitFor(() => {
      const disabledOption = screen.getByText('Disabled Option')
      expect(disabledOption).toHaveClass(
        'disabled:opacity-50',
        'disabled:cursor-not-allowed'
      )
    })
  })
})

describe('DropdownItem Component', () => {
  it('should render children correctly', () => {
    render(<DropdownItem onClick={() => {}}>Test Item</DropdownItem>)

    expect(screen.getByText('Test Item')).toBeInTheDocument()
  })

  it('should call onClick when clicked', () => {
    const handleClick = vi.fn()
    render(<DropdownItem onClick={handleClick}>Clickable Item</DropdownItem>)

    const item = screen.getByText('Clickable Item')
    fireEvent.click(item)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should apply custom className', () => {
    render(
      <DropdownItem onClick={() => {}} className='custom-item'>
        Custom Item
      </DropdownItem>
    )

    const item = screen.getByText('Custom Item')
    expect(item).toHaveClass('custom-item')
  })

  it('should be disabled when disabled prop is true', () => {
    render(
      <DropdownItem onClick={() => {}} disabled>
        Disabled Item
      </DropdownItem>
    )

    const item = screen.getByText('Disabled Item')
    expect(item).toBeDisabled()
  })

  it('should have proper styling classes', () => {
    render(<DropdownItem onClick={() => {}}>Styled Item</DropdownItem>)

    const item = screen.getByText('Styled Item')
    expect(item).toHaveClass(
      'w-full',
      'rounded-lg',
      'px-3',
      'py-1.5',
      'text-left'
    )
  })

  it('should handle hover states', () => {
    render(<DropdownItem onClick={() => {}}>Hover Item</DropdownItem>)

    const item = screen.getByText('Hover Item')
    expect(item).toHaveClass('hover:bg-gray-100')
  })
})
