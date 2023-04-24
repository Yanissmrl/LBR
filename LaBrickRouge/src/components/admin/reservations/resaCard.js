import { useContext, useEffect, useState, useRef } from "react";
import { APIContext } from "../../../api/APIcall";
import { useParams } from "react-router-dom";

export default function ResaCard() {


    const apiContext = useContext(APIContext);
    let { reservation } = useParams();
    const [data, setData] = useState([]);

    // const handleDelete = (id) => {
    //     apiContext.deleteReservation(id).then(res => {
    //         if (res) {
    //             alert("Reservation supprimée");
    //         }
    //     });
    // }

    useEffect(() => {

        apiContext.getHoraires().then(data => setData(data));

    }, [reservation, apiContext])

    if (data[0]) {


        return (

            <div className="resaCard">

                <h2 className="resaCard__title">Apercu des reservations</h2>
                <div className="resaCard__grid">
                    {
                        data.map((element, index) => {
                            const jour = new Date(element.day);
                            const date = jour.toLocaleString("fr-FR", { weekday: "long", day: "numeric", month: "numeric" });

                            return (
                                <div className="resaCard__grid_all" key={index} >
                                    {/* <button onClick={handleDelete()}></button> */}
                                    <p className="resaCard__grid_all_day">{date}</p>
                                    <div className="resaCard__grid_all_card">
                                        <div>
                                            {/* ca c'est la div de modifications */}
                                        </div>
                                        <div>
                                            {/* ca c'est la div de suppr */}
                                        </div>
                                        <div className="resaCard__grid_all_card_content">
                                            <h3 className="resaCard__grid_all_card_content_title">Premier service</h3>
                                            <div className="resaCard__grid_all_card_content_hourList">
                                                {
                                                    element.morningH.map((e) => {
                                                        const heure = new Date(e);
                                                        const heureFormat = heure.toLocaleString("fr-FR", { hour: "numeric", minute: "numeric" });
                                                        return (
                                                            <p className="resaCard__grid_all_card_content_hourList_hour">{heureFormat}</p>
                                                        )
                                                    })
                                                }
                                            </div>
                                            <p className="resaCard__grid_all_card_content_places"><span className="span"> {element.firstAvailablePlaces} </span>places disponibles</p>
                                        </div>
                                        <div className="underline">
                                            <div className="underline__line"></div>
                                        </div>
                                        <div className="resaCard__grid_all_card_content">
                                            <h3 className="resaCard__grid_all_card_content_title">Deuxième service</h3>
                                            <div className="resaCard__grid_all_card_content_hourList">
                                                {
                                                    element.eveningH.map((e) => {
                                                        const heure = new Date(e);
                                                        const heureFormat = heure.toLocaleString("fr-FR", { hour: "numeric", minute: "numeric" });
                                                        return (

                                                            <p className="resaCard__grid_all_card_content_hourList_hour">{heureFormat}</p>
                                                        )
                                                    })
                                                }
                                            </div>
                                            <p className="resaCard__grid_all_card_content_places"><span className="span"> {element.secondAvailablePlaces} </span> places disponibles</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    } else {
        return (
            <div className="">
                <p>Pas de reservations prevu pour les prochains jours</p>
            </div>
        )
    }
}

