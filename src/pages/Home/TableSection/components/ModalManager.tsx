import { ConvertLeadModal } from './ConvertLeadModal'
import { Toast } from '@/components/molecules/Toast'
import { useHomeContext } from '@/contexts/home'

interface ModalManagerProps {
  children: React.ReactNode
}

export const ModalManager = ({ children }: ModalManagerProps) => {
  const { leadToConvert, isConvertModalOpen, showToast, handleCloseToast } =
    useHomeContext()

  return (
    <>
      {children}

      <ConvertLeadModal lead={leadToConvert} isOpen={isConvertModalOpen} />

      <Toast
        isVisible={showToast}
        onClose={handleCloseToast}
        type='success'
        duration={5000}
      >
        Lead successfully converted to opportunity!
      </Toast>
    </>
  )
}
