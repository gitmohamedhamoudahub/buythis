import { BrowserRouter as Router} from "react-router-dom";
import { Routes, Route } from 'react-router-dom';

import ShoppingItems from './components/ShoppingItems/ShoppingItems.jsx'
import ItemsList from './components/ShoppingItems/ItemsList.jsx'
import ItemAddingForm from './components/ShoppingItems/ItemAddingForm.jsx'
import ShoppingList from './components/ShoppingList/ShoppingList.jsx'
import ShoppingListDetails from './components/ShoppingListDetails/ShoppingListDetails.jsx'
import StartShopping from './components/StartShopping/StartShopping.jsx'
import AddShoppingListItem from './components/ShoppingListControls/AddShoppingListItem.jsx';
//import Navbar from "./components/NavBar.jsx";
import AuthPage from './pages/auth';
import Dashboard from './pages/dashboard';
import Navbar from './components/navbar/index.jsx';
import { ProtectedRoutes } from './components/protectedRoutes/index.jsx';
import { useAuth } from './hooks/auth';
import LandingPage from './pages/landing';
import './App.css'

function App() {
  const { cookies } = useAuth();
  return (
    <>
    <Navbar />
    <Routes>
      <Route path='/auth' element={<AuthPage />} />
      {!cookies.token && <Route path="/" element={<LandingPage />} />}
      
      <Route element={<ProtectedRoutes />}>
          <Route path="/"   element={<ShoppingList/>} />
          <Route path="/ShoppingItems" element={ <ShoppingItems /> } />
          <Route path="/StartShopping" element={<StartShopping />} />
          <Route path="/shopping-list/:id" element={<ShoppingListDetails />} />
        </Route>

    </Routes>
    </>
  )
}

export default App
