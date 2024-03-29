import { useState } from "react";
import { createContext } from "react";

export const HorairesContext = createContext(null);

export default function HorairesProvider(props) {
    const [showPopup, setShowPopup] = useState(false);
    const [horaires, setHoraires] = useState(null);
    const [actionPage, setActionPage] = useState(null);
    console.log("showPopup", showPopup);
    return (
        <HorairesContext.Provider
            value={{
                setActionPage,
                actionPage,
                setShowPopup,
                showPopup,
                setHoraires,
                horaires,
            }}>
            {props.children}
        </HorairesContext.Provider>
    );
}

