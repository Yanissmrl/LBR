import React, { useEffect, useState, useContext } from 'react';
import { HorairesContext } from "../context/horairesContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck, faBell } from "@fortawesome/free-solid-svg-icons";

export default function PopupTemporaire() {
    const horairesContext = useContext(HorairesContext);

    console.log("zehubvc");
    console.log("horairesContext", horairesContext);

    const [show, setShow] = useState(null);

    useEffect(() => {
        setShow(horairesContext.showPopup);
        console.log('ok');
        console.log("horairesContext?.showPopup", horairesContext.showPopup);
    }, [horairesContext, show]);


    if (show) {
        return (
            <div className='confirmPopup'>
                <FontAwesomeIcon className='confirmPopup__notifIcon' icon={faBell} />
                <div className='confirmPopup__message'>
                    <p className='confirmPopup__message_p'>
                        Réservation crée
                    </p>
                    <FontAwesomeIcon className='confirmPopup__message_icon' icon={faSquareCheck} />
                </div>
            </div>
        );
    }
    return null;
}