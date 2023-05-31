import logo from '../assets/logo.svg';
import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { AppContext } from '../routes/appContext';
export default function Nav() {

    const appContext = useContext(AppContext);
    const [param, setParam] = useState(window.location.pathname);

    const handleLogout = () => {
        appContext.setUser(false);
        localStorage.removeItem('token');
        Navigate('/');
    }

    const showNav = () => {
        let nav = document.querySelector('nav-bg__nav_ul_active', 'nav-bg__nav_ul_link');
        nav.classList.remove('nav-bg__nav_ul_active', 'nav-bg__nav_ul_link');
        nav.classList.toggle('nav-bg__nav_ul_show');
    }

    return (
        <nav className='nav-bg'>
            <div className='container'>
                <div className='nav-bg__nav'>
                    <Link to='/'><img className='nav-bg__nav_logo' src={logo} alt="Logo la Brick Rouge" /></Link>
                    <ul className='nav-bg__nav_ul'>
                        <FontAwesomeIcon onClick={showNav} icon={faBars} />
                        <Link className={`${param === '/' ? 'nav-bg__nav_ul_active' : 'nav-bg__nav_ul_link'}`} to='/'>Accueil</Link>
                        <Link className={`${param === '/carte' ? 'nav-bg__nav_ul_active' : 'nav-bg__nav_ul_link'}`} to='/carte'>La carte</Link>
                        <Link className={`${param === '/reservation' ? 'nav-bg__nav_ul_active' : 'nav-bg__nav_ul_link'}`} to='/reservation'>Reservation</Link>
                        <Link className={`${param === '/evenements' ? 'nav-bg__nav_ul_active' : 'nav-bg__nav_ul_link'}`} to='/evenements'>Event</Link>
                    </ul>
                    {
                        appContext.user &&
                        (
                            <>
                                <div className='nav-bg__nav_loginGroup'>
                                    <Link className='nav-bg__nav_loginGroup_adminButton' to='/admin'>Admin</Link>
                                    <Link className='nav-bg__nav_loginGroup_logout' onClick={() => handleLogout()}>Déconnexion</Link>
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </nav>
    )
}