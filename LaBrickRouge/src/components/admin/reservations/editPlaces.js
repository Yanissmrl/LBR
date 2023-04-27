import { useContext, useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import Loader from '../../loader';

export default function EditPlaces(props) {
    // State
    const [firstPlaces, setFirstPlaces] = useState('');
    const [secondPlaces, setSecondPlaces] = useState('');
    const [isEditable, setIsEditable] = useState(false);
    const [loader, setLoader] = useState(false);
    // Ref
    const dayRef = useRef(props.date);
    const firstPlacesRef = useRef();
    const secondPlacesRef = useRef();
    const morningHRef = useRef(props.morningH);
    const eveningHRef = useRef(props.eveningH);



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
            morningH: morningHRef.current,
            eveningH: eveningHRef.current,
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
        props.apiContext.deletHoraire(props.id).then(res => {
            if (res) {
                alert("Horaire supprimé");
            }
        }
        )

    }


    return (
        <form id={props.id} onSubmit={handleSubmit} action="submit" className="resaCard__grid_all" key={props.key} >
            {loader && (
                <Loader />
            )}
            <p className="resaCard__grid_all_day">{props.date}</p>
            <div className="resaCard__grid_all_card">


                {
                    isEditable ? (
                        <button type="submit">
                            <FontAwesomeIcon icon={faFloppyDisk} />
                        </button>
                    ) : (
                        <FontAwesomeIcon onClick={toggleEditable} icon={faPenToSquare} />
                    )
                }

                <p onClick={deletCard}>Supprimer</p>

                <div>
                    {/* <button onClick={handleDelete()}></button> */}
                </div>
                <div className="resaCard__grid_all_card_content">
                    <h3 className="resaCard__grid_all_card_content_title">Premier service</h3>
                    <div className="resaCard__grid_all_card_content_hourList">
                        {
                            props.morningH.map((e) => {
                                const heure = new Date(e);
                                const heureFormat = heure.toLocaleString("fr-FR", { hour: "numeric", minute: "numeric" });
                                return (
                                    <p className="resaCard__grid_all_card_content_hourList_hour">{heureFormat}</p>
                                )
                            })
                        }
                    </div>

                    {
                        isEditable ? (
                            <input
                                type="text"
                                defaultValue={props.firstPlaces}
                                onChange={(e) => setFirstPlaces(e.target.value)}
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
                        {
                            props.eveningH.map((e) => {
                                const heure = new Date(e);
                                const heureFormat = heure.toLocaleString("fr-FR", { hour: "numeric", minute: "numeric" });
                                return (

                                    <p className="resaCard__grid_all_card_content_hourList_hour">{heureFormat}</p>
                                )
                            })
                        }
                    </div>

                    {
                        isEditable ? (
                            <>
                                <input type="text"
                                    defaultValue={props.secondPlaces}
                                    onChange={(e) => setFirstPlaces(e.target.value)}
                                    ref={secondPlacesRef}
                                />
                            </>
                        ) : (

                            <p className="resaCard__grid_all_card_content_places"><span className="span">{props.secondPlaces}</span> places disponibles</p>

                        )

                    }

                </div>
            </div>
        </form>
    )


}