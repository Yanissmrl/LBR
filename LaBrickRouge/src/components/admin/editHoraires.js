import { useRef, useContext } from "react";
import { APIContext } from "../../api/APIcall";

export default function EditHoraires() {
    const apiContext = useContext(APIContext);
    const updateHoraire = apiContext.updateHoraire;
    const persons = useRef();

    const handleUpdate = async () => {
        const newHoraire = {

            AvailablePlaces: persons.current.value,
        };

        await updateHoraire(newHoraire);
    };


    return (
        <div>
            <p>Modif les horaires de resa</p>
            <label htmlFor="heureDebut">Persons :</label>
            <input type="number" id="heureDebut" ref={persons} />
            <button onClick={handleUpdate}>Mettre à jour</button>
        </div>
    );





}