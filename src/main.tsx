import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import IsLogined from './context/AuthContext.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store/store.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <IsLogined>
        <App />
      </IsLogined>
    </Provider>
  </StrictMode>
)
