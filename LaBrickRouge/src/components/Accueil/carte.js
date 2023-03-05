import { Link } from "react-router-dom";
import menu from '../../assets/img.png';

export default function Carte() {

    return (
        <section className="carte">
            <div className="container">
                <div className="carte__all">
                    <div className="carte__all_left">
                        <h2 className="carte__all_left_title">La carte</h2>
                        <p className="carte__all_left_txt">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas sapiente eius architecto. Quos explicabo ea sapiente porro sequi optio dicta molestias, sed neque necessitatibus perferen Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, saepe quod laborum magni veniam odit adipisci suscipit omnis ratione vel illum ipsa non dolorum consectetur fugit sequi deleniti quis vero! dis deleniti eaque officiis recusandae atque.</p>

                        <p className="carte__all_left_txt">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi reprehenderit  officia qui magni fuga expedita illum ipsum, sint ratione doloribus.</p>
                        <p className="carte__all_left_txt">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi  cupiditate ad ipsum natus esse ex quas, nisi fugiat itaque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui dicta non placeat assumenda? Natus illo obcaecati dolorem enim explicabo quo officia qui magni fuga expedita illum ipsum, sint ratione doloribus.</p>

                        <div className="carte__all_left_divlink">
                            <Link to='/carte' className="carte__all_left_divlink_link">La carte</Link>
                        </div>
                    </div>
                    <img className="carte__all_image" src={menu} alt="capture d'ecran du menu" />
                </div>

            </div>
        </section>

    )


}