import { Lead, LeadStatus, LEAD_STATUS_COLORS, Opportunity } from '@/contexts'
import { Button } from '@/components/atoms/Button'
import { Badge } from '@/components/atoms/Badge'
import { useHomeContext } from '@/contexts/home'

interface ItemDetailsProps {
  item: Lead | Opportunity
}

export const LeadDetails = ({ item }: ItemDetailsProps) => {
  const { handleConvertLead, opportunitiesList } = useHomeContext()

  // Verificar se é uma opportunity (tem propriedade convertedAt)
  const isOpportunity = 'convertedAt' in item
  const opportunity = isOpportunity ? (item as Opportunity) : null
  const lead = isOpportunity ? null : (item as Lead)

  // Verificar se o lead já foi convertido (só para leads)
  const isConverted = lead
    ? opportunitiesList.some(opp => opp.id === lead.id)
    : false

  const getStatusDisplay = (status: LeadStatus) => {
    const statusColors =
      LEAD_STATUS_COLORS[status] || 'bg-gray-100 text-gray-800'
    return (
      <span
        className={`px-3 py-1 text-xs font-medium rounded-full ${statusColors}`}
      >
        {status}
      </span>
    )
  }

  const getScoreDisplay = (score: number) => {
    let scoreColor = 'text-gray-600'
    if (score >= 80) scoreColor = 'text-green-600'
    else if (score >= 60) scoreColor = 'text-blue-600'
    else if (score >= 40) scoreColor = 'text-yellow-600'
    else scoreColor = 'text-red-600'

    return <span className={`font-semibold ${scoreColor}`}>{score}/100</span>
  }

  const formatDate = (date: Date) =>
    new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })

  const handleConvertClick = () => {
    if (lead) {
      handleConvertLead(lead)
    }
  }

  return (
    <div className='p-6'>
      <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-8'>
        {isOpportunity ? 'Detalhes da Oportunidade' : 'Detalhes do Lead'}
      </h2>

      <div className='space-y-6'>
        <div className='bg-gray-50 dark:bg-gray-700 p-6 rounded-lg'>
          <div className='flex justify-between items-center mb-4'>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
              Informações Básicas
            </h3>
            {(isOpportunity || isConverted) && (
              <Badge variant='success' size='sm'>
                Converted
              </Badge>
            )}
          </div>
          <div className='grid grid-cols-1 gap-4'>
            <div className='flex justify-between items-center py-2'>
              <span className='font-medium text-gray-700 dark:text-gray-300'>
                ID:
              </span>
              <span className='text-gray-900 dark:text-white font-mono'>
                #{item.id}
              </span>
            </div>
            <div className='flex justify-between items-center py-2'>
              <span className='font-medium text-gray-700 dark:text-gray-300'>
                Nome:
              </span>
              <span className='text-gray-900 dark:text-white font-medium'>
                {item.name}
              </span>
            </div>
            <div className='flex justify-between items-center py-2'>
              <span className='font-medium text-gray-700 dark:text-gray-300'>
                Empresa:
              </span>
              <span className='text-gray-900 dark:text-white'>
                {item.company}
              </span>
            </div>
          </div>
        </div>

        <div className='bg-gray-50 dark:bg-gray-700 p-6 rounded-lg'>
          <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
            Contato
          </h3>
          <div className='grid grid-cols-1 gap-4'>
            <div className='flex justify-between items-center py-2'>
              <span className='font-medium text-gray-700 dark:text-gray-300'>
                Email:
              </span>
              <span className='text-gray-900 dark:text-white break-all'>
                {item.email}
              </span>
            </div>
          </div>
        </div>

        <div className='bg-gray-50 dark:bg-gray-700 p-6 rounded-lg'>
          <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
            Informações de Negócio
          </h3>
          <div className='grid grid-cols-1 gap-4'>
            <div className='flex justify-between items-center py-2'>
              <span className='font-medium text-gray-700 dark:text-gray-300'>
                Origem:
              </span>
              <span className='text-gray-900 dark:text-white'>
                {item.source}
              </span>
            </div>
            <div className='flex justify-between items-center py-2'>
              <span className='font-medium text-gray-700 dark:text-gray-300'>
                Score:
              </span>
              {getScoreDisplay(item.score)}
            </div>
            <div className='flex justify-between items-center py-2'>
              <span className='font-medium text-gray-700 dark:text-gray-300'>
                Status:
              </span>
              {getStatusDisplay(item.status)}
            </div>
            {opportunity && (
              <div className='flex justify-between items-center py-2'>
                <span className='font-medium text-gray-700 dark:text-gray-300'>
                  Convertido em:
                </span>
                <span className='text-gray-900 dark:text-white font-medium'>
                  {formatDate(opportunity.convertedAt)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Botão Convert Lead - só aparece para leads não convertidos */}
        {lead && !isConverted && (
          <div className='flex justify-end pt-4'>
            <Button
              variant='primary'
              size='md'
              onClick={handleConvertClick}
              className='bg-green-600 hover:bg-green-700 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
            >
              Convert Lead
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
