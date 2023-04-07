import { useContext, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { APIContext } from "../../api/APIcall";
import { Link } from "react-router-dom";



export default function ResaVue() {


    const apiContext = useContext(APIContext);
    let { reservation } = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {

        apiContext.getHoraires().then(data => setData(data));

    }, [reservation, apiContext])
    const datas = data[0]

    return (
        <div className="resaVue">
            <div className="resaVue__all">
                <p className="resaVue__all_title">Pour selectionner une reservation, cliquez sur une horaire du jour de votre votre choix</p>

                <p className="resaVue__all_text">Pour le premier service du jour il nous resteras <span className="resaVue__all_text_places">{datas?.firstAvailablePlaces}</span> places disponibles</p>
                <p className="resaVue__all_text">Pour le second service du jour il nous resteras <span className="resaVue__all_text_places">{datas?.secondAvailablePlaces}</span> places disponibles</p>
            </div>
            <Link to='/carte' className="resaVue__all_button">Accéder à la carte</Link>

        </div>
    )
}