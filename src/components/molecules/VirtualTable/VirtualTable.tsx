import React, { useMemo, useState, useCallback, useEffect, useRef } from 'react'
import { Loading } from '@/components/atoms/Loading'

export interface Column<T> {
  id: string
  title: string
  width?: number
  render?: (item: T, index: number) => React.ReactNode
}

export interface VirtualTableProps<T> {
  columns: Column<T>[]
  items: T[]
  onRowClick?: (item: T) => void
  rowHeight?: number
  className?: string
  itemsPerPage?: number
  isLoading?: boolean
  emptyTitle?: string
  emptyDescription?: string
}

const TABLE_STYLES = {
  header:
    'grid bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10',
  headerCell:
    'px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider overflow-hidden',
  row: 'grid border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors',
  cell: 'px-4 py-3 text-sm text-gray-900 dark:text-white flex items-center overflow-hidden',
  pagination:
    'flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700',
  paginationText: 'text-sm text-gray-700 dark:text-gray-300',
  paginationButton:
    'px-3 py-1 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed',
  container:
    'bg-white dark:bg-gray-900 rounded-lg shadow-sm w-full overflow-x-auto',
  tableWrapper: 'w-max'
} as const

export const VirtualTable = <T extends Record<string, unknown>>({
  columns,
  items,
  onRowClick,
  rowHeight = 60,
  className = '',
  itemsPerPage = 20,
  isLoading = false,
  emptyTitle = 'No items found',
  emptyDescription = 'No items available to display.'
}: VirtualTableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1)

  const containerRef = useRef<HTMLDivElement | null>(null)
  const [containerWidth, setContainerWidth] = useState(0)

  useEffect(() => {
    const element = containerRef.current
    if (!element) return

    const observer = new ResizeObserver(entries => {
      const entry = entries[0]
      setContainerWidth(Math.floor(entry.contentRect.width))
    })
    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const columnWidths = useMemo(
    () => columns.map(col => col.width || 150),
    [columns]
  )

  const adjustedColumnWidths = useMemo(() => {
    const baseTotal = columnWidths.reduce((sum, w) => sum + w, 0)
    if (containerWidth <= 0 || baseTotal >= containerWidth) return columnWidths

    const extra = containerWidth - baseTotal
    const addEach = Math.floor(extra / columnWidths.length)
    const remainder = extra % columnWidths.length

    return columnWidths.map((w, i) => w + addEach + (i < remainder ? 1 : 0))
  }, [columnWidths, containerWidth])

  const gridTemplateColumns = useMemo(
    () => adjustedColumnWidths.map(width => `${width}px`).join(' '),
    [adjustedColumnWidths]
  )

  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return items.slice(startIndex, endIndex)
  }, [items, currentPage, itemsPerPage])

  const totalPages = Math.ceil(items.length / itemsPerPage)

  const renderHeader = () => (
    <div className={TABLE_STYLES.header} style={{ gridTemplateColumns }}>
      {columns.map(column => (
        <div key={column.id} className={TABLE_STYLES.headerCell}>
          {column.title}
        </div>
      ))}
    </div>
  )

  const renderRow = useCallback(
    (item: T, index: number) => (
      <div
        key={`${currentPage}-${index}`}
        className={`${TABLE_STYLES.row} ${onRowClick ? 'cursor-pointer' : ''}`}
        style={{ height: rowHeight, gridTemplateColumns }}
        onClick={() => onRowClick?.(item)}
      >
        {columns.map(column => (
          <div key={`${index}-${column.id}`} className={TABLE_STYLES.cell}>
            {column.render ? (
              column.render(item, index)
            ) : (
              <span className='truncate'>{String(item[column.id] || '')}</span>
            )}
          </div>
        ))}
      </div>
    ),
    [columns, gridTemplateColumns, onRowClick, rowHeight, currentPage]
  )

  const renderPagination = () => {
    if (totalPages <= 1) return null

    const startItem = (currentPage - 1) * itemsPerPage + 1
    const endItem = Math.min(currentPage * itemsPerPage, items.length)

    return (
      <div className={TABLE_STYLES.pagination}>
        <div className={TABLE_STYLES.paginationText}>
          Showing {startItem} to {endItem} of {items.length} results
        </div>
        <div className='flex space-x-2'>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={TABLE_STYLES.paginationButton}
          >
            Previous
          </button>
          <span className={TABLE_STYLES.paginationText}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage(prev => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={TABLE_STYLES.paginationButton}
          >
            Next
          </button>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className='flex items-center justify-center py-12'>
        <Loading size='lg' />
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className='text-center py-6 sm:py-8 text-gray-500 dark:text-gray-400'>
        <svg
          className='mx-auto h-8 w-8 sm:h-12 sm:w-12 text-gray-400'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
          />
        </svg>
        <h3 className='mt-2 text-base sm:text-sm font-medium text-gray-900 dark:text-white'>
          {emptyTitle}
        </h3>
        <p className='mt-1 text-sm sm:text-sm text-gray-500 dark:text-gray-400 px-4 sm:px-0'>
          {emptyDescription}
        </p>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={`${TABLE_STYLES.container} ${className}`}
    >
      <div className={TABLE_STYLES.tableWrapper}>
        {renderHeader()}
        <div>{currentItems.map((item, index) => renderRow(item, index))}</div>
      </div>
      {renderPagination()}
    </div>
  )
}
