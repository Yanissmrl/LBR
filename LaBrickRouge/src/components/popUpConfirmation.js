import React, { useEffect, useState, useContext } from 'react';
import { HorairesContext } from "../context/horairesContext";

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
            <p>
                C'est un message temporaire!
            </p>
        );
    }
    return null;
}