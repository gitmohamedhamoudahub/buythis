import { useAuth } from '../../hooks/auth';
import './logout.css'
function Logout()
{
      const { logout } = useAuth();
      const handleClick = () => {
        logout();
      };
     
    
    return(
        <div className="logout-container">
        <button className='btnLogout' onClick={handleClick}><strong>LogOut</strong></button>
        </div>
    )
}

export default Logout;