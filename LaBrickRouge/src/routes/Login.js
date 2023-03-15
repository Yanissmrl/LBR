import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../routes/appContext';
import { APIContext } from "../api/APIcall";

export default function Login() {
    const appContext = useContext(AppContext);
    const apiContext = useContext(APIContext);
    const navigate = useNavigate();
    const userData = useRef(null);

    let { user } = useParams();
    const [currentdata, setData] = useState([]);

    useEffect(() => {
        apiContext.getUser().then(data =>{
        if (data[0])  {
            setData(data[0].loginId)
            userData.current = data[0].loginId;
            console.log("data[0].loginId :", userData.current);
        }});
    }, [user, apiContext])

    if (!user) {
        return (
            <section className="">
                <h1>Login {userData.current ? (userData.current) : '' }</h1>
                <form onSubmit={e => {
                    e.preventDefault();
                    appContext.setUser({
                        ...appContext.user,
                        loggedIn: true
                    })
                    navigate('/');
                }}>
                    <ul>
                        <li>
                            <label>Identidiant&nbsp;</label>
                            <input type="text" />
                        </li>
                        <li>
                            <label>Mot de passe&nbsp;</label>
                            <input type="password" />
                        </li>
                        <button type="submit">Connexion</button>
                    </ul>
                </form>
            </section>
        )
    } else {
        <></>
    }
}


