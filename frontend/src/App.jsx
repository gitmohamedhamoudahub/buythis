import { BrowserRouter as Router} from "react-router-dom";
import { Routes, Route } from 'react-router-dom';

import ShoppingItems from './components/ShoppingItems/ShoppingItems.jsx'
import ItemsList from './components/ShoppingItems/ItemsList.jsx'
import ItemAddingForm from './components/ShoppingItems/ItemAddingForm.jsx'
import ShoppingList from './components/ShoppingList/ShoppingList.jsx'
import ShoppingListDetails from './components/ShoppingListDetails/ShoppingListDetails.jsx'
import Navbar from "./components/NavBar.jsx";
import './App.css'

function App() {
 
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<ShoppingList/>} />
      <Route path="/ShoppingLists" element={<h1>Lists</h1>} />
      <Route path="/ShoppingItems" element={ <ShoppingItems /> } />
      <Route path="/StartShopping" element={<h1>Start Shopping</h1>} />
      <Route path="/shopping-list/:id" element={<ShoppingListDetails />} />
    </Routes>
    </>
  )
}

export default App
