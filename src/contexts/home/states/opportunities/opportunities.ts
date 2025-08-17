import { useEffect, useMemo, useState } from 'react'
import { OpportunitiesList, Opportunity, UseOpportunityState } from '.'
import {
  getFromLocalStorage,
  saveToLocalStorage
} from '@/utils/manageLocalStorage'

const LOCAL_STORAGE_OPPORTUNITIES_KEY = '__OPPORTUNITIES_LISTS'

export const useOpportunityState = (): UseOpportunityState => {
  const storagedList =
    getFromLocalStorage<OpportunitiesList>(LOCAL_STORAGE_OPPORTUNITIES_KEY) ||
    []
  const [allOpportunities, setAllOpportunities] =
    useState<OpportunitiesList>(storagedList)

  const { opportunitiesList } = useMemo(
    () => ({
      opportunitiesList: allOpportunities
    }),
    [allOpportunities]
  )

  const addOpportunity = (opportunity: Opportunity) => {
    setAllOpportunities(curr => {
      const updatedList = [...curr, opportunity]
      saveToLocalStorage(LOCAL_STORAGE_OPPORTUNITIES_KEY, updatedList)
      return updatedList
    })
  }

  useEffect(() => {
    saveToLocalStorage(LOCAL_STORAGE_OPPORTUNITIES_KEY, allOpportunities)
  }, [allOpportunities])

  return {
    opportunitiesList,
    addOpportunity
  }
}
