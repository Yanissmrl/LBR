import insta from '../../assets/instagram.svg';
import facebook from '../../assets/facebook.svg';
import tripad from '../../assets/tripadvisor.svg';
import { Link } from "react-router-dom";

export default function HeaderAccueil() {

    return (
        <header className='header'>
            <div className='container'>
                <div className="header__allcontent">
                    <div className="header__left">
                        <div className='header__allcontent_left_content'>
                            <h1 className='header__allcontent_left_content_title'>Bienvenue</h1>
                            <p className="header__allcontent_left_content_txt">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse rutrum blandit neque eu imperdiet. Nam in viverra dolor.</p>
                        </div>
                        <div className='header__allcontent_left_reseaux'>
                            <Link to='https://www.instagram.com/la_brick_rouge/'><img className='header__allcontent_left_reseaux_logo' src={insta} alt="logo instagram" /></Link>
                            <Link to='https://www.facebook.com/labrickrougedinan'><img className='header__allcontent_left_reseaux_logo' src={facebook} alt="logo facebook" /></Link>
                            <Link to='https://www.tripadvisor.fr/Restaurant_Review-g187098-d15237859-Reviews-La_Brick_Rouge-Dinan_Cotes_d_Armor_Brittany.html'><img className='header__allcontent_left_reseaux_logo' src={tripad} alt="logo tripadvisor" /></Link>
                        </div>
                    </div>
                    <div className="header__allcontent_right">Slider image plat en bg image</div>
                </div>
            </div>
        </header>
    )
}