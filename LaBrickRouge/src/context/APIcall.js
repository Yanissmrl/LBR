
import { createContext } from "react";

export const APIContext = createContext(null);

export default function APIProvider(props) {
    return (
        <APIContext.Provider
            value={{
                getMenus: API.getMenus,
                getHoraires: API.getHoraires,
                postReservation: API.postReservation,
                postReservationAdmin: API.postReservationAdmin,
                postUser: API.postUser,
                getResaClient: API.getResaClient,
                getPlats: API.getPlats,
                getEvent: API.getEvent,
                postEvent: API.postEvent,
                updateHoraire: API.updateHoraire,
                deletHoraire: API.deletHoraire,
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
    getEvent: async () => {
        let header = {
            method: 'GET',
        }
        const response = await fetch(`${baseUrl}/news`, header)
        const data = await response.json()
        return data
    },
    getPlats: async () => {
        let header = {
            method: 'GET',
        }
        const response = await fetch(`${baseUrl}/plats`, header)
        const data = await response.json()
        return data
    },

    getResaClient: async () => {
        let header = {
            method: 'GET',
        }
        const response = await fetch(`${baseUrl}/resaClient`, header)
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
    },

    postReservationAdmin: async (data) => {

        return await fetch(`${baseUrl}/horaires`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => {
            if (response) {
                return response.json();
            }
        }
        );
    },
    postEvent: async (data) => {
        await fetch(`${baseUrl}/news`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    },
    postUser: async (userName, password, token) => {
        const header = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userName, password, token })
        }
        const response = await fetch(`${baseUrl}/user`, header)

        const data = await response.json()
        console.log("data", data);
        if (data?.token) {
            localStorage.setItem('token', data.token)
        }
        return data

    },
    updateHoraire: async (id, data) => {
        const response = await fetch(`${baseUrl}/horaires/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }); if (response) {
            const jsonData = await response.json();
            // console.log("jsonData", jsonData);
            return jsonData;
        }
    },
    deletHoraire: async (id) => {
        await fetch(`${baseUrl}/horaires/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
    },






}
