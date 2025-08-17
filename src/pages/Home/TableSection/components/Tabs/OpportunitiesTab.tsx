import { Table } from '@/components/molecules/Table'
import { EmptyTableState } from '../EmptyTableState'
import { useHomeContext } from '@/contexts/home'
import { Opportunity } from '@/contexts/home'

export const OpportunitiesTab = () => {
  const { columns, filteredOpportunities, handleOpportunityRowClick } =
    useHomeContext()

  return (
    <div>
      <h2 className='text-xl font-bold text-white mb-4'>Opportunities</h2>
      {filteredOpportunities.length > 0 ? (
        <Table<Opportunity>
          columns={columns}
          items={filteredOpportunities}
          onRowClick={handleOpportunityRowClick}
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
