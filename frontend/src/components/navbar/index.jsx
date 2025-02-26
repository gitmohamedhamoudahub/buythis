import { Link  } from "react-router-dom";

function Navbar() {
  
  return (
    <nav className="navbar">
        
      <ul className="nav-links">
        <li><Link to='/auth'>Login</Link></li>
        <li><Link to={`/`}>HOME</Link></li>
        <li><Link to="/ShoppingItems">SHOPPING ITEMS</Link></li>
        <li><Link to="/StartShopping">START SHOPPING</Link></li>
        
      </ul>
    </nav>
    
  );
}

export default Navbar;
