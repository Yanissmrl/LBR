
import { createContext } from "react";

export const APIContext = createContext(null);

export default function APIProvider(props) {
    return (
        <APIContext.Provider
            value={{
                getMenus: API.getMenus,
                getHoraires: API.getHoraires,
                postReservation: API.postReservation,
            }}>
            {props.children}
        </APIContext.Provider>
    );
}

const serverProtocol = 'http'
const serverHost = 'localhost'
const serverPort = 4040
const baseUrl = `${serverProtocol}://${serverHost}:${serverPort}`


const API = {

    getMenus: async () => {
        let header = {
            method: 'GET',
        }
        const response = await fetch(`${baseUrl}/menu`, header)
        const data = await response.json()
        return data
    },

    getHoraires: async () => {
        let header = {
            method: 'GET',
        }
        const response = await fetch(`${baseUrl}/horaires`, header)
        const data = await response.json()
        return data
    },


    postReservation: async (data) => {

        await fetch(`${baseUrl}/resaClient`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }
}
