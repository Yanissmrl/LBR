import logo from '../assets/logo.svg';
import { Link } from "react-router-dom";
export default function Nav() {


    return (
        <nav className='nav-bg'>
            <div className='container'>
                <div className='nav-bg__nav'>
                    <Link to='/'><img className='nav-bg__nav_logo' src={logo} alt="Logo la Brick Rouge" /></Link>
                    <ul className='nav-bg__nav_ul'>
                        <Link className='nav-bg__nav_ul_link' to='/'>Accueil</Link>
                        <Link className='nav-bg__nav_ul_link' to='/carte'>La carte</Link>
                        <Link className='nav-bg__nav_ul_link' to='/'>Resta</Link>
                        <Link className='nav-bg__nav_ul_link' to='/'>Event</Link>
                    </ul>
                </div>
            </div>
        </nav>
    )
}