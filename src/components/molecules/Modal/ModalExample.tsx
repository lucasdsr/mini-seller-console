import { useState } from 'react'
import { Modal } from './Modal'
import { Button } from '@/components/atoms/Button'

export const ModalExample = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [modalSize, setModalSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md')
  const [modalTitle, setModalTitle] = useState('Exemplo de Modal')

  const openModal = (size: 'sm' | 'md' | 'lg' | 'xl', title: string) => {
    setModalSize(size)
    setModalTitle(title)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <div className='space-y-4'>
      <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
        Exemplos de Modal
      </h3>

      <div className='flex flex-wrap gap-2'>
        <Button onClick={() => openModal('sm', 'Modal Pequeno')}>
          Modal Pequeno
        </Button>
        <Button onClick={() => openModal('md', 'Modal Médio')}>
          Modal Médio
        </Button>
        <Button onClick={() => openModal('lg', 'Modal Grande')}>
          Modal Grande
        </Button>
        <Button onClick={() => openModal('xl', 'Modal Extra Grande')}>
          Modal XL
        </Button>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title={modalTitle}
        size={modalSize}
      >
        <div className='space-y-4'>
          <p className='text-gray-600 dark:text-gray-400'>
            Este é um exemplo de modal baseado no Flowbite. Ele inclui:
          </p>

          <ul className='list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400'>
            <li>Suporte a tema escuro</li>
            <li>Diferentes tamanhos (sm, md, lg, xl, 2xl, etc.)</li>
            <li>Fechamento com ESC ou clique no overlay</li>
            <li>Botão de fechar personalizável</li>
            <li>Header opcional com título</li>
            <li>Acessibilidade completa (ARIA labels)</li>
            <li>Responsivo para todos os dispositivos</li>
          </ul>

          <div className='flex justify-end space-x-2 pt-4'>
            <Button
              variant='outline'
              onClick={closeModal}
              className='px-4 py-2'
            >
              Cancelar
            </Button>
            <Button onClick={closeModal} className='px-4 py-2'>
              Confirmar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
