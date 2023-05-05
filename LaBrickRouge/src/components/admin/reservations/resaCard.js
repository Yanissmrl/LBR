import { useContext, useEffect, useState, useRef } from "react";
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
    // const [firstPlaceValue, setFirstPlaceValue] = useState(null);
    // const [secondPlaceValue, setSecondPlaceValue] = useState(null);
    // const [morningHValue, setMorningHValue] = useState(null);
    // const [eveningHValue, setEveningHValue] = useState(null);

    useEffect(() => {
        apiContext.getHoraires().then(data => setData(data));
        const jour = new Date(horairesContext?.horaires?.day);
        const date = jour.toLocaleString("fr-FR", { weekday: "long", day: "numeric", month: "numeric" });
        setDayValue(date);
        // setFirstPlaceValue(horairesContext?.horaires?.firstAvailablePlaces);
        // setSecondPlaceValue(horairesContext?.horaires?.secondAvailablePlaces);
        // setMorningHValue(horairesContext?.horaires?.morningH);
        // setEveningHValue(horairesContext?.horaires?.eveningH);

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
                                    dayValue={dayValue}
                                    firstPlaces={element.firstAvailablePlaces}
                                    secondPlaces={element.secondAvailablePlaces}
                                    key={index}
                                    morningH={element.morningH}
                                    eveningH={element.eveningH}
                                    apiContext={apiContext}
                                    id={element._id}
                                // firstPlaceValue={firstPlaceValue}
                                // secondPlaceValue={secondPlaceValue}
                                // morningHValue={morningHValue}
                                // eveningHValue={eveningHValue}
                                />
                            </>

                        )
                    })

                }
            </div>
        </div>


    )

}

