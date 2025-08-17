import { Modal } from '@/components/molecules/Modal'
import { Button } from '@/components/atoms/Button'
import { Lead } from '@/contexts/home'
import { useHomeContext } from '@/contexts/home'

interface ConvertLeadModalProps {
  lead: Lead | null
  isOpen: boolean
}

export const ConvertLeadModal = ({ lead, isOpen }: ConvertLeadModalProps) => {
  const { handleCloseConvertModal, handleConfirmConversion } = useHomeContext()

  if (!lead) return null
  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCloseConvertModal}
      title='Convert into Opportunity'
      size='md'
    >
      <div className='space-y-4'>
        <p className='text-gray-600 dark:text-gray-400'>
          Você está prestes a converter este lead em uma oportunidade. Confirme
          as informações essenciais:
        </p>

        <div className='bg-gray-50 dark:bg-gray-700 p-4 rounded-lg space-y-3'>
          <div className='flex justify-between'>
            <span className='font-medium text-gray-700 dark:text-gray-300'>
              Nome:
            </span>
            <span className='text-gray-900 dark:text-white'>{lead.name}</span>
          </div>
          <div className='flex justify-between'>
            <span className='font-medium text-gray-700 dark:text-gray-300'>
              Empresa:
            </span>
            <span className='text-gray-900 dark:text-white'>
              {lead.company}
            </span>
          </div>
          <div className='flex justify-between'>
            <span className='font-medium text-gray-700 dark:text-gray-300'>
              Email:
            </span>
            <span className='text-gray-900 dark:text-white break-all'>
              {lead.email}
            </span>
          </div>
          <div className='flex justify-between'>
            <span className='font-medium text-gray-700 dark:text-gray-300'>
              Score:
            </span>
            <span className='text-gray-900 dark:text-white font-semibold'>
              {lead.score}/100
            </span>
          </div>
        </div>

        <div className='flex justify-between pt-4'>
          <Button
            variant='outline'
            onClick={handleCloseConvertModal}
            className='px-6 py-2'
          >
            Cancel
          </Button>
          <Button onClick={handleConfirmConversion} className='px-6 py-2'>
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  )
}
