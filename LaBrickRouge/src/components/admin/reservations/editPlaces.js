import { useContext, useEffect, useMemo, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faFloppyDisk, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Loader from '../../loader';



export default function EditPlaces(props) {

    // State
    const [isEditable, setIsEditable] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [loader, setLoader] = useState(false);
    const [firstTime, setFirstTime] = useState();
    const [secondTime, setSecondTime] = useState();
    const [firstSelectedHours, setFirstSelectedHours] = useState([]);
    const [secondSelectedHours, setSecondSelectedHours] = useState([]);
    const [popup, setPopup] = useState(false);

    // Ref
    const dayRef = useRef(props.date);
    const firstPlacesRef = useRef();
    const secondPlacesRef = useRef();
    const morningHRef = useRef([]);
    const eveningHRef = useRef([]);
    const time = useRef([]);

    // memo
    const hoursList1 = useMemo(() => generateHoursList(12, 14, 15), []);
    const hoursList2 = useMemo(() => generateHoursList(19, 22, 15), []);


    console.log("jour", props.dayValue);

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
    function handleHourClick(hour) {
        if (hoursList1.includes(hour)) {
            setFirstSelectedHours([...firstSelectedHours, hour].sort());
        } else if (hoursList2.includes(hour)) {
            setSecondSelectedHours([...secondSelectedHours, hour].sort());
        }
        timeSelect(hour);
    }

    const timeSelect = (e) => {
        setPopup(true);
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

    const toggleEditable = () => {
        setIsEditable(!isEditable);
    };


    // submit
    function handleSubmit(e) {
        e.preventDefault();
        setLoader(true);
        setIsEditable(!isEditable);
        const test = new Date
        props.apiContext.updateHoraire(props.id, {
            page: "editCard",
            day: test,
            firstAvailablePlaces: firstPlacesRef.current?.value,
            secondAvailablePlaces: secondPlacesRef.current?.value,
            morningH: firstTime ? firstTime : props.morningH,
            eveningH: secondTime ? secondTime : props.eveningH,
        }).then(res => {
            setLoader(false);
            if (res) {
                alert("Horaire modifié");
            }
        });
    }

    // delete
    function deletCard() {
        // alert("test");
        setIsDeleted(true);
        props.apiContext.deletHoraire(props.id).then(res => {
            if (res) {
                alert("Horaire supprimé");
            }
        }
        )

    }


    if (!isDeleted) {

        return (
            <form id={props.id} onSubmit={handleSubmit} action="submit" className="resaCard__grid_all" key={props.key} >


                {
                    (isEditable) && (popup) ? (

                        <div className="testpopup">
                            {
                                hoursList1.map(hour => (
                                    <p className="createResa__form_hourSelectGroup_hourPicker_group_hourButton" key={hour} onClick={() => handleHourClick(hour)}>
                                        {hour}
                                    </p>
                                ))
                            }
                        </div>




                    ) : (
                        <p></p>
                    )
                }


                {loader && (
                    <Loader />
                )}
                <p className="resaCard__grid_all_day">{props.date}</p>
                <div className="resaCard__grid_all_card">


                    {
                        isEditable ? (
                            <>
                                <button type="submit">
                                    <FontAwesomeIcon icon={faFloppyDisk} />
                                </button>

                                <FontAwesomeIcon onClick={deletCard} icon={faTrashCan} />
                            </>
                        ) : (
                            <FontAwesomeIcon onClick={toggleEditable} icon={faPenToSquare} />
                        )
                    }

                    <div>
                        {/* <button onClick={handleDelete()}></button> */}
                    </div>
                    <div className="resaCard__grid_all_card_content">
                        <h3 className="resaCard__grid_all_card_content_title">Premier service</h3>
                        <div className="resaCard__grid_all_card_content_hourList">
                            {isEditable ? (
                                props.morningH.map((e) => {
                                    const heure = new Date(e);
                                    const heureFormat = heure.toLocaleString("fr-FR", { hour: "numeric", minute: "numeric" });
                                    const i = props.morningH.indexOf(e);
                                    return (
                                        <>

                                            <FontAwesomeIcon onClick={timeSelect} icon={faTrashCan} />


                                        </>

                                    )
                                })
                            ) : (

                                props.morningH.map((e) => {
                                    const heure = new Date(e);
                                    const heureFormat = heure.toLocaleString("fr-FR", { hour: "numeric", minute: "numeric" });
                                    return (
                                        <p className="resaCard__grid_all_card_content_hourList_hour">{heureFormat}</p>
                                    )
                                })

                            )
                            }
                        </div>

                        {
                            isEditable ? (
                                <input
                                    type="text"
                                    defaultValue={props.firstPlaces}
                                    ref={firstPlacesRef}
                                />
                            ) : (
                                <p className="resaCard__grid_all_card_content_places">
                                    <span className="span">{props.firstPlaces}</span> places disponibles
                                </p>
                            )
                        }


                    </div>
                    <div className="underline">
                        <div className="underline__line"></div>
                    </div>
                    <div className="resaCard__grid_all_card_content">
                        <h3 className="resaCard__grid_all_card_content_title">Deuxième service</h3>
                        <div className="resaCard__grid_all_card_content_hourList">
                            {isEditable ? (
                                props.eveningH.map((e) => {
                                    const heure = new Date(e);
                                    const heureFormat = heure.toLocaleString("fr-FR", { hour: "numeric", minute: "numeric" });
                                    return (
                                        <input
                                            type="text"
                                            defaultValue={heureFormat}
                                            ref={eveningHRef}
                                            onChange={(e) => timeSelect(e.target.value)}
                                        />

                                    )
                                })
                            ) : (
                                props.eveningH.map((e) => {
                                    const heure = new Date(e);
                                    const heureFormat = heure.toLocaleString("fr-FR", { hour: "numeric", minute: "numeric" });
                                    return (

                                        <p className="resaCard__grid_all_card_content_hourList_hour">{heureFormat}</p>
                                    )
                                })

                            )
                            }
                        </div>

                        {
                            isEditable ? (
                                <>
                                    <input type="text"
                                        defaultValue={props.secondPlaces}
                                        ref={secondPlacesRef}
                                    />
                                </>
                            ) : (

                                <p className="resaCard__grid_all_card_content_places"><span className="span">{props.secondPlaces}</span> places disponibles</p>

                            )

                        }

                    </div>
                </div>
            </form >
        )


    }
}