import { useContext, useEffect, useState } from "react";
import { APIContext } from "../../../context/APIcall";
import { useParams } from "react-router-dom";
import EditPlaces from "./editPlaces";
import { HorairesContext } from "../../../context/horairesContext";

export default function ResaCard() {

    const horairesContext = useContext(HorairesContext);
    const apiContext = useContext(APIContext);

    //params
    let { reservation } = useParams();

    // state
    const [data, setData] = useState([]);
    const [dayValue, setDayValue] = useState(null);
    const [hourValue, setHourValue] = useState(null);

    useEffect(() => {
        apiContext.getHoraires().then(data => setData(data));
        const jour = new Date(horairesContext?.horaires?.day);
        const date = jour.toLocaleString("fr-FR", { weekday: "long", day: "numeric", month: "numeric" });
        setDayValue(date);
        setHourValue(horairesContext?.horaires?.morningH);

    }, [reservation, apiContext, horairesContext])

    return (


        <div className="resaCard" >

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
                                    day={element.day}
                                    dayValue={dayValue}
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

}

