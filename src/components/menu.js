import { Link } from 'react-router-dom'
import './menu.css';

const Menu = () => {
    return (

<div class="menu">
<nav role="navigation" class="primary-navigation">
  <ul>
    <li><a href="#"><Link to="/">Login</Link></a></li>
    <li><a href="#"><Link to="/Register">Register</Link></a></li>
    <li><a href="#"><Link to="/Profile">Profile</Link></a></li>
  </ul>
</nav>
</div>
        
    )
} 




export default Menu;
