import { Container } from '@/components'
import { Table } from '@/components/molecules/Table'

interface TableSectionProps {
  columns: Array<{
    id: string
    title: string
  }>
  items: Record<string, unknown>[]
}

export const TableSection = ({ columns, items }: TableSectionProps) => (
  <Container>
    <h2 className='text-xl font-bold text-white'>Table</h2>
    <Table columns={columns} items={items} />
  </Container>
)
