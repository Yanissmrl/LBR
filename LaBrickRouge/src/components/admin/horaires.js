import { useRef, useContext, useState, useMemo, useEffect } from "react";
import { APIContext } from "../../api/APIcall";
import ResaCard from "./reservations/resaCard";

// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';

function generateHoursList(startHour, endHour, interval) {
    const hoursList = [];
    for (let hour = startHour; hour <= endHour; hour++) {
        for (let minute = 0; minute < 60; minute += interval) {
            hoursList.push(`${hour}:${minute < 10 ? `0${minute}` : minute}`);
        }
    }
    hoursList.sort();
    return hoursList;
}

export default function Horaires() {
    const apiContext = useContext(APIContext);
    const dateRef = useRef();
    const time = useRef([]);

    const [firstTime, setFirstTime] = useState();
    const [secondTime, setSecondTime] = useState();

    const firstPlacesRef = useRef(Number);
    const secondPlacesRef = useRef(Number);

    const [value, setValue] = useState("");

    const [firstSelectedHours, setFirstSelectedHours] = useState([]);
    const [secondSelectedHours, setSecondSelectedHours] = useState([]);
    const hoursList1 = useMemo(() => generateHoursList(12, 14, 15), []);
    const hoursList2 = useMemo(() => generateHoursList(19, 22, 15), []);


    const timeSelect = (e) => {
        time.current.push(e)
        // console.log("time", time.current);
        const firstHour = time.current.filter(item => item >= "12:00" && item <= "13:15");
        const secondHour = time.current.filter(item => item >= "19:00" && item <= "20:30");

        // transforme les heures du premier service en objet date
        const firstObjetHeure = firstHour.map(hour => {
            const [heures, minutes] = hour.split(":");
            const firstObjetHeure = new Date();
            firstObjetHeure.setHours(heures);
            firstObjetHeure.setMinutes(minutes);
            return firstObjetHeure;
        });

        setFirstTime(firstObjetHeure);

        // transforme les heures du second service en objet date
        const secondObjetHeure = secondHour.map(hour => {
            const [heures, minutes] = hour.split(":");
            const secondObjetHeure = new Date();
            secondObjetHeure.setHours(heures);
            secondObjetHeure.setMinutes(minutes);
            return secondObjetHeure;
        });
        setSecondTime(secondObjetHeure);



    }


    const horairesSubmit = (e) => {
        e.preventDefault();

        const date = dateRef.current.value
        // const dateObj = new Date(date);
        // const firstTime = new Date(firstTime);

        const firstPlaces = firstPlacesRef.current.value
        const secondPlaces = secondPlacesRef.current.value

        // console.log('morningH', firstTime);
        // console.log('eveningH', secondTime);

        apiContext.postReservationAdmin({
            day: date,
            morningH: firstTime,
            eveningH: secondTime,
            firstAvailablePlaces: firstPlaces,
            secondAvailablePlaces: secondPlaces
        }).then(res => {
            if (res) {
                alert("Reservation envoyée");
            }
        });

    }


    // fonction qui limite le nombre de caractères dans le champ nombre de places à 2
    function handleChange(event) {
        if (event.target.value.length <= 2) {
            setValue(event.target.value);
        }
    }

    // Génére la liste d'heures triée dans l'ordre croissant pour le premier service
    function handleHourClick(hour) {
        if (hoursList1.includes(hour)) {
            setFirstSelectedHours([...firstSelectedHours, hour].sort());
        } else if (hoursList2.includes(hour)) {
            setSecondSelectedHours([...secondSelectedHours, hour].sort());
        }
        timeSelect(hour);
    }

    return (
        <div>
            <p>Horaires page admin</p>

            <form onSubmit={horairesSubmit} >
                <input ref={dateRef} type="date" />
                <button>je sais pas</button>
                <div>
                    <label >Places premier service</label>
                    <input className="numberInput" onChange={handleChange} value={value} ref={firstPlacesRef} placeholder="0" type="number" />
                </div>
                <div>
                    <label >Places deuxième service</label>
                    <input className="numberInput" onChange={handleChange} value={value} ref={secondPlacesRef} placeholder="0" type="number" />
                </div>

            </form>



            <div>
                <div className="">

                    {hoursList1.map(hour => (
                        <button key={hour} onClick={() => handleHourClick(hour)}>
                            {hour}
                        </button>
                    ))}

                    <p>Heure sélectionnée premier service : {firstSelectedHours.map(hour => (
                        <span key={hour}>
                            {hour},
                        </span>
                    ))}</p>
                </div>

                <div className="">

                    {hoursList2.map(hour => (
                        <button key={hour} onClick={() => handleHourClick(hour)}>
                            {hour}
                        </button>
                    ))}

                    <p>Heure sélectionnée deuxième service : {secondSelectedHours.map(hour => (
                        <span key={hour}>
                            {hour}
                        </span>
                    ))}</p>
                </div>
            </div>
            <div>
            </div>
            <div>
                <ResaCard />
            </div>
        </div>


    )




}