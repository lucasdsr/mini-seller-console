import { Lead, LeadStatus, LEAD_STATUS_COLORS } from '@/contexts/leads'

interface LeadDetailsProps {
  lead: Lead
}

export const LeadDetails = ({ lead }: LeadDetailsProps) => {
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

  return (
    <div className='p-6'>
      <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-8'>
        Detalhes do Lead
      </h2>

      <div className='space-y-6'>
        <div className='bg-gray-50 dark:bg-gray-700 p-6 rounded-lg'>
          <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
            Informações Básicas
          </h3>
          <div className='grid grid-cols-1 gap-4'>
            <div className='flex justify-between items-center py-2'>
              <span className='font-medium text-gray-700 dark:text-gray-300'>
                ID:
              </span>
              <span className='text-gray-900 dark:text-white font-mono'>
                #{lead.id}
              </span>
            </div>
            <div className='flex justify-between items-center py-2'>
              <span className='font-medium text-gray-700 dark:text-gray-300'>
                Nome:
              </span>
              <span className='text-gray-900 dark:text-white font-medium'>
                {lead.name}
              </span>
            </div>
            <div className='flex justify-between items-center py-2'>
              <span className='font-medium text-gray-700 dark:text-gray-300'>
                Empresa:
              </span>
              <span className='text-gray-900 dark:text-white'>
                {lead.company}
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
                {lead.email}
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
                {lead.source}
              </span>
            </div>
            <div className='flex justify-between items-center py-2'>
              <span className='font-medium text-gray-700 dark:text-gray-300'>
                Score:
              </span>
              {getScoreDisplay(lead.score)}
            </div>
            <div className='flex justify-between items-center py-2'>
              <span className='font-medium text-gray-700 dark:text-gray-300'>
                Status:
              </span>
              {getStatusDisplay(lead.status)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
