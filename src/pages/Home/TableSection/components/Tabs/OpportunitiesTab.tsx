import { VirtualTable } from '@/components/molecules/VirtualTable'
import { EmptyTableState } from '../EmptyTableState'
import { useHomeContext } from '@/contexts/home'
import { Opportunity } from '@/contexts/home'
import { Loading } from '@/components/atoms/Loading'
import { useVirtualTableColumns } from './useVirtualTableColumns'

export const OpportunitiesTab = () => {
  const {
    columns,
    filteredOpportunities,
    handleOpportunityRowClick,
    isFiltering
  } = useHomeContext()

  const virtualColumns = useVirtualTableColumns({
    columns,
    type: 'opportunities'
  })

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
        Opportunities
      </h2>
      {filteredOpportunities.length > 0 ? (
        <VirtualTable<Opportunity>
          columns={virtualColumns}
          items={filteredOpportunities}
          onRowClick={handleOpportunityRowClick}
          rowHeight={70}
          isLoading={false}
          emptyTitle='Nenhuma oportunidade encontrada'
          emptyDescription='Converta leads em oportunidades para vê-las aqui.'
        />
      ) : (
        <EmptyTableState
          title='Nenhuma oportunidade encontrada'
          description='Converta leads em oportunidades para vê-las aqui.'
        />
      )}
    </div>
  )
}
