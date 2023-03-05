import logo from '../assets/logo.svg';
import { Link } from "react-router-dom";
import insta from '../assets/instagram.svg';
import facebook from '../assets/facebook.svg';
import tripad from '../assets/tripadvisor.svg';
export default function Footer() {


    return (
        <nav className='footer-bg'>
            <div className='container'>
                <div className='footer-bg__content'>
                    <Link to='/'><img className='footer-bg__content_logo' src={logo} alt="Logo la Brick Rouge" /></Link>
                    <ul className='footer-bg__content_nav'>
                        <div className='footer-bg__content_nav_section'>
                            <Link className='footer-bg__content_nav_section_link' to='/'>À propos de ce site</Link>
                            <Link className='footer-bg__content_nav_section_link' to='/carte'>Plan du site</Link>
                        </div>
                        <div className='footer-bg__content_nav_section'>
                            <Link className='footer-bg__content_nav_section_link' to='/'>Politique de confidentialité</Link>
                            <Link className='footer-bg__content_nav_section_link' to='/'>Mentions légales</Link>
                        </div>
                    </ul>
                    <p className='footer-bg__content_number'>+33 2 56 38 67 84</p>
                    <div className='footer-bg__content_reseaux'>
                    <Link to='https://www.instagram.com/la_brick_rouge/'><img className='footer-bg__content_reseaux_logo' src={insta} alt="logo instagram" /></Link>
                    <Link to='https://www.facebook.com/labrickrougedinan'><img className='footer-bg__content_reseaux_logo' src={facebook} alt="logo facebook" /></Link>
                    <Link to='https://www.tripadvisor.fr/Restaurant_Review-g187098-d15237859-Reviews-La_Brick_Rouge-Dinan_Cotes_d_Armor_Brittany.html'><img className='footer-bg__content_reseaux_logo' src={tripad} alt="logo tripadvisor" /></Link>
                    </div>
                </div>
                <p className='footer-bg__copiright'>© 2022 La Brick Rouge</p>
            </div>
        </nav>
    )
}