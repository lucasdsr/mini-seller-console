import { ReactNode, useState } from 'react'

interface Tab {
  id: string
  label: string
  content: ReactNode
  disabled?: boolean
}

interface TabsProps {
  tabs: Tab[]
  defaultActiveTab?: string
  className?: string
}

export const Tabs = ({ tabs, defaultActiveTab, className = '' }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab || tabs[0]?.id)

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId)
  }

  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content

  return (
    <div className={className}>
      {/* Tab Headers */}
      <div className='border-b border-gray-200 dark:border-gray-700'>
        <ul className='flex flex-wrap -mb-px text-xs sm:text-sm font-medium text-center text-gray-500 dark:text-gray-400'>
          {tabs.map(tab => (
            <li key={tab.id} className='me-1 sm:me-2'>
              <button
                onClick={() => handleTabClick(tab.id)}
                disabled={tab.disabled}
                className={`inline-flex items-center justify-center p-2 sm:p-4 border-b-2 rounded-t-lg ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500'
                    : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                } ${
                  tab.disabled
                    ? 'opacity-50 cursor-not-allowed'
                    : 'cursor-pointer'
                }`}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Tab Content */}
      <div className='mt-3 sm:mt-4'>{activeTabContent}</div>
    </div>
  )
}
