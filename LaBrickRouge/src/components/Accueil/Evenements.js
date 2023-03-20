import { Link } from "react-router-dom";
import imagebg from '../../assets/imagebg.jpg';
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { APIContext } from "../../api/APIcall";

export default function Evenements() {
    const apiContext = useContext(APIContext);
    let { event } = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {

        apiContext.getEvent().then(data => setData(data));

    }, [event, apiContext])

    const truc = data.slice(0, 3)

    if (data[0]) {

        return (
            <section className="events">
                <div className="container">
                    <h2 className="events__title">Evenements</h2>
                    <div className="grid">
                        {
                            truc.map((element) => {
                                const jour = new Date(element.date);
                                const date = jour.toLocaleString("fr-FR", { weekday: "long", day: "numeric", month: "long" });

                                return (


                                    <div className="events__card">
                                        <div className="events__card_content">
                                            <p className="events__card_content_date">| {date}</p>

                                            <div className="events__card_content_ctnt">
                                                <h3 className="events__card_content_ctnt_title">{element.name}</h3>
                                                <img alt="image" src={imagebg} className="events__card_content_ctnt_image"></img>
                                                <p className="events__card_content_ctnt_txt">{element.info}</p>
                                                <div className="events__card_content_ctnt_linkdiv">
                                                    <Link to='/evenements' className="events__card_content_ctnt_linkdiv_link">voir plus {'>'}</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                )


                            })
                        }

                    </div>
                </div>
            </section>
        )
    } else {
        return (
            <>
            </>

        )
    }
}