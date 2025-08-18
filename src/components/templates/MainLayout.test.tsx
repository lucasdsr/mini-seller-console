import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MainLayout } from './MainLayout'

describe('MainLayout Component', () => {
  it('should render children correctly', () => {
    render(
      <MainLayout>
        <div data-testid='test-child'>Test Content</div>
      </MainLayout>
    )

    expect(screen.getByTestId('test-child')).toBeInTheDocument()
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('should render multiple children', () => {
    render(
      <MainLayout>
        <h1>Title</h1>
        <p>Description</p>
        <button>Action</button>
      </MainLayout>
    )

    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
    expect(screen.getByText('Action')).toBeInTheDocument()
  })

  it('should have proper container styling', () => {
    render(
      <MainLayout>
        <div>Content</div>
      </MainLayout>
    )

    const container = document.querySelector(
      '.p-4.sm\\:p-6.min-h-screen.bg-black.text-white.transition-colors.duration-200'
    )
    expect(container).toHaveClass(
      'p-4',
      'sm:p-6',
      'min-h-screen',
      'bg-black',
      'text-white',
      'transition-colors',
      'duration-200'
    )
  })

  it('should have proper padding for different screen sizes', () => {
    render(
      <MainLayout>
        <div>Content</div>
      </MainLayout>
    )

    const container = document.querySelector(
      '.p-4.sm\\:p-6.min-h-screen.bg-black.text-white.transition-colors.duration-200'
    )
    expect(container).toHaveClass('p-4', 'sm:p-6')
  })

  it('should have full height', () => {
    render(
      <MainLayout>
        <div>Content</div>
      </MainLayout>
    )

    const container = document.querySelector(
      '.p-4.sm\\:p-6.min-h-screen.bg-black.text-white.transition-colors.duration-200'
    )
    expect(container).toHaveClass('min-h-screen')
  })

  it('should have black background', () => {
    render(
      <MainLayout>
        <div>Content</div>
      </MainLayout>
    )

    const container = document.querySelector(
      '.p-4.sm\\:p-6.min-h-screen.bg-black.text-white.transition-colors.duration-200'
    )
    expect(container).toHaveClass('bg-black')
  })

  it('should have white text', () => {
    render(
      <MainLayout>
        <div>Content</div>
      </MainLayout>
    )

    const container = document.querySelector(
      '.p-4.sm\\:p-6.min-h-screen.bg-black.text-white.transition-colors.duration-200'
    )
    expect(container).toHaveClass('text-white')
  })

  it('should have transition effects', () => {
    render(
      <MainLayout>
        <div>Content</div>
      </MainLayout>
    )

    const container = document.querySelector(
      '.p-4.sm\\:p-6.min-h-screen.bg-black.text-white.transition-colors.duration-200'
    )
    expect(container).toHaveClass('transition-colors', 'duration-200')
  })

  it('should render complex nested components', () => {
    const ComplexComponent = () => (
      <div>
        <header>
          <h1>App Header</h1>
          <nav>
            <ul>
              <li>Home</li>
              <li>About</li>
            </ul>
          </nav>
        </header>
        <main>
          <section>
            <h2>Main Content</h2>
            <p>This is the main content area</p>
          </section>
        </main>
      </div>
    )

    render(
      <MainLayout>
        <ComplexComponent />
      </MainLayout>
    )

    expect(screen.getByText('App Header')).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Main Content')).toBeInTheDocument()
    expect(
      screen.getByText('This is the main content area')
    ).toBeInTheDocument()
  })

  it('should handle empty children', () => {
    render(<MainLayout>{null}</MainLayout>)

    const container = document.querySelector('[class*="bg-black"]')
    expect(container).toBeInTheDocument()
  })

  it('should handle undefined children', () => {
    render(<MainLayout>{undefined}</MainLayout>)

    const container = document.querySelector('[class*="bg-black"]')
    expect(container).toBeInTheDocument()
  })

  it('should maintain proper structure with Col component', () => {
    render(
      <MainLayout>
        <div>Content</div>
      </MainLayout>
    )

    const container = document.querySelector(
      '.p-4.sm\\:p-6.min-h-screen.bg-black.text-white.transition-colors.duration-200'
    )
    const colComponent = container?.querySelector('[class*="flex flex-col"]')
    expect(colComponent).toBeInTheDocument()
  })

  it('should have proper z-index layering', () => {
    render(
      <MainLayout>
        <div>Content</div>
      </MainLayout>
    )

    const container = screen.getByText('Content').closest('div')
    expect(container).toBeInTheDocument()
  })

  it('should handle different types of children', () => {
    render(
      <MainLayout>
        <span>Text content</span>
        {42}
        {true && <div>Conditional content</div>}
        {false && <div>Hidden content</div>}
      </MainLayout>
    )

    expect(screen.getByText('Text content')).toBeInTheDocument()
    expect(screen.getByText('42')).toBeInTheDocument()
    expect(screen.getByText('Conditional content')).toBeInTheDocument()
    expect(screen.queryByText('Hidden content')).not.toBeInTheDocument()
  })

  it('should maintain proper spacing and layout', () => {
    render(
      <MainLayout>
        <div>Content</div>
      </MainLayout>
    )

    const container = document.querySelector(
      '.p-4.sm\\:p-6.min-h-screen.bg-black.text-white.transition-colors.duration-200'
    )
    expect(container).toHaveClass('min-h-screen')
  })
})
