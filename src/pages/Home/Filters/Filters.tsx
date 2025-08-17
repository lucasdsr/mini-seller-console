import { Button, Container, Input, Row, Select } from '@/components'
import { useHomeContext } from '@/contexts/home'
import { LeadStatus } from '@/contexts'
import { useState } from 'react'

export const Filters = () => {
  const { handleFilter, searchFilter, statusFilter, sortOrder, resetFilters } =
    useHomeContext()

  const [search, setSearch] = useState(searchFilter)
  const [status, setStatus] = useState(statusFilter)
  const [sort, setSort] = useState(sortOrder)

  const statusOptions = Object.values(LeadStatus).map(value => ({
    value: value,
    label: value
  }))

  const sortOptions = [
    { value: '', label: 'No sorting' },
    { value: 'asc', label: 'Score: Low to High' },
    { value: 'desc', label: 'Score: High to Low' }
  ]

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value)
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setSort(value === '' ? null : (value as 'asc' | 'desc'))
  }

  const handleFilterClick = () => {
    handleFilter(search, status, sort)
  }

  const handleResetClick = () => {
    resetFilters()
    setSearch('')
    setStatus('')
    setSort(null)
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
          value={sort || ''}
          options={sortOptions}
          onChange={handleSortChange}
          placeholder='Select sorting'
        />

        <Button onClick={handleFilterClick} variant='primary' size='md'>
          Filter
        </Button>

        <Button onClick={handleResetClick} variant='secondary' size='md'>
          Reset
        </Button>
      </Row>
    </Container>
  )
}
