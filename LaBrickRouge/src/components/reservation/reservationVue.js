import { useContext, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { APIContext } from "../../api/APIcall";



export default function ResaVue() {


    const apiContext = useContext(APIContext);
    let { reservation } = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {

        apiContext.getHoraires().then(data => setData(data));

    }, [reservation, apiContext])

    return (
        <div className="resaVue">
            <div className="resaVue__all">
                <p> Pour selectionner une reservation, cliquez sur une horaire du jour de votre votre choix</p>


                <p>Pour le premier service du jour il nous resteras {data[0]?.AvailablePlaces} places disponibles</p>
                <p>Pour le second service du jour il nous resteras 467 places disponibles</p>
                <button>Accéder à la carte</button>
            </div>

        </div>
    )
}