import { useRef, useContext, useState, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import { APIContext } from "../../api/APIcall";
import ResaCard from "./reservations/resaCard";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


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
    const time = useRef([]);

    const [firstTime, setFirstTime] = useState();
    const [secondTime, setSecondTime] = useState();

    const firstPlacesRef = useRef(Number);
    const secondPlacesRef = useRef(Number);

    const [value1, setValue1] = useState("");
    const [value2, setValue2] = useState("");

    const [firstSelectedHours, setFirstSelectedHours] = useState([]);
    const [secondSelectedHours, setSecondSelectedHours] = useState([]);
    const hoursList1 = useMemo(() => generateHoursList(12, 14, 15), []);
    const hoursList2 = useMemo(() => generateHoursList(19, 22, 15), []);

    const [heure, setHeure] = useState('09');
    const [minute, setMinute] = useState('00');

    const doDayDate = new Date(); // Date d'aujourd'hui

    let { reservation } = useParams();
    const [data, setData] = useState([]);


    useEffect(() => {

        apiContext.getHoraires().then(data => setData(data));

    }, [reservation, apiContext])

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

    // const test = data
    // console.log("test", test);
    const firstPlaces = firstPlacesRef.current.value
    const secondPlaces = secondPlacesRef.current.value
    const horairesSubmit = (e) => {
        e.preventDefault();


        apiContext.postReservationAdmin({
            day: selectedDate,
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
    function handleChange1(event) {
        if (event.target.value.length <= 2) {
            setValue1(event.target.value);
        }
    }

    function handleChange2(event) {
        if (event.target.value.length <= 2) {
            setValue2(event.target.value);
        }
    }

    // Génére la liste d'heures triée dans l'ordre croissant pour les 2 services
    function handleHourClick(hour) {
        if (hoursList1.includes(hour)) {
            setFirstSelectedHours([...firstSelectedHours, hour].sort());
        } else if (hoursList2.includes(hour)) {
            setSecondSelectedHours([...secondSelectedHours, hour].sort());
        }
        timeSelect(hour);
    }


    // Pouvoir choisir l'heure et la minute dans un select pour l'ajouter à la liste d'heures
    const heures = [];
    for (let heure = 9; heure <= 23; heure++) {
        heures.push(heure.toString().padStart(2, '0'));
    }

    const minutes = [];
    for (let minute = 0; minute <= 45; minute += 15) {
        minutes.push(minute.toString().padStart(2, '0'));
    }

    const heureMinute = `${heure}:${minute}`;

    const handleValider = () => {
        console.log("heureMinute ", heureMinute);
        // si l'heure est comprise entre 9h et 16:45h ajouter l'heure à la liste des heures du premier service
        if (heure >= 9 && heure <= "16:45") {
            setFirstSelectedHours([...firstSelectedHours, heureMinute].sort());
            console.log("firstSelectedHours", firstSelectedHours);
            // si l'heure est comprise entre 17h et 00h ajouter l'heure à la liste des heures du second service
        } else {
            setSecondSelectedHours([...secondSelectedHours, heureMinute].sort());
            console.log("secondSelectedHours", secondSelectedHours);
        }

    };


    const [selectedDate, setSelectedDate] = useState("");
    console.log("selectedDate", selectedDate);

    const today = new Date().toISOString().split("T")[0]; // obtenir la date actuelle au format "yyyy-mm-dd"



    const [showCalendar, setShowCalendar] = useState(false);

    const showCalendarFunction = () => {
        setShowCalendar(!showCalendar);
    }

    const handleDateChange = (date) => {
        // Vérifier si la date sélectionnée est avant aujourd'hui
        if (date < doDayDate) {
            // Ne rien faire si la date est avant aujourd'hui
            return;
        }
        // Mettre à jour la date sélectionnée
        setSelectedDate(date);
        // Fermer le calendrier
        setShowCalendar(false);
        // Afficher la date sélectionnée dans la console
        console.log("date", date);


    }


    return (
        <div>
            <p>Horaires page admin</p>

            <div className="createResa">
                <div>
                    <form onSubmit={horairesSubmit} >

                        <div>
                            <p onClick={showCalendarFunction}>Ouvrir le calendrier</p>
                            {showCalendar && (
                                <div onClick={(event) => { event.stopPropagation() }}>
                                    <Calendar value={selectedDate} minDate={doDayDate} onChange={handleDateChange} />
                                </div>
                            )}
                        </div>

                        <button>Créer la reservation</button>
                        <div>
                            <input className="numberInput" onChange={handleChange1} value={value1} ref={firstPlacesRef} placeholder="0" type="number" />
                            <label >Places pour premier service</label>
                        </div>
                        <div>
                            <input className="numberInput" onChange={handleChange2} value={value2} ref={secondPlacesRef} placeholder="0" type="number" />
                            <label >Places pour deuxième service</label>
                        </div>

                    </form>



                    <div>


                        <div className="">

                            {hoursList1.map(hour => (
                                <button key={hour} onClick={() => handleHourClick(hour)}>
                                    {hour}
                                </button>
                            ))}

                        </div>

                        <div className="">

                            {hoursList2.map(hour => (
                                <button key={hour} onClick={() => handleHourClick(hour)}>
                                    {hour},
                                </button>
                            ))}


                        </div>

                        <div>
                            <select value={heure} onChange={(e) => setHeure(e.target.value)}>
                                {heures.map((h) => (
                                    <option key={h} value={h}>
                                        {h}
                                    </option>
                                ))}
                            </select>
                            <select value={minute} onChange={(e) => setMinute(e.target.value)}>
                                {minutes.map((m) => (
                                    <option key={m} value={m}>
                                        {m}
                                    </option>
                                ))}
                            </select>
                            <button onClick={handleValider}>Valider</button>
                            <div>{heureMinute}</div>
                        </div>

                    </div>

                </div>

                <div className="createResa__card">
                    <div className="createResa__card_content">

                        <p className="createResa__card_content_title">Premier service</p>

                        <p className="createResa__card_content_hourList">
                            {firstSelectedHours.map(hour =>

                            (
                                <p className="createResa__card_content_hourList_hour" key={hour}>
                                    {hour},
                                </p>
                            ))}
                        </p>
                        <p className="createResa__card_content_places"><span className="span">{firstPlaces}</span> places</p>

                    </div>
                    <div className="underline">
                        <div className="underline__line"></div>
                    </div>
                    <div className="createResa__card_content">

                        <p className="createResa__card_content_title">Deuxième service</p>
                        <p className="createResa__card_content_hourList">
                            {secondSelectedHours.map(hour =>

                            (
                                <p className="createResa__card_content_hourList_hour" key={hour}>
                                    {hour},
                                </p>
                            ))}
                        </p>
                        <p className="createResa__card_content_places"><span className="span">{secondPlaces}</span> places</p>


                    </div>
                </div>
            </div>
            <div>
                <ResaCard />
            </div>
        </div >


    )




}