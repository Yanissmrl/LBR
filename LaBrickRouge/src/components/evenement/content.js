import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { APIContext } from "../../api/APIcall";
import { Link } from "react-router-dom";

export default function EventContent() {
    const apiContext = useContext(APIContext);
    let { event } = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {

        apiContext.getEvent().then(data => setData(data));

    }, [event, apiContext])
    return (
        <section className='event-page'>
            <h1 className="event-page__title">Evenements</h1>
            {data.map((element) => {
                const jour = new Date(element.date);
                const date = jour.toLocaleString("fr-FR", { weekday: "long", day: "numeric", month: "long" });

                return (
                    <div className="event-page__all">
                        <div className="event-page__all_image">bg image</div>
                        <div className="event-page__all_content">
                            <p className="event-page__all_content_date">| <span className="event-page__all_content_date_span">{date}</span></p>
                            <h2 className="event-page__all_content_title">{element.name}</h2>
                            <p className="event-page__all_content_desc">{element.info}</p>
                            <Link to="/reservation "className="event-page__all_content_button">Reserver</Link>
                        </div>
                    </div>
                )



            })}
        </section>
    )
}