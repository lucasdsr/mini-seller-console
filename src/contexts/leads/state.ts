import { useEffect, useMemo, useState } from 'react'

import { LOCAL_STORAGE_LISTS_KEY } from './consts'
import { LeadsList, UseLeadState } from './interface'
import {
  getFromLocalStorage,
  saveToLocalStorage
} from '@/utils/manageLocalStorage'

import leadsData from '../../mocks/leads.json'
import { LeadStatus } from './enums'

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

  const editLead = (id: number, field: string, value: string) => {
    setAllLeads(curr => {
      const updatedList = curr.map(lead =>
        lead.id === id ? { ...lead, [field]: value } : lead
      )
      saveToLocalStorage(LOCAL_STORAGE_LISTS_KEY, updatedList)
      return updatedList
    })
  }

  const finishConvertion = (leadId: number) =>
    setAllLeads(curr =>
      curr.reduce((acc, item) => {
        if (item.id === leadId)
          return [...acc, { ...item, status: LeadStatus.CONVERTED }]
        return [...acc, item]
      }, [] as LeadsList)
    )

  useEffect(() => {
    saveToLocalStorage(LOCAL_STORAGE_LISTS_KEY, allLeads)
  }, [allLeads])

  return {
    leadsList,
    convertedLeads,

    editLead,
    finishConvertion
  }
}
