import { useContext, useEffect, useState, useRef } from "react";
import { createContext } from "react";

export const HorairesContext = createContext(null);

export default function HorairesProvider(props) {
    const [horaires, setHoraires] = useState(null);
    return (
        <HorairesContext.Provider
            value={{
                setHoraires,
                horaires,
            }}>
            {props.children}
        </HorairesContext.Provider>
    );
}

