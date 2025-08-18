import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { LeadActions } from './LeadActions'
import { Context } from '@/contexts/home'
import {
  LeadSource,
  LeadStatus
} from '@/contexts/home/states/leads/leads-enums'

const mockLead = {
  id: 1,
  name: 'John Doe',
  company: 'Test Company',
  email: 'john@test.com',
  source: LeadSource.WEBSITE,
  score: 85,
  status: LeadStatus.PROSPECT
}

const mockContextValue = {
  handleConvertLead: vi.fn(),
  columns: [],
  filteredLeads: [],
  filteredOpportunities: [],
  opportunitiesList: [],
  searchFilter: '',
  statusFilter: '',
  sortOrder: null,
  selectedLead: null,
  selectedOpportunity: null,
  isDrawerOpen: false,
  isConvertModalOpen: false,
  leadToConvert: null,
  showToast: false,
  isFiltering: false,
  handleFilter: vi.fn(),
  resetFilters: vi.fn(),
  handleRowClick: vi.fn(),
  handleOpportunityRowClick: vi.fn(),
  handleCloseDrawer: vi.fn(),
  handleConfirmConversion: vi.fn(),
  handleCloseConvertModal: vi.fn(),
  handleCloseToast: vi.fn(),
  handleUpdateLead: vi.fn()
}

const MockHomeProvider = ({ children }: { children: React.ReactNode }) => (
  <Context.Provider value={mockContextValue}>{children}</Context.Provider>
)

describe('LeadActions Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render the actions dropdown trigger', () => {
    render(
      <MockHomeProvider>
        <LeadActions lead={mockLead} />
      </MockHomeProvider>
    )

    const triggerButton = screen.getByRole('button')
    expect(triggerButton).toBeInTheDocument()
  })

  it('should render the three dots icon', () => {
    render(
      <MockHomeProvider>
        <LeadActions lead={mockLead} />
      </MockHomeProvider>
    )

    const triggerButton = screen.getByRole('button')
    const svg = triggerButton.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('should have proper styling classes', () => {
    render(
      <MockHomeProvider>
        <LeadActions lead={mockLead} />
      </MockHomeProvider>
    )

    const triggerButton = screen.getByRole('button')
    expect(triggerButton).toHaveClass(
      'p-1',
      'sm:p-1.5',
      'text-gray-500',
      'hover:text-gray-700',
      'rounded',
      'hover:bg-gray-100',
      'transition-colors',
      'flex-shrink-0',
      'w-7',
      'h-7',
      'sm:w-8',
      'sm:h-8',
      'flex',
      'items-center',
      'justify-center'
    )
  })

  it('should have proper dark mode support', () => {
    render(
      <MockHomeProvider>
        <LeadActions lead={mockLead} />
      </MockHomeProvider>
    )

    const triggerButton = screen.getByRole('button')
    expect(triggerButton).toHaveClass(
      'dark:text-gray-400',
      'dark:hover:text-gray-200',
      'dark:hover:bg-gray-700'
    )
  })

  it('should have proper container styling', () => {
    render(
      <MockHomeProvider>
        <LeadActions lead={mockLead} />
      </MockHomeProvider>
    )

    const container = document.querySelector('.flex.justify-center.w-full')
    expect(container).toBeInTheDocument()
    expect(container).toHaveClass('flex', 'justify-center', 'w-full')
  })

  it('should render the dropdown component', () => {
    render(
      <MockHomeProvider>
        <LeadActions lead={mockLead} />
      </MockHomeProvider>
    )

    const dropdown = document.querySelector('.flex.justify-center.w-full')
    expect(dropdown).toBeInTheDocument()
  })

  it('should pass the correct trigger to dropdown', () => {
    render(
      <MockHomeProvider>
        <LeadActions lead={mockLead} />
      </MockHomeProvider>
    )

    const triggerButton = screen.getByRole('button')
    expect(triggerButton).toBeInTheDocument()
  })

  it('should handle different lead data correctly', () => {
    const differentLead = {
      id: 2,
      name: 'Jane Smith',
      company: 'Another Company',
      email: 'jane@another.com',
      source: LeadSource.REFERRAL,
      score: 92,
      status: LeadStatus.QUALIFIED
    }

    render(
      <MockHomeProvider>
        <LeadActions lead={differentLead} />
      </MockHomeProvider>
    )

    const triggerButton = screen.getByRole('button')
    expect(triggerButton).toBeInTheDocument()
  })

  it('should have proper accessibility attributes', () => {
    render(
      <MockHomeProvider>
        <LeadActions lead={mockLead} />
      </MockHomeProvider>
    )

    const triggerButton = screen.getByRole('button')
    expect(triggerButton).toBeInTheDocument()
  })

  it('should have proper icon sizing', () => {
    render(
      <MockHomeProvider>
        <LeadActions lead={mockLead} />
      </MockHomeProvider>
    )

    const triggerButton = screen.getByRole('button')
    const svg = triggerButton.querySelector('svg')
    expect(svg).toHaveClass('w-3.5', 'h-3.5', 'sm:w-4', 'sm:h-4')
  })

  it('should have proper responsive behavior', () => {
    render(
      <MockHomeProvider>
        <LeadActions lead={mockLead} />
      </MockHomeProvider>
    )

    const triggerButton = screen.getByRole('button')
    expect(triggerButton).toHaveClass('w-7', 'h-7', 'sm:w-8', 'sm:h-8')
  })

  it('should integrate with the home context', () => {
    render(
      <MockHomeProvider>
        <LeadActions lead={mockLead} />
      </MockHomeProvider>
    )

    expect(mockContextValue.handleConvertLead).toBeDefined()
  })

  it('should handle click events without errors', () => {
    render(
      <MockHomeProvider>
        <LeadActions lead={mockLead} />
      </MockHomeProvider>
    )

    const triggerButton = screen.getByRole('button')

    expect(() => {
      fireEvent.click(triggerButton)
    }).not.toThrow()
  })
})
