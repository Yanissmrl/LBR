import { useRef, useContext, useState } from "react";
import { APIContext } from "../../api/APIcall";

export default function Horaires() {
    const apiContext = useContext(APIContext);
    const dateRef = useRef();
    const morningTime = useRef([]);
    const eveningTime = useRef([]);
    // const [hour, setHour] = useState([]);
    const morningTimeSelect = (e) => {
        morningTime.current.push(e)
        console.log("value", morningTime);
    }
    const eveningTimeSelect = (e) => {
        eveningTime.current.push(e)
        console.log("valueeeee", eveningTime);
    }

    const horairesSubmit = (e) => {
        e.preventDefault();

        const date = dateRef.current.value
        console.log("value", date);

        apiContext.postReservationAdmin({
            day: date,
            morningH: morningTime.current,
            eveningH: eveningTime.current,
        }).then(res => {
            if (res) {
                alert("Reservation envoyée");
            }
        });

        const dateTime = new Date()


    }

    return (
        <div>
            <p>Horaires page admin</p>

            <form onSubmit={horairesSubmit} action="">
                <input ref={dateRef} type="date" />
                <button>je sais pas</button>


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