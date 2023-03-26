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


    useEffect(() => {

        apiContext.getHoraires().then(data => setData(data));

    }, [reservation, apiContext])


    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [day, setDay] = useState('');
    const [hour, setHour] = useState('');
    const [id, setId] = useState('');

    const dayFormat = new Date(day).toLocaleString("fr-FR", { weekday: "long", day: "numeric", month: "numeric" });
    // const date = jour.toLocaleString("fr-FR", { weekday: "long", day: "numeric", month: "numeric" });

    const handleClick = (day, id, hour) => {
        setDay(day)
        setHour(hour)
        setShowPopup(true);
        setNom('')
        setEmail('')
        setId(id)
        document.getElementById('dive').classList.add("bg-opacity")

    };;

    const [places, setPlaces] = useState(0);
    const nameRef = useRef();
    const emailRef = useRef();

    // console.log(data[0]?._id);
    // for (let i = 0; i < id.length; i++) {
    //     if (data[i]?._id === id) {
    //         let availablePlaces = 0;
    //         console.log("places ", places);
    //         availablePlaces = data.AvailablePlaces - places;
    //         console.log("AvailablePlaces", availablePlaces);
    //     }
    // }


    console.log("id", id);
    const handleSubmit = (e) => {
        e.preventDefault();
        setShowPopup(false);
        document.getElementById('dive').classList.remove("bg-opacity")
        const dataName = nameRef.current.value
        const dataEmail = emailRef.current.value
        console.log("test", id);
        console.log("test2", data._id);
        if (id === data._id) {
            apiContext.updateHoraire({
                day: day,
                hour: hour,
                AvailablePlaces: places
            }).then(res => {
                if (res) {
                    alert("Horaire modifié");
                }
            });
        }



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
                                                        return (
                                                            <p onClick={() => { handleClick(element.day, element._id, e) }} className="resaChoice__all_content_text_txt_p">{e}</p>

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

                        <h2 id="resaChoice" className="popup__title">Reservations pour <span className="span">{dayFormat}</span> à <span className="span">{hour}</span></h2>

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

                            <div className="popup__form_submitButton">

                                <div className="popup__form_submitButton_arrow">
                                    <div className="popup__form_submitButton_arrow_line">
                                        {/* trait */}
                                    </div>
                                    <div className="popup__form_submitButton_arrow_edge">
                                        {/* carré pour faire la flèche */}
                                    </div>
                                </div>

                                <button className="popup__form_submitButton_button" type="submit">Valider</button>
                            </div>
                        </form>
                    </div>
                )}
            </>

        )
    }
}