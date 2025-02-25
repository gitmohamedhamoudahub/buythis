import { BrowserRouter as Router} from "react-router-dom";
import { Routes, Route } from 'react-router-dom';

import ShoppingItems from './components/ShoppingItems/ShoppingItems.jsx'
import ItemsList from './components/ShoppingItems/ItemsList.jsx'
import ItemAddingForm from './components/ShoppingItems/ItemAddingForm.jsx'
import ShoppingList from './components/ShoppingList/ShoppingList.jsx'
import ShoppingListDetails from './components/ShoppingListDetails/ShoppingListDetails.jsx'
import StartShopping from './components/StartShopping/StartShopping.jsx'
import AddShoppingListItem from './components/ShoppingListControls/AddShoppingListItem.jsx';
import Navbar from "./components/NavBar.jsx";
import './App.css'

function App() {
 
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<ShoppingList/>} />
      {/* <Route path="/ShoppingLists" element={<h1>x</h1>} /> */}
      <Route path="/ShoppingItems" element={ <ShoppingItems /> } />
      <Route path="/StartShopping" element={<StartShopping />} />
      <Route path="/shopping-list/:id" element={<ShoppingListDetails />} />
    </Routes>
    </>
  )
}

export default App
