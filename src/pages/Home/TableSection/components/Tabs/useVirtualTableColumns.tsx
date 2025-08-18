import { useMemo } from 'react'
import { Lead, Opportunity } from '@/contexts/home'
import { LeadActions } from '../LeadActions'
import { Column } from '@/components/molecules/VirtualTable'

interface UseVirtualTableColumnsProps {
  columns: Column<Lead | Opportunity>[]
  type: 'leads' | 'opportunities'
}

export const useVirtualTableColumns = ({
  columns,
  type
}: UseVirtualTableColumnsProps): Column<Lead | Opportunity>[] =>
  useMemo(
    () =>
      columns.map(column => {
        if (column.id === 'score') {
          return {
            ...column,
            render: (item: Lead | Opportunity) => (
              <span
                className={`font-semibold ${
                  item.score >= 80
                    ? 'text-green-600'
                    : item.score >= 60
                      ? 'text-blue-600'
                      : item.score >= 40
                        ? 'text-yellow-600'
                        : 'text-red-600'
                }`}
              >
                {item.score}/100
              </span>
            )
          }
        }

        if (column.id === 'status') {
          return {
            ...column,
            render: (item: Lead | Opportunity) => (
              <span className='px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800'>
                {item.status}
              </span>
            )
          }
        }

        if (column.id === 'actions') {
          if (type === 'leads') {
            return {
              ...column,
              render: (item: Lead) => <LeadActions lead={item} />
            }
          } else {
            return {
              ...column,
              render: () => (
                <span className='text-gray-400 text-sm'>Converted</span>
              )
            }
          }
        }

        return column
      }),
    [columns, type]
  )
