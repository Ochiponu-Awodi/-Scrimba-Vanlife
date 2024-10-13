import { NavLink, Link } from "react-router-dom"
import './Header.css'

function fakeLogOut() {
  localStorage.removeItem("loggedin")
}

function Header () {
    const activeStyle = {
        fontWeight: 'bold',
        textDecoration: 'underline',
        color: '#161616'
    }

    return (
        <header>
          <Link to="/" className="site-logo" >#VANLIFE</Link>
          <nav>

            <NavLink to="/host" style={({isActive}) => isActive ? activeStyle : null}>Host</NavLink>

            <NavLink to="/about" style={({isActive}) => isActive ? activeStyle : null}>About</NavLink>
            <NavLink to="/vans" style={({isActive}) => isActive ? activeStyle : null}>Vans</NavLink>

            <Link 
                to="login" className="login-link">
                <img src="/avatar-icon.png" className="login-icon" />
            </Link>
            <button onClick={fakeLogOut}>X</button>
          </nav>
        </header>
    )
}

export default Header