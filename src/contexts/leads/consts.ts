import { LeadsList } from './interface'

const noop = () => {}

export const contextDefaultValue = {
  leadsList: [] as LeadsList,

  addLead: noop,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  deleteLead: (leadId: number) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  toggleLead: (leadId: number) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  editLead: (leadId: number, field: string, value: string) => {}
}

export const emptyLead = {
  title: '',
  description: '',
  completed: false
}

export const LOCAL_STORAGE_LISTS_KEY = '__LEADS_LISTS'
