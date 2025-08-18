import { Button } from '@/components/atoms/Button'
import { Input } from '@/components/atoms/Input'
import { Select } from '@/components/atoms/Select'
import { useState, useCallback } from 'react'

interface EditableFieldProps {
  label: string
  value: string
  isEditing: boolean
  onEdit: () => void
  onCancel: () => void
  onSave: (value: string) => void
  validation?: (value: string) => string | null
  inputType?: 'text' | 'select'
  options?: { value: string; label: string }[]
}

export const EditableField = ({
  label,
  value,
  isEditing,
  onEdit,
  onCancel,
  onSave,
  validation,
  inputType = 'text',
  options = []
}: EditableFieldProps) => {
  const [editValue, setEditValue] = useState(value)
  const [error, setError] = useState<string | null>(null)

  const handleSave = useCallback(() => {
    if (validation) {
      const validationError = validation(editValue)
      if (validationError) {
        setError(validationError)
        return
      }
    }

    onSave(editValue)
    setError(null)
  }, [editValue, validation, onSave])

  const handleCancel = useCallback(() => {
    setEditValue(value)
    setError(null)
    onCancel()
  }, [value, onCancel])

  if (isEditing) {
    return (
      <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 space-y-2 sm:space-y-0'>
        <span className='font-medium text-gray-700 dark:text-gray-300 text-sm sm:text-base'>
          {label}:
        </span>
        <div className='flex flex-col sm:flex-row gap-2 w-full sm:w-auto'>
          {inputType === 'select' ? (
            <Select
              value={editValue}
              onChange={e => setEditValue(e.target.value)}
              options={options}
              className='w-full sm:w-48'
            />
          ) : (
            <Input
              value={editValue}
              onChange={e => setEditValue(e.target.value)}
              className='w-full sm:w-64'
              error={error}
            />
          )}
          <div className='flex gap-2'>
            <Button
              variant='primary'
              size='sm'
              onClick={handleSave}
              className='px-3 py-1 text-xs'
            >
              Save
            </Button>
            <Button
              variant='secondary'
              size='sm'
              onClick={handleCancel}
              className='px-3 py-1 text-xs'
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 space-y-1 sm:space-y-0'>
      <span className='font-medium text-gray-700 dark:text-gray-300 text-sm sm:text-base'>
        {label}:
      </span>
      <div className='flex items-center gap-2'>
        <span className='text-gray-900 dark:text-white text-sm sm:text-base break-all'>
          {value}
        </span>
        <Button
          variant='outline'
          size='sm'
          onClick={onEdit}
          className='p-1 text-gray-400 hover:text-gray-600'
        >
          <svg
            className='w-4 h-4'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
            />
          </svg>
        </Button>
      </div>
    </div>
  )
}
