import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import { ShoppingItemsProvider } from './context/ShoppingItemsContext.jsx';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ShoppingItemsProvider>
    <Router>
    <App />
    </Router>
    </ShoppingItemsProvider>
  </StrictMode>,
)
