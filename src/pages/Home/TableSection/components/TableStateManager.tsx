import { LeadActions } from './LeadActions'
import { Lead } from '@/contexts/home'
import { useHomeContext } from '@/contexts/home'

export const useTableStateManager = () => {
  const { filteredLeads } = useHomeContext()

  const itemsWithActions = filteredLeads.map((item: Lead) => ({
    ...item,
    actions: <LeadActions lead={item} />
  }))

  return { itemsWithActions }
}
