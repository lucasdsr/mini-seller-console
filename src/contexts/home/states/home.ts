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

export const useHomeState = (): HomeContextData => {
  const { leadsList, removeLead } = useLeadsState()
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

  const columns = [
    { id: 'id', title: 'id' },
    { id: 'name', title: 'name' },
    { id: 'company', title: 'company' },
    { id: 'email', title: 'email' },
    { id: 'source', title: 'source' },
    { id: 'score', title: 'score' },
    { id: 'status', title: 'status' },
    { id: 'actions', title: 'Actions' }
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

  const handleFilter = (
    search: string,
    status: string,
    sortOrder: 'asc' | 'desc' | null
  ) => {
    updateFilters({ search, status, sortOrder })
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

  const handleConfirmConversion = () => {
    if (leadToConvert) {
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
    }
  }

  const handleCloseConvertModal = () => {
    setIsConvertModalOpen(false)
    setLeadToConvert(null)
  }

  const handleCloseToast = () => {
    setShowToast(false)
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
    handleFilter,
    handleRowClick,
    handleOpportunityRowClick,
    handleCloseDrawer,
    handleConvertLead,
    handleConfirmConversion,
    handleCloseConvertModal,
    handleCloseToast,
    resetFilters
  }
}
