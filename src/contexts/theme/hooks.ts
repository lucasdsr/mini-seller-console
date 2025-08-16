import { useTheme } from './context'

/**
 * Hook para verificar se o tema atual é escuro
 */
export const useIsDark = () => {
  const { theme } = useTheme()
  return theme === 'dark'
}

/**
 * Hook para verificar se o tema atual é claro
 */
export const useIsLight = () => {
  const { theme } = useTheme()
  return theme === 'light'
}

/**
 * Hook para obter classes condicionais baseadas no tema
 */
export const useThemeClasses = (lightClasses: string, darkClasses: string) => {
  const { theme } = useTheme()
  return theme === 'light' ? lightClasses : darkClasses
}
