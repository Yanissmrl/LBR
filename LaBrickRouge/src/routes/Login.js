import { useContext, useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../routes/appContext';
import { APIContext } from "../context/APIcall";
import eyeHide from '../assets/eye-password-hide.svg';

export default function Login() {
    let { user } = useParams();
    const navigate = useNavigate();

    const appContext = useContext(AppContext);
    const apiContext = useContext(APIContext);

    const [erreur, setErreur] = useState('');
    const idRef = useRef(null);
    const passwordRef = useRef(null);

    const loginSubmit = (e) => {
        e.preventDefault();
        const loginId = idRef?.current?.value.replace(/[^\w\s]/g, '');
        const password = passwordRef?.current?.value.replace(/[^\w@.]/g, '');
        // console.log("loginId", loginId);
        // console.log("pass", password);

        apiContext.postUser(loginId, password, null).then(data => {
            console.log("data", data);
            if (data) {
                // console.log("data mess", data.message);
                appContext.setUser(true);
                navigate('/admin');
            }
        });

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
                            <input className="login__form_parentLabel_input" ref={idRef} type="text" />
                            <label className="login__form_parentLabel_label">Login</label>
                        </div>
                        <div className="login__form_parentLabel">
                            <div className="divPosition">
                                <input className="login__form_parentLabel_input" ref={passwordRef} id="pass" type="password" />
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