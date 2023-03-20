import { APIContext } from "../../api/APIcall";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function HeaderAdmin() {

    const apiContext = useContext(APIContext);
    let { resaClient } = useParams();
    const [data, setData] = useState([]);


    useEffect(() => {

        apiContext.getResaClient().then(data => setData(data));

    }, [resaClient, apiContext])
    const dayDate = new Date()
    console.log(dayDate);
    const jour = new Date(dayDate);
    const date = jour.toLocaleString("fr-FR", { weekday: "long", day: "numeric", month: "numeric" });

    return (
        <div className="HeaderAdmin">

            <h1 className="HeaderAdmin__title">Reservations pour aujourd'hui {date}</h1>
            <div className="HeaderAdmin__flex">
                {
                    data.map((element) => {

                        return (
                            <div className="HeaderAdmin__flex_content">
                                <p className="HeaderAdmin__flex_content_name infos">Nom :&nbsp; <span className="span">{element.name}</span></p>
                                <p className="HeaderAdmin__flex_content_mail infos">Email :&nbsp; <span className="span">{element.email}</span></p>
                                <p className="HeaderAdmin__flex_content_persons infos">Personnes :&nbsp; <span className="span">{element.persons}</span></p>
                                <p className="HeaderAdmin__flex_content_hour infos">Heure :&nbsp; <span className="span">{element.hour}</span></p>
                            </div>
                        )
                    })
                }
            </div>

        </div>

    );


}