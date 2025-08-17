import { Container, Tabs } from '@/components'
import { Drawer } from '@/components/organisms'
import { LeadDetails } from './components/LeadDetails'
import { LeadsTab } from './components/Tabs/LeadsTab'
import { OpportunitiesTab } from './components/Tabs/OpportunitiesTab'
import { ModalManager } from './components/ModalManager'
import { useHomeContext } from '@/contexts/home'

export const TableSection = () => {
  const { selectedLead, isDrawerOpen, handleCloseDrawer } = useHomeContext()

  // Tabs para Leads e Opportunities
  const tabs = [
    {
      id: 'leads',
      label: 'Leads',
      content: <LeadsTab />
    },
    {
      id: 'opportunities',
      label: 'Opportunities',
      content: <OpportunitiesTab />
    }
  ]

  return (
    <ModalManager>
      <Container>
        <Tabs tabs={tabs} defaultActiveTab='leads' />
      </Container>

      {/* Drawer para detalhes do Lead */}
      <Drawer isOpen={isDrawerOpen} onClose={handleCloseDrawer}>
        {selectedLead && <LeadDetails lead={selectedLead} />}
      </Drawer>
    </ModalManager>
  )
}
