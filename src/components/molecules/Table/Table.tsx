import { ReactNode } from 'react'
import { Lead } from '@/contexts'

interface Column {
  id: string
  title: string
  render?: (value: unknown, item: Lead) => ReactNode
}

interface TableProps {
  columns: Column[]
  items: Lead[]
  onRowClick?: (item: Lead) => void
}

export const Table = ({ columns, items, onRowClick }: TableProps) => (
  <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
    <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
      <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
        <tr>
          {columns.map(column => (
            <th key={column.id} scope='col' className='px-6 py-3'>
              {column.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr
            key={index}
            className={`odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200 ${
              onRowClick
                ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'
                : ''
            }`}
            onClick={() => onRowClick?.(item)}
          >
            {columns.map(column => {
              const value = item[column.id as keyof Lead]

              // Se for a coluna de ações, renderizar diretamente o valor (que é um componente)
              if (column.id === 'actions') {
                return (
                  <td key={`${index}-${column.id}`} className='px-6 py-4'>
                    {value}
                  </td>
                )
              }

              // Para outras colunas, usar a função render se disponível ou converter para string
              const cellContent = column.render
                ? column.render(value, item)
                : String(value || '')

              return (
                <td key={`${index}-${column.id}`} className='px-6 py-4'>
                  {cellContent}
                </td>
              )
            })}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)
