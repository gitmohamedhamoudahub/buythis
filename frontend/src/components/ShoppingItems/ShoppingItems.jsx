import ItemsList from './ItemsList.jsx'
import ShoppingItemsList from './ShoppingItemsList.jsx';
import ItemAddingForm from './ItemAddingForm.jsx'
import { useAuth } from '../../hooks/auth';
import Logout from '../LogOut/Logout.jsx';

function ShoppingItems()
{
      const { logout } = useAuth();
      const handleClick = () => {
        logout();
      };
    
    return(
    <>
    <div className="mainContainer">
    <Logout/>
    </div>
    {/* <ItemAddingForm /> */}
    {/* <ItemsList/> */}
    <ShoppingItemsList/>
    </>)
}
export default ShoppingItems;