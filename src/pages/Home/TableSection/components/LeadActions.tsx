import { Lead } from '@/contexts/home'
import { Dropdown, DropdownItem } from '@/components/molecules/Dropdown'
import { useHomeContext } from '@/contexts/home'

interface LeadActionsProps {
  lead: Lead
}

export const LeadActions = ({ lead }: LeadActionsProps) => {
  const { handleConvertLead } = useHomeContext()

  const handleConvertClick = () => {
    // Executar a ação de conversão
    handleConvertLead(lead)
  }

  return (
    <div
      className='flex justify-center w-full'
      onClick={e => {
        // Impedir que o clique na coluna de ações propague para a linha
        e.stopPropagation()
      }}
    >
      <Dropdown
        trigger={
          <button className='p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex-shrink-0 w-8 h-8 flex items-center justify-center'>
            <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
              <path d='M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z' />
            </svg>
          </button>
        }
      >
        <DropdownItem onClick={handleConvertClick}>Convert Lead</DropdownItem>
      </Dropdown>
    </div>
  )
}
