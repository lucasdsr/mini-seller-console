import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Tabs } from './Tabs'

describe('Tabs Component', () => {
  const mockTabs = [
    { id: 'tab1', label: 'First Tab', content: <div>First tab content</div> },
    { id: 'tab2', label: 'Second Tab', content: <div>Second tab content</div> },
    { id: 'tab3', label: 'Third Tab', content: <div>Third tab content</div> }
  ]

  it('should render all tab labels', () => {
    render(<Tabs tabs={mockTabs} />)

    expect(screen.getByText('First Tab')).toBeInTheDocument()
    expect(screen.getByText('Second Tab')).toBeInTheDocument()
    expect(screen.getByText('Third Tab')).toBeInTheDocument()
  })

  it('should render first tab content by default', () => {
    render(<Tabs tabs={mockTabs} />)

    expect(screen.getByText('First tab content')).toBeInTheDocument()
    expect(screen.queryByText('Second tab content')).not.toBeInTheDocument()
    expect(screen.queryByText('Third tab content')).not.toBeInTheDocument()
  })

  it('should switch to second tab when clicked', () => {
    render(<Tabs tabs={mockTabs} />)

    const secondTab = screen.getByText('Second Tab')
    fireEvent.click(secondTab)

    expect(screen.queryByText('First tab content')).not.toBeInTheDocument()
    expect(screen.getByText('Second tab content')).toBeInTheDocument()
    expect(screen.queryByText('Third tab content')).not.toBeInTheDocument()
  })

  it('should switch to third tab when clicked', () => {
    render(<Tabs tabs={mockTabs} />)

    const thirdTab = screen.getByText('Third Tab')
    fireEvent.click(thirdTab)

    expect(screen.queryByText('First tab content')).not.toBeInTheDocument()
    expect(screen.queryByText('Second tab content')).not.toBeInTheDocument()
    expect(screen.getByText('Third tab content')).toBeInTheDocument()
  })

  it('should use custom default active tab', () => {
    render(<Tabs tabs={mockTabs} defaultActiveTab='tab2' />)

    expect(screen.queryByText('First tab content')).not.toBeInTheDocument()
    expect(screen.getByText('Second tab content')).toBeInTheDocument()
    expect(screen.queryByText('Third tab content')).not.toBeInTheDocument()
  })

  it('should apply active tab styles correctly', () => {
    render(<Tabs tabs={mockTabs} />)

    const firstTab = screen.getByText('First Tab')
    const secondTab = screen.getByText('Second Tab')

    expect(firstTab).toHaveClass('text-blue-600', 'border-blue-600')
    expect(secondTab).not.toHaveClass('text-blue-600', 'border-blue-600')
  })

  it('should apply hover styles to inactive tabs', () => {
    render(<Tabs tabs={mockTabs} />)

    const secondTab = screen.getByText('Second Tab')
    expect(secondTab).toHaveClass(
      'hover:text-gray-600',
      'hover:border-gray-300'
    )
  })

  it('should handle disabled tabs', () => {
    const tabsWithDisabled = [
      { id: 'tab1', label: 'First Tab', content: <div>First tab content</div> },
      {
        id: 'tab2',
        label: 'Second Tab',
        content: <div>Second tab content</div>,
        disabled: true
      },
      { id: 'tab3', label: 'Third Tab', content: <div>Third tab content</div> }
    ]

    render(<Tabs tabs={tabsWithDisabled} />)

    const disabledTab = screen.getByText('Second Tab')
    expect(disabledTab).toHaveClass('opacity-50', 'cursor-not-allowed')
  })

  it('should not switch to disabled tab when clicked', () => {
    const tabsWithDisabled = [
      { id: 'tab1', label: 'First Tab', content: <div>First tab content</div> },
      {
        id: 'tab2',
        label: 'Second Tab',
        content: <div>Second tab content</div>,
        disabled: true
      }
    ]

    render(<Tabs tabs={tabsWithDisabled} />)

    const disabledTab = screen.getByText('Second Tab')
    fireEvent.click(disabledTab)

    expect(screen.getByText('First tab content')).toBeInTheDocument()
    expect(screen.queryByText('Second tab content')).not.toBeInTheDocument()
  })

  it('should apply custom className', () => {
    render(<Tabs tabs={mockTabs} className='custom-tabs' />)

    const tabsContainer = document.querySelector('.custom-tabs')
    expect(tabsContainer).toBeInTheDocument()
    expect(tabsContainer).toHaveClass('custom-tabs')
  })

  it('should handle empty tabs array gracefully', () => {
    render(<Tabs tabs={[]} />)

    expect(screen.queryByText('First Tab')).not.toBeInTheDocument()
  })

  it('should handle single tab', () => {
    const singleTab = [
      { id: 'single', label: 'Single Tab', content: <div>Single content</div> }
    ]

    render(<Tabs tabs={singleTab} />)

    expect(screen.getByText('Single Tab')).toBeInTheDocument()
    expect(screen.getByText('Single content')).toBeInTheDocument()
  })

  it('should maintain tab state when switching between tabs', () => {
    render(<Tabs tabs={mockTabs} />)

    const firstTab = screen.getByText('First Tab')
    const secondTab = screen.getByText('Second Tab')

    fireEvent.click(secondTab)
    expect(screen.getByText('Second tab content')).toBeInTheDocument()

    fireEvent.click(firstTab)
    expect(screen.getByText('First tab content')).toBeInTheDocument()
  })

  it('should have proper responsive classes', () => {
    render(<Tabs tabs={mockTabs} />)

    const tabHeaders = screen.getByText('First Tab').closest('ul')
    expect(tabHeaders).toHaveClass('text-xs', 'sm:text-sm')
  })

  it('should handle tab content with complex components', () => {
    const complexTabs = [
      {
        id: 'complex',
        label: 'Complex Tab',
        content: (
          <div>
            <h2>Complex Content</h2>
            <button>Action Button</button>
            <p>Some description</p>
          </div>
        )
      }
    ]

    render(<Tabs tabs={complexTabs} />)

    expect(screen.getByText('Complex Content')).toBeInTheDocument()
    expect(screen.getByText('Action Button')).toBeInTheDocument()
    expect(screen.getByText('Some description')).toBeInTheDocument()
  })
})
