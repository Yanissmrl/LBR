import { useContext, useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../routes/appContext';
import { APIContext } from "../context/APIcall";
import eyeHide from '../assets/eye-password-hide.svg';
// import { use } from "../../../Back/request/userRouter";

export default function Login() {
    let { user } = useParams();
    const navigate = useNavigate();

    const appContext = useContext(AppContext);
    const apiContext = useContext(APIContext);

    // const userData = useRef(null);
    const [erreur, setErreur] = useState('');
    const idRef = useRef(null);
    const passwordRef = useRef(null);
    const [data, setData] = useState([]);


    // useEffect(() => {
    //     console.log("appcontext", appContext.user);
    //     console.log("loggedIn", appContext.user);
    //     if (appContext.user === true) {
    //         navigate('/admin');
    //         console.log("ok");
    //     }

    // }, [appContext.user, appContext]);


    const loginSubmit = (e) => {
        e.preventDefault();

        apiContext.postUser(idRef?.current?.value, passwordRef?.current?.value, null).then(data => {
            console.log("data", data);
            if (data) {

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
                            <input className="login__form_parentLabel_input" defaultValue={'yaniss'} ref={idRef} type="text" />
                            <label className="login__form_parentLabel_label">Login</label>
                        </div>
                        <div className="login__form_parentLabel">
                            <div className="divPosition">
                                <input className="login__form_parentLabel_input" defaultValue={'admin'} ref={passwordRef} id="pass" type="password" />
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

