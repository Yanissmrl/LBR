import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../routes/appContext';
import { APIContext } from "../api/APIcall";
import eyeHide from '../assets/eye-password-hide.svg';

export default function Login() {
    const appContext = useContext(AppContext);
    const apiContext = useContext(APIContext);
    const navigate = useNavigate();
    const userData = useRef(null);
    let { user } = useParams();
    const [currentData, setData] = useState([]);
    const [erreur, setErreur] = useState('');

    useEffect(() => {
        apiContext.getUser().then(data => {
            if (data[0]) {
                userData.current = data[0];

                setData(userData.current)
            }
        });
    }, [user, apiContext])

    const loginSubmit = (e) => {
        if (currentData.loginId === e.target[0].value && currentData.password === e.target[1].value) {

            e.preventDefault();
            appContext.setUser({
                ...appContext.user,
                loggedIn: true
            })
            navigate('/admin');
        } else {
            e.preventDefault();
            e.target[0].value = '';
            e.target[1].value = '';
            setErreur('Identifiants ou mot de passe incorrect !')
        }
    }

    const oeil = (e) => {
        e.preventDefault();

        const pass = document.getElementById('pass')
        pass.setAttribute('type', pass.getAttribute('type') === 'password' ? 'text' : 'password'
        );

    }


    if (!user) {
        return (
            <section className="loginPage">
                <div className="login">
                    <h1 className="login__title">Connexion</h1>
                    <form className="login__form" onSubmit={loginSubmit}>
                        <div className="login__form_parentLabel">
                            <input className="login__form_parentLabel_input" type="text" />
                            <label className="login__form_parentLabel_label">Login</label>
                        </div>
                        <div className="login__form_parentLabel">
                            <div className="divPosition">
                                <input className="login__form_parentLabel_input" id="pass" type="password" />
                                <div className="login__form_parentLabel_eye" onClick={oeil}><img className="login__form_parentLabel_eye_image" src={eyeHide} alt="eye" /></div>
                                <label className="login__form_parentLabel_label">Password</label>
                            </div>
                        </div>

                        <p className="login__form_err">{erreur}</p>
                        <button className="login__form_button" type="submit">Se connecter</button>

                    </form>
                </div>
            </section>
        )
    } else {
        <></>
    }
}


