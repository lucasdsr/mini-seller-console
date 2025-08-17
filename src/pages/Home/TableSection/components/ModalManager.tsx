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

      {/* Modal de conversão */}
      <ConvertLeadModal lead={leadToConvert} isOpen={isConvertModalOpen} />

      {/* Toast de sucesso */}
      <Toast
        isVisible={showToast}
        onClose={handleCloseToast}
        type='success'
        duration={5000}
      >
        Lead convertido em oportunidade com sucesso!
      </Toast>
    </>
  )
}
