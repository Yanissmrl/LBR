import React, { useState } from 'react';

export default function Popup() {

    const [showPopup, setShowPopup] = useState(false);

    

    return (
        <div>
            {showPopup && (
                <div className="popup">
                    <form className="popup__form" action="">
                        <h2 className="popup__form_title">Ceci est le contenu du popup !</h2>
                        <input className="popup__form_input" type="text" />
                        <input className="popup__form_input" type="text" />
                        <p className="popup__form_txt">nombre de personnes ?</p>
                        <button className="popup__form_button" onClick={() => setShowPopup(false)}>Fermer</button>
                    </form>
                </div>
            )}
        </div>
    );
}
