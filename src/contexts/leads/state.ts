import { useEffect, useMemo, useState } from 'react'

import { emptyLead, LOCAL_STORAGE_LISTS_KEY } from './consts'
import { LeadsList, UseLeadState } from './interface'
import {
  getFromLocalStorage,
  saveToLocalStorage
} from '@/utils/manageLocalStorage'

export const useLeadState = (): UseLeadState => {
  const storagedList =
    getFromLocalStorage<LeadsList>(LOCAL_STORAGE_LISTS_KEY) || []
  const [allLeads, setAllLeads] = useState<LeadsList>(storagedList)
  const [nextLeadId, setNextLeadId] = useState<number>(allLeads.length + 1)

  const { leadsList, completedLeads } = useMemo(
    () =>
      allLeads.reduce(
        (acc, lead) => {
          if (lead.completed)
            return { ...acc, completedLeads: [...acc.completedLeads, lead] }
          return { ...acc, leadsList: [...acc.leadsList, lead] }
        },
        { leadsList: [] as LeadsList, completedLeads: [] as LeadsList }
      ),
    [allLeads]
  )

  const addLead = () => {
    setAllLeads(curr => [...curr, { ...emptyLead, id: nextLeadId }])
    setNextLeadId(id => id + 1)
  }

  const editLead = (id: number, field: string, value: string) => {
    setAllLeads(curr => {
      const updatedList = curr.map(lead =>
        lead.id === id ? { ...lead, [field]: value } : lead
      )
      saveToLocalStorage(LOCAL_STORAGE_LISTS_KEY, updatedList)
      return updatedList
    })
  }

  const deleteLead = (leadId: number) =>
    setAllLeads(curr => curr.filter(({ id }) => id !== leadId))

  const toggleLead = (leadId: number) =>
    setAllLeads(curr =>
      curr.reduce((acc, item) => {
        if (item.id === leadId)
          return [...acc, { ...item, completed: !item.completed }]
        return [...acc, item]
      }, [] as LeadsList)
    )

  const clearConfirmedLeads = () =>
    setAllLeads(curr => curr.filter(item => !item.completed))

  useEffect(() => {
    saveToLocalStorage(LOCAL_STORAGE_LISTS_KEY, allLeads)
  }, [allLeads])

  return {
    leadsList,
    completedLeads,

    addLead,
    editLead,
    deleteLead,
    toggleLead,
    clearConfirmedLeads
  }
}
