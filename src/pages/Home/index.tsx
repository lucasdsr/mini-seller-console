import { Col } from '@/components'
import { Filters } from './Filters'
import { TableSection } from './TableSection'
import { HomeProvider } from '@/contexts/home'

export const Home = () => (
  <HomeProvider>
    <Col className='gap-6'>
      <h1 className='text-3xl font-bold text-white'>Mini Seller Console</h1>
      <Filters />
      <TableSection />
    </Col>
  </HomeProvider>
)
