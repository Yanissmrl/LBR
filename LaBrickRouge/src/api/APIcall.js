
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
                getUser: API.getUser,
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

    getUser: async () => {
        let header = {
            method: 'GET',
        }
        const response = await fetch(`${baseUrl}/user`, header)
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

        await fetch(`${baseUrl}/horaires`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
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

    updateHoraire: async (id, data) => {
        // console.log("id", id);
        // console.log("data", data);
        await fetch(`${baseUrl}/horaires/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
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
