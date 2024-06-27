import { CssBaseline } from '@mui/material'
import { Provider } from 'react-redux'

import { ThemeProvider } from '@emotion/react'
import { theme } from './theme'
import { MainComponent } from './components/main/MainComponent'
import { store } from './store'
import { Layout } from './components/layout/Layout'

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <MainComponent />
        </Layout>
      </ThemeProvider>
    </Provider>
  )
}

export default App
