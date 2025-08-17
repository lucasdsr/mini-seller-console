import { useState } from 'react'
import { Container } from '@/components'
import { Drawer } from '@/components/organisms'
import { Table } from '@/components/molecules/Table'
import { LeadDetails } from './LeadDetails'
import { Lead } from '@/contexts/leads'

interface TableSectionProps {
  columns: Array<{
    id: string
    title: string
  }>
  items: Lead[]
}

export const TableSection = ({ columns, items }: TableSectionProps) => {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handleRowClick = (item: Lead) => {
    setSelectedLead(item)
    setIsDrawerOpen(true)
  }

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false)
    setSelectedLead(null)
  }

  return (
    <>
      <Container>
        <h2 className='text-xl font-bold text-white'>Table</h2>
        <Table columns={columns} items={items} onRowClick={handleRowClick} />
      </Container>

      <Drawer isOpen={isDrawerOpen} onClose={handleCloseDrawer}>
        {selectedLead && <LeadDetails lead={selectedLead} />}
      </Drawer>
    </>
  )
}
