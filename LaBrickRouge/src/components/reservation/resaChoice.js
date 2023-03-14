import { useContext, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { APIContext } from "../../api/APIcall";

export default function ResaChoice() {

    
    const apiContext = useContext(APIContext);
    let { reservation } = useParams();
    const [data, setData] = useState([]);
    const [showPopup, setShowPopup] = useState(false);


    const handleClick = (day, hour) => {
        setShowPopup(true);
        setNom('')
        setEmail('')
    };;

    const nameRef = useRef();
    const emailRef = useRef();
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        setShowPopup(false);
        const dataName = nameRef.current.value
        const dataEmail = emailRef.current.value
        setNom(dataName)
        setEmail(dataEmail)

        apiContext.postReservation({
            day: "lundi",
            name: dataName,
            email: dataEmail,
            persons: 2,
            hour: "12h00"
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
                <div className="resaChoice">
                    {
                        data.map((element) => {
                            return (
                                <div className="resaChoice__all">
                                    <div className="resaChoice__all_titleDiv">
                                        <h3 className="resaChoice__all_titleDiv_title">{element.day}</h3>
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
                        <form onSubmit={handleSubmit} className="popup__form" action="submit">
                            <h2 id="resaChoice" className="popup__form_title">Veuillez choisir la reservation</h2>
                            <div className="popup__form_inputs">
                                <div id="resaChoice">

                                </div>
                                <input required ref={nameRef} placeholder="Nom" className="popup__form_inputs_input" type="text" />
                                <input required ref={emailRef} placeholder="Email" className="popup__form_inputs_input" type="text" />
                                <p>{nom + " " + email}</p>
                            </div>
                            <p className="popup__form_txt">nombre de personnes ?</p>
                            <button className="popup__form_button" type="submit" >Envoyer</button>
                        </form>
                    </div>
                )}
            </>

        )
    }
}