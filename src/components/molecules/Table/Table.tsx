import { ReactNode } from 'react'

interface Column<T> {
  id: string
  title: string
  render?: (value: unknown, item: T) => ReactNode
}

interface TableProps<T> {
  columns: Column<T>[]
  items: T[]
  onRowClick?: (item: T) => void
}

export const Table = <T extends Record<string, unknown>>({
  columns,
  items,
  onRowClick
}: TableProps<T>) => (
  <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
    <table className='w-full text-xs sm:text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
      <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
        <tr>
          {columns.map(column => (
            <th
              key={column.id}
              scope='col'
              className='px-3 sm:px-6 py-2 sm:py-3'
            >
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
              const value = item[column.id as keyof T]

              if (column.id === 'actions') {
                return (
                  <td
                    key={`${index}-${column.id}`}
                    className='px-3 sm:px-6 py-3 sm:py-4'
                  >
                    {value as ReactNode}
                  </td>
                )
              }

              const cellContent = column.render
                ? column.render(value, item)
                : String(value || '')

              return (
                <td
                  key={`${index}-${column.id}`}
                  className='px-3 sm:px-6 py-3 sm:py-4'
                >
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
