import { Home } from './pages/Home'
import { Providers } from './providers'
import { MainLayout } from './components'
import { Loading } from './components/atoms/Loading'
import { useState, useEffect } from 'react'
import { simulateDelay } from './utils'

const AppContent = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(true)

  useEffect(() => {
    const initializeApp = async () => {
      await simulateDelay(3000)
      setIsInitialLoading(false)
    }

    initializeApp()
  }, [])

  if (isInitialLoading) {
    return <Loading fullScreen />
  }

  return (
    <MainLayout>
      <Home />
    </MainLayout>
  )
}

const App = () => (
  <Providers>
    <AppContent />
  </Providers>
)

export default App
