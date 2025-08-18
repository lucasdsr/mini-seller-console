import { Container, Tabs } from '@/components'
import { Drawer } from '@/components/organisms'
import { LeadDetails } from './components/LeadDetails'
import { LeadsTab } from './components/Tabs/LeadsTab'
import { OpportunitiesTab } from './components/Tabs/OpportunitiesTab'
import { ModalManager } from './components/ModalManager'
import { useHomeContext } from '@/contexts/home'

export const TableSection = () => {
  const { selectedLead, selectedOpportunity, isDrawerOpen, handleCloseDrawer } =
    useHomeContext()

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

  const selectedItem = selectedOpportunity || selectedLead

  return (
    <ModalManager>
      <Container>
        <Tabs tabs={tabs} defaultActiveTab='leads' />
      </Container>

      <Drawer isOpen={isDrawerOpen} onClose={handleCloseDrawer}>
        {selectedItem && <LeadDetails item={selectedItem} />}
      </Drawer>
    </ModalManager>
  )
}
