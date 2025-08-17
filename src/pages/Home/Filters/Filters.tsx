import { Button, Container, Input, Row, Select } from '@/components'
import { useFilters } from './useFilters'

interface FiltersProps {
  onFilter: (
    search: string,
    status: string,
    sortOrder: 'asc' | 'desc' | null
  ) => void
}

export const Filters = ({ onFilter }: FiltersProps) => {
  const {
    search,
    status,
    sortOrder,
    statusOptions,
    sortOptions,
    handleStatusChange,
    handleSearchChange,
    handleSortChange
  } = useFilters()

  const handleFilterClick = () => {
    onFilter(search, status, sortOrder)
  }

  return (
    <Container className='flex flex-col gap-4'>
      <h2 className='text-xl font-bold text-white'>Filters</h2>
      <Row className='gap-6 w-full items-end'>
        <Input
          label='search'
          value={search}
          className='w-xs'
          onChange={handleSearchChange}
          placeholder='Search by name or Company'
        />

        <Select
          label='status'
          value={status}
          options={statusOptions}
          onChange={handleStatusChange}
          placeholder='Select a status'
        />

        <Select
          label='sort by score'
          value={sortOrder || ''}
          options={sortOptions}
          onChange={handleSortChange}
          placeholder='Select sorting'
        />

        <Button onClick={handleFilterClick} variant='primary' size='md'>
          Filter
        </Button>
      </Row>
    </Container>
  )
}
