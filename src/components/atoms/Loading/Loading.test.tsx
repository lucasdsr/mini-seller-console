import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Loading } from './Loading'

describe('Loading Component', () => {
  it('should render with default size', () => {
    render(<Loading />)
    const spinner = document.querySelector('svg')
    expect(spinner).toBeInTheDocument()
    expect(spinner).toHaveClass('w-16', 'h-16')
  })

  it('should render with small size', () => {
    render(<Loading size='sm' />)
    const spinner = document.querySelector('svg')
    expect(spinner).toHaveClass('w-6', 'h-6')
  })

  it('should render with medium size', () => {
    render(<Loading size='md' />)
    const spinner = document.querySelector('svg')
    expect(spinner).toHaveClass('w-8', 'h-8')
  })

  it('should render with large size', () => {
    render(<Loading size='lg' />)
    const spinner = document.querySelector('svg')
    expect(spinner).toHaveClass('w-16', 'h-16')
  })

  it('should render with extra large size', () => {
    render(<Loading size='xl' />)
    const spinner = document.querySelector('svg')
    expect(spinner).toHaveClass('w-24', 'h-24')
  })

  it('should render with custom size', () => {
    render(<Loading size='xl' />)
    const spinner = document.querySelector('svg')
    expect(spinner).toHaveClass('w-24', 'h-24')
  })

  it('should have proper container styling when not fullScreen', () => {
    render(<Loading />)
    const container = document.querySelector(
      '.flex.items-center.justify-center.p-4'
    )
    expect(container).toHaveClass(
      'flex',
      'items-center',
      'justify-center',
      'p-4'
    )
    expect(container).not.toHaveClass('fixed', 'inset-0', 'z-50')
  })

  it('should render in fullScreen mode when specified', () => {
    render(<Loading fullScreen />)
    const container = document.querySelector('.fixed.inset-0.z-50')
    expect(container).toHaveClass(
      'fixed',
      'inset-0',
      'z-50',
      'bg-gray-900',
      'bg-opacity-75'
    )
  })

  it('should center content in fullScreen mode', () => {
    render(<Loading fullScreen />)
    const container = document.querySelector('.fixed.inset-0.z-50')
    expect(container).toHaveClass('flex', 'items-center', 'justify-center')
  })

  it('should have proper z-index in fullScreen mode', () => {
    render(<Loading fullScreen />)
    const container = document.querySelector('.fixed.inset-0.z-50')
    expect(container).toHaveClass('z-50')
  })

  it('should have proper background overlay in fullScreen mode', () => {
    render(<Loading fullScreen />)
    const container = document.querySelector('.fixed.inset-0.z-50')
    expect(container).toHaveClass('bg-gray-900', 'bg-opacity-75')
  })

  it('should have proper spinner styling', () => {
    render(<Loading />)
    const spinner = document.querySelector('svg')
    expect(spinner).toHaveClass(
      'text-gray-200',
      'animate-spin',
      'fill-blue-600'
    )
  })

  it('should have dark mode support', () => {
    render(<Loading />)
    const spinner = document.querySelector('svg')
    expect(spinner).toHaveClass('dark:text-gray-600')
  })

  it('should have proper viewBox attribute', () => {
    render(<Loading />)
    const spinner = document.querySelector('svg')
    expect(spinner).toHaveAttribute('viewBox', '0 0 100 101')
  })

  it('should have proper fill attribute', () => {
    render(<Loading />)
    const spinner = document.querySelector('svg')
    expect(spinner).toHaveAttribute('fill', 'none')
  })

  it('should have proper xmlns attribute', () => {
    render(<Loading />)
    const spinner = document.querySelector('svg')
    expect(spinner).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg')
  })

  it('should have proper aria-hidden attribute', () => {
    render(<Loading />)
    const spinner = document.querySelector('svg')
    expect(spinner).toHaveAttribute('aria-hidden', 'true')
  })

  it('should handle different size props correctly', () => {
    const { rerender } = render(<Loading size='sm' />)
    let spinner = document.querySelector('svg')
    expect(spinner).toHaveClass('w-6', 'h-6')

    rerender(<Loading size='lg' />)
    spinner = document.querySelector('svg')
    expect(spinner).toHaveClass('w-16', 'h-16')
  })

  it('should handle fullScreen prop changes', () => {
    const { rerender } = render(<Loading />)
    expect(
      document.querySelector('.fixed.inset-0.z-50')
    ).not.toBeInTheDocument()

    rerender(<Loading fullScreen />)
    expect(document.querySelector('.fixed.inset-0.z-50')).toBeInTheDocument()
  })

  it('should maintain spinner content in all modes', () => {
    render(<Loading fullScreen />)
    const spinner = document.querySelector('svg')
    expect(spinner).toBeInTheDocument()
    expect(spinner?.querySelector('path')).toBeInTheDocument()
  })
})
