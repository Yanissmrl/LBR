import { Link } from "react-router-dom";
import imagebg from '../../assets/imagebg.jpg';

export default function Evenements() {


    return (
        <section className="events">
            <div className="container">
                <h2 className="events__title">Evenements</h2>
                <div className="grid">
                    <div className="events__card">
                        <div className="events__card_content">
                            <p className="events__card_content_date">date</p>

                            <div className="events__card_content_ctnt">
                                <h3 className="events__card_content_ctnt_title">Bô Bun</h3>
                                <img alt="jebvzur" src={imagebg} className="events__card_content_ctnt_image"></img>
                                <p className="events__card_content_ctnt_txt">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum ipsa perspiciatis cumque omnis beatae explicabo, suscipit iste modi corrupti consequuntur necessitatibus voluptate molestiae magnam labore reiciendis sunt sint impedit nihil!</p>
                                <div className="events__card_content_ctnt_linkdiv">
                                    <Link to='/envenelents' className="events__card_content_ctnt_linkdiv_link">voir plus {'>'}</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="events__card">
                        <div className="events__card_content">
                            <p className="events__card_content_date">25 Janvier 2023</p>

                            <div className="events__card_content_ctnt">
                                <h3 className="events__card_content_ctnt_title">Bô Bun</h3>
                                <img alt="jebvzur" src={imagebg} className="events__card_content_ctnt_image"></img>
                                <p className="events__card_content_ctnt_txt">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum ipsa perspiciatis cumque omnis beatae explicabo, suscipit iste modi corrupti consequuntur sunt sint impedit nihil!</p>
                                <div className="events__card_content_ctnt_linkdiv">
                                    <Link to='/envenelents' className="events__card_content_ctnt_linkdiv_link">voir plus {'>'}</Link>
                                </div></div>
                        </div>
                    </div>

                    <div className="events__card">
                        <div className="events__card_content">
                            <p className="events__card_content_date">date</p>
                            <div className="events__card_content_ctnt">
                                <h3 className="events__card_content_ctnt_title">Bô Bun</h3>
                                <img alt="jebvzur" src={imagebg} className="events__card_content_ctnt_image"></img>
                                <p className="events__card_content_ctnt_txt">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum ipsa perspiciatis cumque omnis beatae explicabo, suscipit iste modi corrupti consequuntur necessitatibus voluptate molestiae magnam labore reiciendis sunt sint impedit nihil!</p>
                                <div className="events__card_content_ctnt_linkdiv">
                                    <Link to='/envenelents' className="events__card_content_ctnt_linkdiv_link">voir plus {'>'}</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )

}