import { Table } from '@/components/molecules/Table'
import { EmptyTableState } from '../EmptyTableState'
import { useTableStateManager } from '../TableStateManager'
import { useHomeContext } from '@/contexts/home'
import { Lead } from '@/contexts/home'

export const LeadsTab = () => {
  const { columns, handleRowClick } = useHomeContext()
  const { itemsWithActions } = useTableStateManager()

  return (
    <div>
      <h2 className='text-xl font-bold text-white mb-4'>Leads</h2>
      {itemsWithActions.length > 0 ? (
        <Table<Lead>
          columns={columns}
          items={itemsWithActions}
          onRowClick={handleRowClick}
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
