import insta from '../../assets/instagram.svg';
import facebook from '../../assets/facebook.svg';
import tripad from '../../assets/tripadvisor.svg';
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { APIContext } from "../../api/APIcall";
import { Link } from "react-router-dom";

export default function HeaderAccueil() {
    const apiContext = useContext(APIContext);
    let { plats } = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {

        apiContext.getPlats().then(data => setData(data));

    }, [plats, apiContext])

    const root = "../../assets/";
    const image = data[0]?.image;
    console.log(image);

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

                    {/* <div style={{ backgroundImage: `url("${root}${image}")` }} className="header__allcontent_right"></div> */}
                    <div style={{ backgroundImage: ` url(${root}${image})` }} className="header__allcontent_right"></div>

                    {/* <div className="header__allcontent_right"><img src={`${root}${image}`} alt={`${root}${image}`} /></div> */}
                    {/* <div style={{ backgroundImage: `url("${image2}")` }} className="header__allcontent_right"></div> */}
                </div>
            </div>
        </header>
    )
}