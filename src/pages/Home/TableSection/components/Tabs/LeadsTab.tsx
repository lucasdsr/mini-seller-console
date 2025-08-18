import { VirtualTable } from '@/components/molecules/VirtualTable'
import { EmptyTableState } from '../EmptyTableState'
import { useTableStateManager } from '../TableStateManager'
import { useHomeContext } from '@/contexts/home'
import { Lead } from '@/contexts/home'
import { Loading } from '@/components/atoms/Loading'
import { useVirtualTableColumns } from './useVirtualTableColumns'

export const LeadsTab = () => {
  const { columns, handleRowClick, isFiltering } = useHomeContext()
  const { itemsWithActions } = useTableStateManager()

  const virtualColumns = useVirtualTableColumns({ columns, type: 'leads' })

  if (isFiltering) {
    return (
      <div className='flex items-center justify-center py-12'>
        <Loading size='lg' />
      </div>
    )
  }

  return (
    <div>
      <h2 className='text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4'>
        Leads
      </h2>
      {itemsWithActions.length > 0 ? (
        <VirtualTable<Lead>
          columns={virtualColumns}
          items={itemsWithActions}
          onRowClick={handleRowClick}
          rowHeight={70}
          isLoading={false}
          emptyTitle='Nenhum lead encontrado'
          emptyDescription='Comece adicionando alguns leads para ver as informações aqui.'
        />
      ) : (
        <EmptyTableState
          title='Nenhum lead encontrado'
          description='Comece adicionando alguns leads para ver as informações aqui.'
        />
      )}
    </div>
  )
}
