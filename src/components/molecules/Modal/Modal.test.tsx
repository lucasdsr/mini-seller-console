import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Modal } from './Modal'

describe('Modal Component', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    children: <div>Modal content</div>
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should not render when isOpen is false', () => {
    render(<Modal {...defaultProps} isOpen={false} />)

    expect(screen.queryByText('Modal content')).not.toBeInTheDocument()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('should render when isOpen is true', () => {
    render(<Modal {...defaultProps} />)

    expect(screen.getByText('Modal content')).toBeInTheDocument()
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('should render with title when provided', () => {
    render(<Modal {...defaultProps} title='Test Modal' />)

    expect(screen.getByText('Test Modal')).toBeInTheDocument()
    expect(screen.getByRole('dialog')).toHaveAttribute(
      'aria-labelledby',
      'modal-title'
    )
  })

  it('should render without title when not provided', () => {
    render(<Modal {...defaultProps} />)

    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument()
    expect(screen.getByRole('dialog')).not.toHaveAttribute('aria-labelledby')
  })

  it('should render close button by default', () => {
    render(<Modal {...defaultProps} />)

    expect(screen.getByLabelText('Close modal')).toBeInTheDocument()
  })

  it('should not render close button when showCloseButton is false', () => {
    render(<Modal {...defaultProps} showCloseButton={false} />)

    expect(screen.queryByLabelText('Close modal')).not.toBeInTheDocument()
  })

  it('should call onClose when close button is clicked', () => {
    render(<Modal {...defaultProps} />)

    const closeButton = screen.getByLabelText('Close modal')
    fireEvent.click(closeButton)

    expect(defaultProps.onClose).toHaveBeenCalledTimes(1)
  })

  it('should call onClose when backdrop is clicked', () => {
    render(<Modal {...defaultProps} />)

    const backdrop = document.querySelector(
      '.fixed.inset-0.z-40.bg-gray-900.opacity-80'
    )
    fireEvent.click(backdrop!)

    expect(defaultProps.onClose).toHaveBeenCalledTimes(1)
  })

  it('should call onClose when Escape key is pressed', async () => {
    render(<Modal {...defaultProps} />)

    fireEvent.keyDown(document, { key: 'Escape' })

    await waitFor(() => {
      expect(defaultProps.onClose).toHaveBeenCalledTimes(1)
    })
  })

  it('should apply correct size classes', () => {
    const { rerender } = render(<Modal {...defaultProps} size='sm' />)
    expect(screen.getByRole('dialog')).toHaveClass('max-w-sm')

    rerender(<Modal {...defaultProps} size='lg' />)
    expect(screen.getByRole('dialog')).toHaveClass('max-w-lg')

    rerender(<Modal {...defaultProps} size='2xl' />)
    expect(screen.getByRole('dialog')).toHaveClass('max-w-2xl')
  })

  it('should apply custom className', () => {
    render(<Modal {...defaultProps} className='custom-modal' />)

    expect(screen.getByRole('dialog')).toHaveClass('custom-modal')
  })

  it('should have proper accessibility attributes', () => {
    render(<Modal {...defaultProps} title='Accessible Modal' />)

    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveAttribute('aria-modal', 'true')
    expect(dialog).toHaveAttribute('aria-labelledby', 'modal-title')
  })

  it('should hide body scroll when modal is open', () => {
    render(<Modal {...defaultProps} />)

    expect(document.body.style.overflow).toBe('hidden')
  })

  it('should restore body scroll when modal is closed', () => {
    const { rerender } = render(<Modal {...defaultProps} />)

    expect(document.body.style.overflow).toBe('hidden')

    rerender(<Modal {...defaultProps} isOpen={false} />)

    expect(document.body.style.overflow).toBe('unset')
  })

  it('should clean up event listeners on unmount', () => {
    const { unmount } = render(<Modal {...defaultProps} />)

    unmount()

    fireEvent.keyDown(document, { key: 'Escape' })
    expect(defaultProps.onClose).not.toHaveBeenCalled()
  })

  it('should render children in content area', () => {
    render(
      <Modal {...defaultProps}>
        <div data-testid='custom-content'>Custom modal content</div>
      </Modal>
    )

    expect(screen.getByTestId('custom-content')).toBeInTheDocument()
    expect(screen.getByText('Custom modal content')).toBeInTheDocument()
  })

  it('should have proper z-index layering', () => {
    render(<Modal {...defaultProps} />)

    const backdrop = document.querySelector(
      '.fixed.inset-0.z-40.bg-gray-900.opacity-80'
    )
    const dialogContainer = document.querySelector('.fixed.inset-0.z-50')

    expect(backdrop).toHaveClass('z-40')
    expect(dialogContainer).toHaveClass('z-50')
  })
})
