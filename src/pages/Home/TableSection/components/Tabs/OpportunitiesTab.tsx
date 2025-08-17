import { Table } from '@/components/molecules/Table'
import { EmptyTableState } from '../EmptyTableState'
import { useHomeContext } from '@/contexts/home'

export const OpportunitiesTab = () => {
  const { columns, filteredOpportunities } = useHomeContext()

  return (
    <div>
      <h2 className='text-xl font-bold text-white mb-4'>Opportunities</h2>
      {filteredOpportunities.length > 0 ? (
        <Table
          columns={columns}
          items={filteredOpportunities}
          onRowClick={() => {}} // Opportunities não têm ações por enquanto
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
