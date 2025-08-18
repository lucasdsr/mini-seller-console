import { useState } from 'react'
import { Lead } from './leads'
import { Opportunity } from './opportunities'
import { useLeadsState } from './leads'
import { useOpportunitiesState } from './opportunities'
import {
  useLeadFilters,
  useOpportunityFilters,
  useFiltersWithStorage
} from './filters'
import { HomeContextData } from '../interface'
import { simulateDelay } from '@/utils'

export const useHomeState = (): HomeContextData => {
  const { leadsList, removeLead, updateLead } = useLeadsState()
  const { opportunitiesList, addOpportunity } = useOpportunitiesState()

  const { filters, updateFilters, resetFilters } = useFiltersWithStorage()
  const { search: searchFilter, status: statusFilter, sortOrder } = filters

  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [selectedOpportunity, setSelectedOpportunity] =
    useState<Opportunity | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isConvertModalOpen, setIsConvertModalOpen] = useState(false)
  const [leadToConvert, setLeadToConvert] = useState<Lead | null>(null)
  const [showToast, setShowToast] = useState(false)
  const [isFiltering, setIsFiltering] = useState(false)

  const columns = [
    { id: 'id', title: 'ID', width: 60 },
    { id: 'name', title: 'Name', width: 200 },
    { id: 'company', title: 'Company', width: 200 },
    { id: 'email', title: 'Email', width: 180 },
    { id: 'source', title: 'Source', width: 100 },
    { id: 'score', title: 'Score', width: 80 },
    { id: 'status', title: 'Status', width: 100 },
    { id: 'actions', title: 'Actions', width: 80 }
  ]

  const filteredLeads = useLeadFilters(
    leadsList,
    searchFilter,
    statusFilter,
    sortOrder
  )

  const filteredOpportunities = useOpportunityFilters(
    opportunitiesList,
    searchFilter,
    statusFilter,
    sortOrder
  )

  const handleFilter = async (
    search: string,
    status: string,
    sortOrder: 'asc' | 'desc' | null
  ) => {
    setIsFiltering(true)
    await simulateDelay(1000)
    updateFilters({ search, status, sortOrder })
    setIsFiltering(false)
  }

  const handleRowClick = (item: Lead) => {
    setSelectedLead(item)
    setSelectedOpportunity(null)
    setIsDrawerOpen(true)
  }

  const handleOpportunityRowClick = (item: Opportunity) => {
    setSelectedOpportunity(item)
    setSelectedLead(null)
    setIsDrawerOpen(true)
  }

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false)
    setSelectedLead(null)
    setSelectedOpportunity(null)
  }

  const handleConvertLead = (lead: Lead) => {
    setLeadToConvert(lead)
    setIsConvertModalOpen(true)
  }

  const handleConfirmConversion = async () => {
    if (leadToConvert) {
      setIsFiltering(true)
      await simulateDelay(1000)

      const opportunity: Opportunity = {
        ...leadToConvert,
        convertedAt: new Date()
      }

      addOpportunity(opportunity)

      removeLead(leadToConvert.id)

      setIsConvertModalOpen(false)
      setLeadToConvert(null)
      setShowToast(true)

      setTimeout(() => setShowToast(false), 5000)

      setIsFiltering(false)
    }
  }

  const handleCloseConvertModal = () => {
    setIsConvertModalOpen(false)
    setLeadToConvert(null)
  }

  const handleCloseToast = () => {
    setShowToast(false)
  }

  const handleUpdateLead = async (leadId: number, updates: Partial<Lead>) => {
    setIsFiltering(true)
    await simulateDelay(800)

    updateLead(leadId, updates)

    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead({ ...selectedLead, ...updates })
    }

    setIsFiltering(false)
  }

  return {
    columns,
    filteredLeads,
    filteredOpportunities,
    opportunitiesList,
    searchFilter,
    statusFilter,
    sortOrder,
    selectedLead,
    selectedOpportunity,
    isDrawerOpen,
    isConvertModalOpen,
    leadToConvert,
    showToast,
    isFiltering,
    handleFilter,
    handleRowClick,
    handleOpportunityRowClick,
    handleCloseDrawer,
    handleConvertLead,
    handleConfirmConversion,
    handleCloseConvertModal,
    handleCloseToast,
    handleUpdateLead,
    resetFilters
  }
}
