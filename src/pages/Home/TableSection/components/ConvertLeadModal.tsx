import { Modal } from '@/components/molecules/Modal'
import { Button } from '@/components/atoms/Button'
import { Lead } from '@/contexts/home'
import { useHomeContext } from '@/contexts/home'

interface ConvertLeadModalProps {
  lead: Lead | null
  isOpen: boolean
}

export const ConvertLeadModal = ({ lead, isOpen }: ConvertLeadModalProps) => {
  const {
    handleCloseConvertModal,
    handleConfirmConversion,
    handleCloseDrawer
  } = useHomeContext()

  const handleConfirmAndClose = () => {
    handleConfirmConversion()
    handleCloseDrawer()
  }

  if (!lead) return null
  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCloseConvertModal}
      title='Convert into Opportunity'
      size='md'
    >
      <div className='space-y-4 sm:space-y-6'>
        <p className='text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed'>
          You are about to convert this lead into an opportunity. Please confirm
          the essential information:
        </p>

        <div className='bg-gray-50 dark:bg-gray-700 p-3 sm:p-4 rounded-lg space-y-3 sm:space-y-4'>
          <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-1 sm:space-y-0'>
            <span className='font-medium text-gray-700 dark:text-gray-300 text-sm sm:text-base'>
              Name:
            </span>
            <span className='text-gray-900 dark:text-white text-sm sm:text-base break-words'>
              {lead.name}
            </span>
          </div>
          <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-1 sm:space-y-0'>
            <span className='font-medium text-gray-700 dark:text-gray-300 text-sm sm:text-base'>
              Company:
            </span>
            <span className='text-gray-900 dark:text-white text-sm sm:text-base break-words'>
              {lead.company}
            </span>
          </div>
          <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-1 sm:space-y-0'>
            <span className='font-medium text-gray-700 dark:text-gray-300 text-sm sm:text-base'>
              Email:
            </span>
            <span className='text-gray-900 dark:text-white text-sm sm:text-base break-all'>
              {lead.email}
            </span>
          </div>
          <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-1 sm:space-y-0'>
            <span className='font-medium text-gray-700 dark:text-gray-300 text-sm sm:text-base'>
              Score:
            </span>
            <span className='text-gray-900 dark:text-white text-sm sm:text-base font-semibold'>
              {lead.score}/100
            </span>
          </div>
        </div>

        <div className='flex flex-col sm:flex-row sm:justify-between pt-4 sm:pt-6 space-y-3 sm:space-y-0 sm:space-x-4'>
          <Button
            variant='outline'
            onClick={handleCloseConvertModal}
            className='w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-2 text-sm sm:text-base'
            size='md'
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmAndClose}
            className='w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-2 text-sm sm:text-base'
            size='md'
          >
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  )
}
