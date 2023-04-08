import { useRef, useContext, useState } from "react";
import { APIContext } from "../../api/APIcall";
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';

export default function Horaires() {
    const apiContext = useContext(APIContext);
    const dateRef = useRef();
    const time = useRef([]);

    const [firstTime, setFirstTime] = useState();
    const [secondTime, setSecondTime] = useState();

    const firstPlacesRef = useRef(Number);
    const secondPlacesRef = useRef(Number);



    const timeSelect = (e) => {
        time.current.push(e)

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
        const dateObj = new Date(date);
        const firstPlaces = firstPlacesRef.current.value
        const secondPlaces = secondPlacesRef.current.value



        apiContext.postReservationAdmin({
            day: dateObj,
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


    return (
        <div>
            <p>Horaires page admin</p>

            <form onSubmit={horairesSubmit} >
                <input ref={dateRef} type="date" />
                <button>je sais pas</button>
                <div>
                    <label >Places premier service</label>
                    <input className="numberInput" ref={firstPlacesRef} placeholder="0" type="number" />
                </div>
                <div>
                    <label >Places deuxième service</label>
                    <input className="numberInput" ref={secondPlacesRef} placeholder="0" type="number" />
                </div>

            </form>
            <button onClick={(e) => {
                timeSelect(e.target.innerHTML)
            }} >12:30</button>
            <button onClick={(e) => {
                timeSelect(e.target.innerHTML)
            }}>13:00</button>
            <button onClick={(e) => {
                timeSelect(e.target.innerHTML)
            }}>13:30</button>




            <button onClick={(e) => {
                timeSelect(e.target.innerHTML)
            }} >19:30</button>
            <button onClick={(e) => {
                timeSelect(e.target.innerHTML)
            }}>20:00</button>
            <button onClick={(e) => {
                timeSelect(e.target.innerHTML)
            }}>20:30</button>

            <div>
            </div>
        </div>


    )




}