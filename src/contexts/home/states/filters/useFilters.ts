import { useMemo } from 'react'
import { Lead } from '../leads'
import { Opportunity } from '../opportunities'

type FilterableItem = Lead | Opportunity

export const useFilters = <T extends FilterableItem>(
  items: T[],
  search: string,
  status: string,
  sortOrder: 'asc' | 'desc' | null
) =>
  useMemo(() => {
    let filteredItems = items.filter(item => {
      // Filtro por busca (nome ou empresa)
      const searchMatch =
        !search ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.company.toLowerCase().includes(search.toLowerCase())

      // Filtro por status
      const statusMatch = !status || item.status === status

      return searchMatch && statusMatch
    })

    // Ordenação por score
    if (sortOrder) {
      filteredItems = [...filteredItems].sort((a, b) => {
        const scoreA = Number(a.score)
        const scoreB = Number(b.score)

        if (sortOrder === 'asc') {
          return scoreA - scoreB
        } else {
          return scoreB - scoreA
        }
      })
    }

    return filteredItems
  }, [items, search, status, sortOrder])
