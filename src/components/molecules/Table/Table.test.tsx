import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Table } from './Table'

describe('Table Component', () => {
  const mockItems = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'inactive' }
  ]

  const mockColumns = [
    { id: 'id', title: 'ID' },
    { id: 'name', title: 'Name' },
    { id: 'email', title: 'Email' },
    { id: 'status', title: 'Status' }
  ]

  it('should render table headers correctly', () => {
    render(<Table columns={mockColumns} items={mockItems} />)

    expect(screen.getByText('ID')).toBeInTheDocument()
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('Status')).toBeInTheDocument()
  })

  it('should render table data correctly', () => {
    render(<Table columns={mockColumns} items={mockItems} />)

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('jane@example.com')).toBeInTheDocument()
    expect(screen.getByText('active')).toBeInTheDocument()
    expect(screen.getByText('inactive')).toBeInTheDocument()
  })

  it('should render empty table when no items', () => {
    render(<Table columns={mockColumns} items={[]} />)

    expect(screen.getByText('ID')).toBeInTheDocument()
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument()
  })

  it('should call onRowClick when row is clicked', () => {
    const handleRowClick = vi.fn()
    render(
      <Table
        columns={mockColumns}
        items={mockItems}
        onRowClick={handleRowClick}
      />
    )

    const firstRow = screen.getByText('John Doe').closest('tr')
    fireEvent.click(firstRow!)

    expect(handleRowClick).toHaveBeenCalledWith(mockItems[0])
  })

  it('should not call onRowClick when not provided', () => {
    render(<Table columns={mockColumns} items={mockItems} />)

    const firstRow = screen.getByText('John Doe').closest('tr')
    expect(firstRow).not.toHaveClass('cursor-pointer')
  })

  it('should apply hover styles when onRowClick is provided', () => {
    render(
      <Table columns={mockColumns} items={mockItems} onRowClick={() => {}} />
    )

    const firstRow = screen.getByText('John Doe').closest('tr')
    expect(firstRow).toHaveClass('cursor-pointer', 'hover:bg-gray-100')
  })

  it('should render custom cell content when render function is provided', () => {
    const columnsWithRender = [
      ...mockColumns,
      {
        id: 'custom',
        title: 'Custom',
        render: (value: unknown, item: any) => (
          <button data-testid={`action-${item.id}`}>Edit {item.name}</button>
        )
      }
    ]

    render(<Table columns={columnsWithRender} items={mockItems} />)

    expect(screen.getByTestId('action-1')).toBeInTheDocument()
    expect(screen.getByTestId('action-2')).toBeInTheDocument()
    expect(screen.getByText('Edit John Doe')).toBeInTheDocument()
    expect(screen.getByText('Edit Jane Smith')).toBeInTheDocument()
  })

  it('should handle actions column correctly', () => {
    const columnsWithActions = [
      ...mockColumns,
      { id: 'actions', title: 'Actions' }
    ]

    const itemsWithActions = [
      { ...mockItems[0], actions: <button>Edit</button> },
      { ...mockItems[1], actions: <button>Delete</button> }
    ]

    render(<Table columns={columnsWithActions} items={itemsWithActions} />)

    expect(screen.getByText('Edit')).toBeInTheDocument()
    expect(screen.getByText('Delete')).toBeInTheDocument()
  })

  it('should handle null/undefined values gracefully', () => {
    const itemsWithNulls = [
      { id: 1, name: null, email: undefined, status: 'active' }
    ]

    render(<Table columns={mockColumns} items={itemsWithNulls} />)

    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('active')).toBeInTheDocument()
  })

  it('should have proper table structure', () => {
    render(<Table columns={mockColumns} items={mockItems} />)

    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.getAllByRole('row')).toHaveLength(3)
  })

  it('should have proper accessibility attributes', () => {
    render(<Table columns={mockColumns} items={mockItems} />)

    const tableContainer = document.querySelector('.relative.overflow-x-auto')
    expect(tableContainer).toHaveClass('shadow-md', 'sm:rounded-lg')
  })

  it('should handle different data types in cells', () => {
    const itemsWithDifferentTypes = [
      { id: 1, name: 'John', age: 25, isActive: true, score: 95.5 }
    ]

    const columnsForTypes = [
      { id: 'id', title: 'ID' },
      { id: 'name', title: 'Name' },
      { id: 'age', title: 'Age' },
      { id: 'isActive', title: 'Active' },
      { id: 'score', title: 'Score' }
    ]

    render(<Table columns={columnsForTypes} items={itemsWithDifferentTypes} />)

    expect(screen.getByText('John')).toBeInTheDocument()
    expect(screen.getByText('25')).toBeInTheDocument()
    expect(screen.getByText('true')).toBeInTheDocument()
    expect(screen.getByText('95.5')).toBeInTheDocument()
  })

  it('should apply responsive classes correctly', () => {
    render(<Table columns={mockColumns} items={mockItems} />)

    const table = screen.getByRole('table')
    expect(table).toHaveClass('text-xs', 'sm:text-sm')
  })

  it('should handle large datasets without performance issues', () => {
    const largeItems = Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      status: i % 2 === 0 ? 'active' : 'inactive'
    }))

    render(<Table columns={mockColumns} items={largeItems} />)

    expect(screen.getByText('User 1')).toBeInTheDocument()
    expect(screen.getByText('User 100')).toBeInTheDocument()
    expect(screen.getAllByRole('row')).toHaveLength(101)
  })
})
