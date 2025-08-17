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

  // Hook de filtros com localStorage
  const { filters, updateFilters, resetFilters } = useFiltersWithStorage()
  const { search: searchFilter, status: statusFilter, sortOrder } = filters

  // Estados de UI
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isConvertModalOpen, setIsConvertModalOpen] = useState(false)
  const [leadToConvert, setLeadToConvert] = useState<Lead | null>(null)
  const [showToast, setShowToast] = useState(false)

  // Colunas da tabela
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

  // Filtros de leads
  const filteredLeads = useLeadFilters(
    leadsList,
    searchFilter,
    statusFilter,
    sortOrder
  )

  // Filtros de opportunities
  const filteredOpportunities = useOpportunityFilters(
    opportunitiesList,
    searchFilter,
    statusFilter,
    sortOrder
  )

  // Funções de filtros
  const handleFilter = (
    search: string,
    status: string,
    sortOrder: 'asc' | 'desc' | null
  ) => {
    // Atualizar os filtros usando o hook com localStorage
    updateFilters({ search, status, sortOrder })
  }

  // Funções de UI
  const handleRowClick = (item: Lead) => {
    setSelectedLead(item)
    setIsDrawerOpen(true)
  }

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false)
    setSelectedLead(null)
  }

  const handleConvertLead = (lead: Lead) => {
    setLeadToConvert(lead)
    setIsConvertModalOpen(true)
  }

  const handleConfirmConversion = () => {
    if (leadToConvert) {
      // Criar opportunity
      const opportunity: Opportunity = {
        ...leadToConvert,
        convertedAt: new Date()
      }

      // Adicionar ao contexto de opportunities
      addOpportunity(opportunity)

      // Remover do contexto de leads
      removeLead(leadToConvert.id)

      // Fechar modal e mostrar toast
      setIsConvertModalOpen(false)
      setLeadToConvert(null)
      setShowToast(true)

      // Fechar toast após 5 segundos
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
    isDrawerOpen,
    isConvertModalOpen,
    leadToConvert,
    showToast,
    handleFilter,
    handleRowClick,
    handleCloseDrawer,
    handleConvertLead,
    handleConfirmConversion,
    handleCloseConvertModal,
    handleCloseToast,
    resetFilters
  }
}
