import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode
} from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setThemeState] = useState<Theme>('light')

  const setTheme = (newTheme: Theme) => {
    console.log('🔧 setTheme chamado com:', newTheme)
    console.log('🔍 Estado anterior:', theme)

    setThemeState(newTheme)
    localStorage.setItem('theme', newTheme)

    // Aplica o tema ao documento
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
      console.log('✅ Classe dark ADICIONADA ao documento')
      console.log('📋 Classes atuais:', document.documentElement.className)
      console.log('🔍 Elemento HTML:', document.documentElement)
    } else {
      document.documentElement.classList.remove('dark')
      console.log('✅ Classe dark REMOVIDA do documento')
      console.log('📋 Classes atuais:', document.documentElement.className)
      console.log('🔍 Elemento HTML:', document.documentElement)
    }

    // Verificação adicional
    setTimeout(() => {
      const hasDarkClass = document.documentElement.classList.contains('dark')
      console.log('🔍 Verificação após 100ms - Tem classe dark?', hasDarkClass)
    }, 100)
  }

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    console.log('🔄 toggleTheme: mudando de', theme, 'para', newTheme)
    setTheme(newTheme)
  }

  // Aplica o tema inicial
  useEffect(() => {
    console.log('🚀 useEffect inicial executado')
    console.log('🔍 Estado inicial do tema:', theme)

    // Verifica se há um tema salvo no localStorage
    const savedTheme = localStorage.getItem('theme') as Theme
    console.log('📦 Tema encontrado no localStorage:', savedTheme)

    if (savedTheme) {
      console.log('📦 Aplicando tema salvo:', savedTheme)
      setTheme(savedTheme)
    } else {
      console.log('🌅 Usando tema padrão: light')
      setTheme('light')
    }

    // Verificação inicial das classes
    console.log(
      '🔍 Classes iniciais do documento:',
      document.documentElement.className
    )
    console.log(
      '🔍 Tem classe dark?',
      document.documentElement.classList.contains('dark')
    )
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
