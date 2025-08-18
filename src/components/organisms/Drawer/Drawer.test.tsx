import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Drawer } from './Drawer'

const defaultProps = {
  isOpen: false,
  onClose: vi.fn(),
  children: <div>Drawer content</div>
}

describe('Drawer Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should always render but be hidden when isOpen is false', () => {
    render(<Drawer {...defaultProps} />)

    expect(screen.getByText('Drawer content')).toBeInTheDocument()
    const drawerContainer = document.querySelector('.fixed.top-0.right-0.z-40')
    expect(drawerContainer).toHaveClass('translate-x-full')
  })

  it('should render and be visible when isOpen is true', () => {
    render(<Drawer {...defaultProps} isOpen={true} />)

    expect(screen.getByText('Drawer content')).toBeInTheDocument()
    const drawerContainer = document.querySelector('.fixed.top-0.right-0.z-40')
    expect(drawerContainer).toHaveClass('translate-x-0')
  })

  it('should render close button when open', () => {
    render(<Drawer {...defaultProps} isOpen={true} />)

    const closeButton = screen.getByRole('button')
    expect(closeButton).toHaveAttribute('aria-controls', 'drawer-right-example')
  })

  it('should call onClose when close button is clicked', () => {
    render(<Drawer {...defaultProps} isOpen={true} />)

    const closeButton = screen.getByRole('button')
    fireEvent.click(closeButton)

    expect(defaultProps.onClose).toHaveBeenCalledTimes(1)
  })

  it('should call onClose when overlay is clicked', () => {
    render(<Drawer {...defaultProps} isOpen={true} />)

    const overlay = document.querySelector('.fixed.top-0.left-0.z-30.h-screen')
    fireEvent.click(overlay!)

    expect(defaultProps.onClose).toHaveBeenCalledTimes(1)
  })

  it('should not call onClose when onClose is not provided', () => {
    render(<Drawer {...defaultProps} isOpen={true} onClose={undefined} />)

    const closeButton = screen.getByRole('button')
    fireEvent.click(closeButton)

    expect(defaultProps.onClose).not.toHaveBeenCalled()
  })

  it('should apply correct transform classes based on open state', () => {
    const { rerender } = render(<Drawer {...defaultProps} isOpen={false} />)

    let drawerContainer = document.querySelector('.fixed.top-0.right-0.z-40')
    expect(drawerContainer).toHaveClass('translate-x-full')

    rerender(<Drawer {...defaultProps} isOpen={true} />)

    drawerContainer = document.querySelector('.fixed.top-0.right-0.z-40')
    expect(drawerContainer).toHaveClass('translate-x-0')
  })

  it('should apply closed transform when not open', () => {
    render(<Drawer {...defaultProps} isOpen={false} />)

    const drawerContainer = document.querySelector('.fixed.top-0.right-0.z-40')
    expect(drawerContainer).toHaveClass('translate-x-full')
  })

  it('should apply custom className', () => {
    render(<Drawer {...defaultProps} isOpen={true} className='custom-drawer' />)

    const drawerContainer = document.querySelector('.fixed.top-0.right-0.z-40')
    expect(drawerContainer).toHaveClass('custom-drawer')
  })

  it('should have proper positioning classes', () => {
    render(<Drawer {...defaultProps} isOpen={true} />)

    const drawerContainer = document.querySelector('.fixed.top-0.right-0.z-40')
    expect(drawerContainer).toHaveClass('fixed', 'top-0', 'right-0')
  })

  it('should have proper z-index', () => {
    render(<Drawer {...defaultProps} isOpen={true} />)

    const drawerContainer = document.querySelector('.fixed.top-0.right-0.z-40')
    expect(drawerContainer).toHaveClass('z-40')
  })

  it('should have proper overlay styling', () => {
    render(<Drawer {...defaultProps} isOpen={true} />)

    const overlay = document.querySelector('.fixed.top-0.left-0.z-30.h-screen')
    expect(overlay).toHaveClass('bg-black', 'opacity-60')
  })

  it('should have proper overlay positioning', () => {
    render(<Drawer {...defaultProps} isOpen={true} />)

    const overlay = document.querySelector('.fixed.top-0.left-0.z-30.h-screen')
    expect(overlay).toHaveClass('fixed', 'top-0', 'left-0', 'z-30')
  })

  it('should have proper width classes', () => {
    render(<Drawer {...defaultProps} isOpen={true} />)

    const drawerContainer = document.querySelector('.fixed.top-0.right-0.z-40')
    expect(drawerContainer).toHaveClass(
      'w-[90vw]',
      'sm:w-[50vw]',
      'lg:w-[33.333333vw]'
    )
  })

  it('should have proper height', () => {
    render(<Drawer {...defaultProps} isOpen={true} />)

    const drawerContainer = document.querySelector('.fixed.top-0.right-0.z-40')
    expect(drawerContainer).toHaveClass('h-screen')
  })

  it('should have proper overflow handling', () => {
    render(<Drawer {...defaultProps} isOpen={true} />)

    const drawerContainer = document.querySelector('.fixed.top-0.right-0.z-40')
    expect(drawerContainer).toHaveClass('overflow-y-auto')
  })

  it('should have proper transition effects', () => {
    render(<Drawer {...defaultProps} isOpen={true} />)

    const drawerContainer = document.querySelector('.fixed.top-0.right-0.z-40')
    expect(drawerContainer).toHaveClass('transition-transform')
  })

  it('should have proper padding', () => {
    render(<Drawer {...defaultProps} isOpen={true} />)

    const drawerContainer = document.querySelector('.fixed.top-0.right-0.z-40')
    expect(drawerContainer).toHaveClass('p-3', 'sm:p-4')
  })

  it('should have proper background color', () => {
    render(<Drawer {...defaultProps} isOpen={true} />)

    const drawerContainer = document.querySelector('.fixed.top-0.right-0.z-40')
    expect(drawerContainer).toHaveClass('bg-white', 'dark:bg-gray-800')
  })

  it('should have proper shadow', () => {
    render(<Drawer {...defaultProps} isOpen={true} />)

    const drawerContainer = document.querySelector('.fixed.top-0.right-0.z-40')
    expect(drawerContainer).toHaveClass('shadow-2xl')
  })

  it('should have proper tab index', () => {
    render(<Drawer {...defaultProps} isOpen={true} />)

    const drawerContainer = document.querySelector('.fixed.top-0.right-0.z-40')
    expect(drawerContainer).toHaveAttribute('tabIndex', '-1')
  })

  it('should have proper aria label', () => {
    render(<Drawer {...defaultProps} isOpen={true} />)

    const drawerContainer = document.querySelector('.fixed.top-0.right-0.z-40')
    expect(drawerContainer).toHaveAttribute(
      'aria-labelledby',
      'drawer-right-label'
    )
  })

  it('should handle complex children', () => {
    const complexChildren = (
      <div>
        <h2>Drawer Title</h2>
        <p>Some content</p>
      </div>
    )

    render(
      <Drawer {...defaultProps} isOpen={true}>
        {complexChildren}
      </Drawer>
    )

    expect(screen.getByText('Drawer Title')).toBeInTheDocument()
    expect(screen.getByText('Some content')).toBeInTheDocument()
  })

  it('should handle overlay click correctly', () => {
    render(<Drawer {...defaultProps} isOpen={true} />)

    const overlay = document.querySelector('.fixed.top-0.left-0.z-30.h-screen')
    expect(overlay).toHaveAttribute('aria-hidden', 'true')
  })
})
