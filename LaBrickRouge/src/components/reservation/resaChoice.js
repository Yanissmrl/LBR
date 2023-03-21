import { useContext, useEffect, useState, useRef } from "react";
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


    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [day, setDay] = useState('');
    const [hour, setHour] = useState('');

    const handleClick = (day, hour) => {
        setDay(day)
        setHour(hour)
        setShowPopup(true);
        setNom('')
        setEmail('')
        document.getElementById('dive').classList.add("bg-opacity")
    };;

    const [places, setPlaces] = useState(0);

    const nameRef = useRef();
    const emailRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowPopup(false);
        document.getElementById('dive').classList.remove("bg-opacity")
        const dataName = nameRef.current.value
        const dataEmail = emailRef.current.value
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

    useEffect(() => {

        apiContext.getHoraires().then(data => setData(data));

    }, [reservation, apiContext])


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
                                                        return (
                                                            <p onClick={() => { handleClick(element.day, e) }} className="resaChoice__all_content_text_txt_p">{e}</p>

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
                                                        return (
                                                            <p onClick={() => { handleClick(element.day, e) }} className="resaChoice__all_content_text_txt_p">{e}</p>
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
                        <div className="popup__closeButton" ><img onClick={() => { closePopup() }} className="popup__closeButton_image" src={croix} alt="close" /></div>

                        <h2 id="resaChoice" className="popup__title">Reservations pour <span className="span">{day}</span> à <span className="span">{hour}</span></h2>

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
                                        setPlaces(places - 1);
                                    }} className="popup__form_placesChoice_selector_nav"><img className="popup__form_placesChoice_selector_nav_image" src={moins} alt="moins" /></div>

                                    <p className="popup__form_placesChoice_selector_value">{places}</p>

                                    <div onClick={() => {
                                        setPlaces(places + 1);
                                    }} className="popup__form_placesChoice_selector_nav"><img className="popup__form_placesChoice_selector_nav_image" src={plus} alt="plus" /></div>
                                </div>
                            </div>

                            <div className="popup__form_submitButton">

                                <div className="popup__form_submitButton_arrow">
                                    <div className="popup__form_submitButton_arrow_line">
                                        {/* trait */}
                                    </div>
                                    <div className="popup__form_submitButton_arrow_edge">
                                        {/* carré pour faire la flèche */}
                                    </div>
                                </div>


                                <div className="popup__form_submitButton_button" type="submit">Envoyer</div>
                            </div>
                        </form>
                    </div>
                )}
            </>

        )
    }
}