import { LeadsList } from '.'

export const contextDefaultValue = {
  leadsList: [] as LeadsList,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeLead: (leadId: number) => {}
}

export const emptyLead = {
  title: '',
  description: '',
  completed: false
}

export const LOCAL_STORAGE_LISTS_KEY = '__LEADS_LISTS'
