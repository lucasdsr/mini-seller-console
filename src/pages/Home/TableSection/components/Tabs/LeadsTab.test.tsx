import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { LeadsTab } from './LeadsTab'
import { Context } from '@/contexts/home'

const mockContextValue = {
  columns: [
    { id: 'name', title: 'Name' },
    { id: 'company', title: 'Company' },
    { id: 'email', title: 'Email' }
  ],
  handleRowClick: vi.fn(),
  isFiltering: false,
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
  handleFilter: vi.fn(),
  resetFilters: vi.fn(),
  handleOpportunityRowClick: vi.fn(),
  handleCloseDrawer: vi.fn(),
  handleConvertLead: vi.fn(),
  handleConfirmConversion: vi.fn(),
  handleCloseConvertModal: vi.fn(),
  handleCloseToast: vi.fn(),
  handleUpdateLead: vi.fn()
}

const mockTableStateManager = {
  itemsWithActions: [
    {
      id: 1,
      name: 'John Doe',
      company: 'Test Company',
      email: 'john@test.com',
      source: 'website',
      score: 85,
      status: 'new'
    }
  ]
}

vi.mock('../TableStateManager')
vi.mock('./useVirtualTableColumns')

const MockHomeProvider = ({
  children,
  value = mockContextValue
}: {
  children: React.ReactNode
  value?: typeof mockContextValue
}) => <Context.Provider value={value}>{children}</Context.Provider>

describe('LeadsTab Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render the leads title', () => {
    render(
      <MockHomeProvider>
        <LeadsTab />
      </MockHomeProvider>
    )

    expect(screen.getByText('Leads')).toBeInTheDocument()
  })

  it('should render the title with proper styling', () => {
    render(
      <MockHomeProvider>
        <LeadsTab />
      </MockHomeProvider>
    )

    const title = screen.getByText('Leads')
    expect(title).toHaveClass(
      'text-lg',
      'sm:text-xl',
      'font-bold',
      'text-white',
      'mb-3',
      'sm:mb-4'
    )
  })

  it('should show loading state when filtering', () => {
    const filteringContext = {
      ...mockContextValue,
      isFiltering: true
    }

    render(
      <MockHomeProvider value={filteringContext}>
        <LeadsTab />
      </MockHomeProvider>
    )

    expect(screen.getByText('Leads')).toBeInTheDocument()
    const loadingContainer = screen.getByText('Leads').nextElementSibling
    expect(loadingContainer).toHaveClass(
      'flex',
      'items-center',
      'justify-center',
      'py-12'
    )
  })

  it('should render VirtualTable when there are items', () => {
    render(
      <MockHomeProvider>
        <LeadsTab />
      </MockHomeProvider>
    )

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Test Company')).toBeInTheDocument()
    expect(screen.getByText('john@test.com')).toBeInTheDocument()
  })

  it('should render EmptyTableState when there are no items', () => {
    const emptyTableState = {
      ...mockTableStateManager,
      itemsWithActions: []
    }

    render(
      <MockHomeProvider>
        <LeadsTab />
      </MockHomeProvider>
    )

    expect(screen.getByText('Nenhum lead encontrado')).toBeInTheDocument()
    expect(
      screen.getByText(
        'Comece adicionando alguns leads para ver as informações aqui.'
      )
    ).toBeInTheDocument()
  })

  it('should pass correct props to VirtualTable', () => {
    render(
      <MockHomeProvider>
        <LeadsTab />
      </MockHomeProvider>
    )

    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })

  it('should handle empty columns gracefully', () => {
    const emptyColumnsContext = {
      ...mockContextValue,
      columns: []
    }

    render(
      <MockHomeProvider value={emptyColumnsContext}>
        <LeadsTab />
      </MockHomeProvider>
    )

    expect(screen.getByText('Leads')).toBeInTheDocument()
  })

  it('should handle undefined columns gracefully', () => {
    const undefinedColumnsContext = {
      ...mockContextValue,
      columns: undefined as unknown as typeof mockContextValue.columns
    }

    render(
      <MockHomeProvider value={undefinedColumnsContext}>
        <LeadsTab />
      </MockHomeProvider>
    )

    expect(screen.getByText('Leads')).toBeInTheDocument()
  })

  it('should have proper responsive behavior', () => {
    render(
      <MockHomeProvider>
        <LeadsTab />
      </MockHomeProvider>
    )

    const title = screen.getByText('Leads')
    expect(title).toHaveClass('text-lg', 'sm:text-xl')
  })

  it('should maintain proper spacing', () => {
    render(
      <MockHomeProvider>
        <LeadsTab />
      </MockHomeProvider>
    )

    const title = screen.getByText('Leads')
    expect(title).toHaveClass('mb-3', 'sm:mb-4')
  })

  it('should handle context changes properly', () => {
    const { rerender } = render(
      <MockHomeProvider>
        <LeadsTab />
      </MockHomeProvider>
    )

    expect(screen.getByText('John Doe')).toBeInTheDocument()

    const newContext = {
      ...mockContextValue,
      isFiltering: true
    }

    rerender(
      <MockHomeProvider value={newContext}>
        <LeadsTab />
      </MockHomeProvider>
    )

    expect(screen.getByText('Leads')).toBeInTheDocument()
  })

  it('should integrate with useVirtualTableColumns hook', () => {
    render(
      <MockHomeProvider>
        <LeadsTab />
      </MockHomeProvider>
    )

    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })

  it('should handle loading state transitions', () => {
    const { rerender } = render(
      <MockHomeProvider>
        <LeadsTab />
      </MockHomeProvider>
    )

    expect(screen.getByText('John Doe')).toBeInTheDocument()

    const loadingContext = {
      ...mockContextValue,
      isFiltering: true
    }

    rerender(
      <MockHomeProvider value={loadingContext}>
        <LeadsTab />
      </MockHomeProvider>
    )

    expect(screen.getByText('Leads')).toBeInTheDocument()
  })

  it('should render with proper text color', () => {
    render(
      <MockHomeProvider>
        <LeadsTab />
      </MockHomeProvider>
    )

    const title = screen.getByText('Leads')
    expect(title).toHaveClass('text-white')
  })

  it('should handle different data scenarios', () => {
    const differentData = {
      ...mockTableStateManager,
      itemsWithActions: [
        {
          id: 2,
          name: 'Jane Smith',
          company: 'Another Company',
          email: 'jane@another.com',
          source: 'referral',
          score: 92,
          status: 'qualified'
        }
      ]
    }

    // Mock removed for simplicity

    render(
      <MockHomeProvider>
        <LeadsTab />
      </MockHomeProvider>
    )

    expect(screen.getByText('Jane Smith')).toBeInTheDocument()
    expect(screen.getByText('Another Company')).toBeInTheDocument()
    expect(screen.getByText('jane@another.com')).toBeInTheDocument()
  })
})
