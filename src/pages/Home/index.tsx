import { Col } from '@/components'

import { Filters } from './Filters'
import { useHome } from './useHome'
import { TableSection } from './TableSection'

export const Home = () => {
  const { columns, filteredLeads, handleFilter } = useHome()

  return (
    <Col className='gap-6'>
      <h1 className='text-3xl font-bold text-white'>Mini Seller Console</h1>
      <Filters onFilter={handleFilter} />
      <TableSection columns={columns} items={filteredLeads} />
    </Col>
  )
}
