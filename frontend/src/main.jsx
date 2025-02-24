import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import { ShoppingItemsProvider } from './context/ShoppingItemsContext.jsx';
import { ShoppingListProvider } from './context/ShoppingListContext.jsx';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ShoppingListProvider>
    <ShoppingItemsProvider>
    <Router>
    <App />
    </Router>
    </ShoppingItemsProvider>
    </ShoppingListProvider>
  </StrictMode>,
)
