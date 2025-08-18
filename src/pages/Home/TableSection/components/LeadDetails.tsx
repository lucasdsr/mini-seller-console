import { Lead, LeadStatus, LEAD_STATUS_COLORS, Opportunity } from '@/contexts'
import { Button } from '@/components/atoms/Button'
import { Badge } from '@/components/atoms/Badge'
import { useHomeContext } from '@/contexts/home'

interface ItemDetailsProps {
  item: Lead | Opportunity
}

export const LeadDetails = ({ item }: ItemDetailsProps) => {
  const { handleConvertLead, opportunitiesList } = useHomeContext()

  const isOpportunity = 'convertedAt' in item
  const opportunity = isOpportunity ? (item as Opportunity) : null
  const lead = isOpportunity ? null : (item as Lead)

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
    new Date(date).toLocaleDateString('en-US', {
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
    <div className='p-4 sm:p-6'>
      <h2 className='text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8'>
        {isOpportunity ? 'Opportunity Details' : 'Lead Details'}
      </h2>

      <div className='space-y-4 sm:space-y-6'>
        <div className='bg-gray-50 dark:bg-gray-700 p-4 sm:p-6 rounded-lg'>
          <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 space-y-2 sm:space-y-0'>
            <h3 className='text-base sm:text-lg font-semibold text-gray-900 dark:text-white'>
              Basic Information
            </h3>
            {(isOpportunity || isConverted) && (
              <Badge variant='success' size='sm'>
                Converted
              </Badge>
            )}
          </div>
          <div className='grid grid-cols-1 gap-3 sm:gap-4'>
            <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 space-y-1 sm:space-y-0'>
              <span className='font-medium text-gray-700 dark:text-gray-300 text-sm sm:text-base'>
                ID:
              </span>
              <span className='text-gray-900 dark:text-white font-mono text-sm sm:text-base'>
                #{item.id}
              </span>
            </div>
            <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 space-y-1 sm:space-y-0'>
              <span className='font-medium text-gray-700 dark:text-gray-300 text-sm sm:text-base'>
                Name:
              </span>
              <span className='text-gray-900 dark:text-white font-medium text-sm sm:text-base break-words'>
                {item.name}
              </span>
            </div>
            <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 space-y-1 sm:space-y-0'>
              <span className='font-medium text-gray-700 dark:text-gray-300 text-sm sm:text-base'>
                Company:
              </span>
              <span className='text-gray-900 dark:text-white text-sm sm:text-base break-words'>
                {item.company}
              </span>
            </div>
          </div>
        </div>

        <div className='bg-gray-50 dark:bg-gray-700 p-4 sm:p-6 rounded-lg'>
          <h3 className='text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4'>
            Contact
          </h3>
          <div className='grid grid-cols-1 gap-3 sm:gap-4'>
            <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 space-y-1 sm:space-y-0'>
              <span className='font-medium text-gray-700 dark:text-gray-300 text-sm sm:text-base'>
                Email:
              </span>
              <span className='text-gray-900 dark:text-white break-all text-sm sm:text-base'>
                {item.email}
              </span>
            </div>
          </div>
        </div>

        <div className='bg-gray-50 dark:bg-gray-700 p-4 sm:p-6 rounded-lg'>
          <h3 className='text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4'>
            Business Information
          </h3>
          <div className='grid grid-cols-1 gap-3 sm:gap-4'>
            <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 space-y-1 sm:space-y-0'>
              <span className='font-medium text-gray-700 dark:text-gray-300 text-sm sm:text-base'>
                Source:
              </span>
              <span className='text-gray-900 dark:text-white text-sm sm:text-base'>
                {item.source}
              </span>
            </div>
            <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 space-y-1 sm:space-y-0'>
              <span className='font-medium text-gray-700 dark:text-gray-300 text-sm sm:text-base'>
                Score:
              </span>
              <span className='text-sm sm:text-base'>
                {getScoreDisplay(item.score)}
              </span>
            </div>
            <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 space-y-1 sm:space-y-0'>
              <span className='font-medium text-gray-700 dark:text-gray-300 text-sm sm:text-base'>
                Status:
              </span>
              <div className='text-sm sm:text-base'>
                {getStatusDisplay(item.status)}
              </div>
            </div>
            {opportunity && (
              <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 space-y-1 sm:space-y-0'>
                <span className='font-medium text-gray-700 dark:text-gray-300 text-sm sm:text-base'>
                  Converted at:
                </span>
                <span className='text-gray-900 dark:text-white font-medium text-sm sm:text-base'>
                  {formatDate(opportunity.convertedAt)}
                </span>
              </div>
            )}
          </div>
        </div>

        {lead && !isConverted && (
          <div className='flex justify-end pt-4'>
            <Button
              variant='primary'
              size='md'
              onClick={handleConvertClick}
              className='w-full sm:w-auto bg-green-600 hover:bg-green-700 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
            >
              Convert Lead
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
