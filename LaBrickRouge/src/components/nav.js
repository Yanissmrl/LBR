import logo from '../assets/logo.svg';
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AppContext } from '../routes/appContext';
export default function Nav() {

    const appContext = useContext(AppContext);

    const element = (function test() {
        if (appContext.user.loggedIn === true) {
            return <Link to='/admin'>Admin</Link>
        }
    })();
    return (
        <nav className='nav-bg'>
            <div className='container'>
                <div className='nav-bg__nav'>
                    <Link to='/'><img className='nav-bg__nav_logo' src={logo} alt="Logo la Brick Rouge" /></Link>
                    <ul className='nav-bg__nav_ul'>
                        <Link className='nav-bg__nav_ul_link' to='/'>Accueil</Link>
                        <Link className='nav-bg__nav_ul_link' to='/carte'>La carte</Link>
                        <Link className='nav-bg__nav_ul_link' to='/reservation'>Resta</Link>
                        <Link className='nav-bg__nav_ul_link' to='/'>Event</Link>
                    </ul>
                    {element}
                </div>
            </div>
        </nav>
    )
}