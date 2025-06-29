import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { persistor, store } from './features/store'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
          <Toaster richColors position="top-right" />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
