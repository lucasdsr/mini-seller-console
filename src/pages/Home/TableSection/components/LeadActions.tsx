import { Lead } from '@/contexts/home'
import { Dropdown, DropdownItem } from '@/components/molecules/Dropdown'
import { useHomeContext } from '@/contexts/home'

interface LeadActionsProps {
  lead: Lead
}

export const LeadActions = ({ lead }: LeadActionsProps) => {
  const { handleConvertLead } = useHomeContext()

  return (
    <Dropdown
      trigger={
        <button className='text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'>
          <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
            <path d='M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z' />
          </svg>
        </button>
      }
    >
      <DropdownItem onClick={() => handleConvertLead(lead)}>
        Convert Lead
      </DropdownItem>
    </Dropdown>
  )
}
