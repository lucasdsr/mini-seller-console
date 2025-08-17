import { ReactNode } from 'react'

interface Column {
  id: string
  title: string
  render?: (value: unknown, item: Record<string, unknown>) => ReactNode
}

interface TableProps {
  columns: Column[]
  items: Record<string, unknown>[]
}

export const Table = ({ columns, items }: TableProps) => (
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
            className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200'
          >
            {columns.map(column => {
              const value = item[column.id]
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
