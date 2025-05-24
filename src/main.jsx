import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthWrapper from './Components/AuthContext'

createRoot(document.getElementById('root')).render(
  <AuthWrapper>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthWrapper>
)
