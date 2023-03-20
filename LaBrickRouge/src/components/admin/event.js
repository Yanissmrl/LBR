import { useRef, useContext, useState } from "react";
import { APIContext } from "../../api/APIcall";


export default function EventAdmin() {
    const apiContext = useContext(APIContext);


    const nameRef = useRef("");
    const infoRef = useRef("");
    const dateRef = useRef();
    const imageRef = useRef("");
    const postEventData = (e) => {
        e.preventDefault();

        const date = dateRef.current.value
        const dateObj = new Date(date);
        console.log(dateObj);

        apiContext.postEvent({
            name: nameRef.current.value,
            image: imageRef.current.value,
            info: infoRef.current.value,
            date: dateObj
        }).then(res => {
            if (res) {
                alert("Reservation envoyée");
            }
        });

    }

    return (
        <div>
            <p>event admin</p>
            <form onSubmit={postEventData} >
                <input placeholder="nom de l'event" ref={nameRef} type="string" />
                <input placeholder="infos" ref={infoRef} type="string" />
                <input placeholder="image" ref={imageRef} type="string" />
                <input placeholder="date" ref={dateRef} type="date" />
                <button>je sais pas</button>
            </form>
        </div>


    )




}