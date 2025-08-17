import { useEffect, useMemo, useState } from 'react'

import { LOCAL_STORAGE_LISTS_KEY, LeadsList, UseLeadState } from '.'
import {
  getFromLocalStorage,
  saveToLocalStorage
} from '@/utils/manageLocalStorage'

import leadsData from '../../../../mocks/leads.json'
import { LeadStatus } from '.'

export const useLeadState = (): UseLeadState => {
  const storagedList =
    getFromLocalStorage<LeadsList>(LOCAL_STORAGE_LISTS_KEY) ||
    (leadsData as LeadsList)

  const defaultLeads = storagedList.length
    ? storagedList
    : (leadsData as LeadsList)
  const [allLeads, setAllLeads] = useState<LeadsList>(defaultLeads)

  const { leadsList, convertedLeads } = useMemo(
    () =>
      allLeads.reduce(
        (acc, lead) => {
          if (lead.status === LeadStatus.CONVERTED)
            return { ...acc, convertedLeads: [...acc.convertedLeads, lead] }
          return { ...acc, leadsList: [...acc.leadsList, lead] }
        },
        { leadsList: [] as LeadsList, convertedLeads: [] as LeadsList }
      ),
    [allLeads]
  )

  const removeLead = (leadId: number) => {
    setAllLeads(curr => {
      const updatedList = curr.filter(lead => lead.id !== leadId)
      saveToLocalStorage(LOCAL_STORAGE_LISTS_KEY, updatedList)
      return updatedList
    })
  }

  useEffect(() => {
    saveToLocalStorage(LOCAL_STORAGE_LISTS_KEY, allLeads)
  }, [allLeads])

  return {
    leadsList,
    convertedLeads,
    removeLead
  }
}
