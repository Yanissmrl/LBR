import { useContext, useEffect, useState, useRef } from "react";
import parseHour from "../../parseData";
import { useParams } from "react-router-dom";
import { APIContext } from "../../api/APIcall";
import croix from '../../assets/croix.svg';
import plus from '../../assets/Plus.svg';
import moins from '../../assets/Moins.svg';

export default function ResaChoice() {

    const apiContext = useContext(APIContext);
    let { reservation } = useParams();
    const [data, setData] = useState([]);
    const [showPopup, setShowPopup] = useState(false);

    const closePopup = () => {
        setShowPopup(false);
        document.getElementById('dive').classList.remove("bg-opacity")
    };

    // appel de l'api pour récupérer les horaires de resa 
    useEffect(() => {

        apiContext.getHoraires().then(data => setData(data));

    }, [reservation, apiContext])



    // name et email du client
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');
    // jour et H de la résa
    const [day, setDay] = useState('');
    const [hour, setHour] = useState('');
    // id du jour cliqué
    const [id, setId] = useState('');


    const dayFormat = new Date(day).toLocaleString("fr-FR", { weekday: "long", day: "numeric", month: "numeric" });

    const handleClick = (day, id, hour) => {
        setDay(day)
        setHour(hour)
        setShowPopup(true);
        setNom('')
        setEmail('')
        setId(id)
        document.getElementById('dive').classList.add("bg-opacity")

        for (let i = 0; i < data.length; i++) {
            if (day === data[i].day) {
                const dayFilter = data[i].morningH;
                console.log("dayFilter", dayFilter);
                const Dfilter = dayFilter.filter(item => item === hour);
                console.log("Dfiltrer", Dfilter);
                setDayFilter(Dfilter)
            } else {
                console.log("err dans le for de dayFilter");
            }
        }


    };
    const [dayFilter, setDayFilter] = useState([]);
    const [places, setPlaces] = useState(0);
    const nameRef = useRef();
    const emailRef = useRef();
    const firstPlacesRef = useRef(0);
    const secondPlacesRef = useRef(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowPopup(false);
        document.getElementById('dive').classList.remove("bg-opacity")
        const dataName = nameRef.current.value
        const dataEmail = emailRef.current.value

        const hourList = ["10:00", "14:00"]

        const objetHeure = hourList.map(hour => {
            const [heures, minutes] = hour.split(":");
            const objetHeure = new Date();
            objetHeure.setHours(heures);
            objetHeure.setMinutes(minutes);
            return objetHeure;
        });


        const hourParsed = parseHour(hour);
        const hourParsed2 = parseHour(objetHeure[0]);
        const hourParsed3 = parseHour(objetHeure[1]);

        if (hourParsed >= hourParsed2 && hourParsed <= hourParsed3) {
            firstPlacesRef.current = places
        } else {
            secondPlacesRef.current = places
        }

        // methode put pour envoyer les places restantes à la date cliqué selon l'id
        apiContext.updateHoraire(id, {
            firstAvailablePlaces: firstPlacesRef.current,
            secondAvailablePlaces: secondPlacesRef.current

        }).then(res => {

            if (res) {
                alert("Horaire modifié");
            }
        });

        // methode post pour envoyer une resa en base 
        apiContext.postReservation({
            day: day,
            name: dataName,
            email: dataEmail,
            persons: places,
            hour: hour
        }).then(res => {
            if (res) {
                alert("Reservation envoyée");
            }
        });

    };

    if (!reservation) {
        return (
            <>

                <div onClick={() => { closePopup() }} id="dive" className=""></div>
                <div className="resaChoice">
                    {
                        data.map((element) => {
                            const jour = new Date(element.day);
                            const date = jour.toLocaleString("fr-FR", { weekday: "long", day: "numeric", month: "numeric" });


                            return (
                                <div className="resaChoice__all">
                                    <div className="resaChoice__all_titleDiv">
                                        <h3 className="resaChoice__all_titleDiv_title">{date}</h3>
                                    </div>
                                    <div className="resaChoice__all_content">
                                        <div className="resaChoice__all_content_text">
                                            <h4 className="resaChoice__all_content_text_title">Premier service</h4>
                                            <div className="resaChoice__all_content_text_txt">
                                                {
                                                    element.morningH.map((e) => {
                                                        const heure = new Date(e);
                                                        const heureFormat = heure.toLocaleString("fr-FR", { hour: "numeric", minute: "numeric" });
                                                        return (
                                                            // ici je recup l'id du jour cliqué et l'heure cliqué du jour
                                                            // pour recup  le J c'est element.day et pour l'h c'est e
                                                            // je recup l'id du jour cliqué pour le mettre dans la methode put avec element._id
                                                            <p onClick={() => { handleClick(element.day, element._id, e) }} className="resaChoice__all_content_text_txt_p">{heureFormat}</p>

                                                        )
                                                    })
                                                }

                                            </div>
                                        </div>
                                        <div className="underlineDiv">
                                            <div className="underlineDiv__underline"></div>
                                        </div>
                                        <div className="resaChoice__all_content_text">
                                            <h4 className="resaChoice__all_content_text_title">Deuxième service</h4>
                                            <div className="resaChoice__all_content_text_txt">
                                                {
                                                    element.eveningH.map((e) => {
                                                        const heure = new Date(e);
                                                        const heureFormat = heure.toLocaleString("fr-FR", { hour: "numeric", minute: "numeric" });
                                                        return (
                                                            <p onClick={() => { handleClick(element.day, element._id, e) }} className="resaChoice__all_content_text_txt_p">{heureFormat}</p>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>

                {showPopup && (

                    <div className="popup">
                        <div className="popup__closeButton" >
                            {/* 
                            <label class="hamburger">
                                <input type="checkbox" />
                                <svg viewBox="0 0 32 32">
                                    <path class="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
                                    <path class="line" d="M7 16 27 16"></path>
                                </svg>
                            </label> */}

                            <img onClick={() => { closePopup() }} className="popup__closeButton_image" src={croix} alt="close" />
                        </div>

                        <h2 id="resaChoice" className="popup__title">Reservations pour <span className="span">{dayFormat}</span> à <span className="span">{new Date(hour).getHours()}:{new Date(hour).getMinutes()} </span></h2>

                        <form onSubmit={handleSubmit} className="popup__form" action="submit">

                            <div className="popup__form_inputs">
                                <div className="parentLabel">
                                    <input required ref={nameRef} className="popup__form_inputs_input" type="text" />
                                    <label className="label">Nom</label>

                                </div>
                                <div className="parentLabel">
                                    <input required ref={emailRef} className="popup__form_inputs_input" type="email" />
                                    <label className="label">Email</label>
                                </div>
                            </div>

                            <p className="popup__form_places">Nous avons <span className="span">20 places</span> disponibles, veuillez choisir le nombre de places qu'il vous faut !</p>

                            <div className="popup__form_placesChoice">

                                <p className="popup__form_placesChoice_title">Nombre de places ?</p>

                                <div className="popup__form_placesChoice_selector">
                                    {/* button avec le nombre de personnes */}

                                    <div onClick={() => {
                                        setPlaces(places - 1)
                                        if (places <= 0) {
                                            setPlaces(0)
                                        };
                                    }} className="popup__form_placesChoice_selector_nav"><img className="popup__form_placesChoice_selector_nav_image" src={moins} alt="moins" /></div>

                                    <p className="popup__form_placesChoice_selector_value">{places}</p>

                                    <div onClick={() => {
                                        setPlaces(places + 1)
                                        if (places >= 20) {
                                            setPlaces(20)
                                        };
                                    }} className="popup__form_placesChoice_selector_nav"><img className="popup__form_placesChoice_selector_nav_image" src={plus} alt="plus" /></div>
                                </div>
                            </div>


                            <button className="popup__form_submitButton_button" type="submit">Valider</button>

                        </form>
                    </div>
                )}
            </>

        )
    }
}