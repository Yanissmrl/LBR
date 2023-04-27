import { useContext, useEffect, useState, useRef } from "react";
import { APIContext } from "../../../api/APIcall";
import { useParams } from "react-router-dom";
import EditPlaces from "./editPlaces";

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
                                <>
                                    <EditPlaces
                                        date={date}
                                        firstPlaces={element.firstAvailablePlaces}
                                        secondPlaces={element.secondAvailablePlaces}
                                        key={index}
                                        morningH={element.morningH}
                                        eveningH={element.eveningH}
                                        apiContext={apiContext}
                                        id={element._id}
                                    />
                                </>

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

