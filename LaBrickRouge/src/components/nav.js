import logo from '../assets/logo.svg';
import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { AppContext } from '../routes/appContext';
export default function Nav() {

    const appContext = useContext(AppContext);
    const [param, setParam] = useState(window.location.pathname);
    const [isNavOpen, setIsNavOpen] = useState(false);

    const handleLogout = () => {
        appContext.setUser(false);
        localStorage.removeItem('token');
        Navigate('/');
    }
    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    return (
        <nav className='nav-bg'>
            <div className='container'>
                <div className='nav-bg__nav'>
                    <Link to='/'><img className='nav-bg__nav_logo' src={logo} alt="Logo la Brick Rouge" /></Link>
                    <FontAwesomeIcon className='nav-bg__nav_menuIcon' icon={faBars} onClick={toggleNav} />
                    <div className={` ${isNavOpen ? 'nav-bg__nav_navOpenBackGround' : 'nav-bg__nav_ul'}`}>
                        <ul className={` ${isNavOpen ? 'nav-bg__nav_ul_isNavOpen' : 'nav-bg__nav_ul_container'}`}>
                            <Link className={`${param === '/' ? 'nav-bg__nav_ul_active' : 'nav-bg__nav_ul_link'}`} to='/'>Accueil</Link>
                            <Link className={`${param === '/carte' ? 'nav-bg__nav_ul_active' : 'nav-bg__nav_ul_link'}`} to='/carte'>La carte</Link>
                            <Link className={`${param === '/reservation' ? 'nav-bg__nav_ul_active' : 'nav-bg__nav_ul_link'}`} to='/reservation'>Reservation</Link>
                            <Link className={`${param === '/evenements' ? 'nav-bg__nav_ul_active' : 'nav-bg__nav_ul_link'}`} to='/evenements'>Event</Link>
                        </ul>
                    </div>
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