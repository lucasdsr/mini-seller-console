import { Home } from './pages/Home'
import { Providers } from './providers'
import { MainLayout } from './components'

const App = () => (
  <Providers>
    <MainLayout>
      <Home />
    </MainLayout>
  </Providers>
)

export default App
