import { useRef, useContext, useState } from "react";
import { APIContext } from "../../api/APIcall";
import moment from 'moment';

export default function Horaires() {
    const apiContext = useContext(APIContext);
    const dateRef = useRef();
    const morningTime = useRef([]);
    const eveningTime = useRef([]);
    const placesRef = useRef(Number);
    // const [hour, setHour] = useState([]);
    const morningTimeSelect = (e) => {
        morningTime.current.push(e)
        console.log(morningTime);
    }
    const eveningTimeSelect = (e) => {
        eveningTime.current.push(e)
        console.log("valueeeee", eveningTime);
    }

    const horairesSubmit = (e) => {
        e.preventDefault();

        const date = dateRef.current.value
        const places = placesRef.current.value
        const dateObj = new Date(date);


        apiContext.postReservationAdmin({
            day: dateObj,
            morningH: morningTime.current,
            eveningH: eveningTime.current,
            place: places
        }).then(res => {
            if (res) {
                alert("Reservation envoyée");
            }
        });

    }

    return (
        <div>
            <p>Horaires page admin</p>

            <form onSubmit={horairesSubmit} action="">
                <input ref={dateRef} type="date" />
                <button>je sais pas</button>
                <input ref={placesRef} placeholder="nombre de places" type="number" />
            </form>
            <button onClick={(e) => {
                morningTimeSelect(e.target.innerHTML)
            }} >12:30</button>
            <button onClick={(e) => {
                morningTimeSelect(e.target.innerHTML)
            }}>13:00</button>
            <button onClick={(e) => {
                morningTimeSelect(e.target.innerHTML)
            }}>13:30</button>




            <button onClick={(e) => {
                eveningTimeSelect(e.target.innerHTML)
            }} >19:30</button>
            <button onClick={(e) => {
                eveningTimeSelect(e.target.innerHTML)
            }}>20:00</button>
            <button onClick={(e) => {
                eveningTimeSelect(e.target.innerHTML)
            }}>20:30</button>

        </div>


    )




}