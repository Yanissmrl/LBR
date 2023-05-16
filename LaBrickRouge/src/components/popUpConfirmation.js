import React, { useEffect, useState, useContext } from 'react';
import { HorairesContext } from "../context/horairesContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck, faBell, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

export default function PopupTemporaire() {

    const horairesContext = useContext(HorairesContext);

    const [show, setShow] = useState(null);

    useEffect(() => {
        setShow(horairesContext.showPopup);
    }, [horairesContext, show]);


    if (show) {
        return (
            <div className='confirmPopup'>
                {
                    horairesContext.actionPage === 'error' ? (
                        <FontAwesomeIcon className='confirmPopup__notifIconNotOk' icon={faBell} />
                    ) : (
                        <FontAwesomeIcon className='confirmPopup__notifIconOk' icon={faBell} />
                    )
                }
                {/* <FontAwesomeIcon className='confirmPopup__notifIcon' icon={faBell} /> */}
                <div className='confirmPopup__message'>
                    {
                        horairesContext.actionPage === 'error' ? (
                            <>
                                <p className='confirmPopup__message_p'>
                                    {horairesContext.actionPage}
                                </p>
                                <FontAwesomeIcon className='confirmPopup__message_iconNotOk' icon={faTriangleExclamation} />
                            </>

                        ) : (
                            <>
                                <p className='confirmPopup__message_p'>
                                    {horairesContext.actionPage}
                                </p>
                                <FontAwesomeIcon className='confirmPopup__message_iconOk' icon={faSquareCheck} />
                            </>
                        )
                    }
                    {/* {
                        horairesContext.actionPage ? (
                            <>
                                <p className='confirmPopup__message_p'>
                                    {horairesContext.actionPage}
                                </p>
                                <FontAwesomeIcon className='confirmPopup__message_icon' icon={faSquareCheck} />
                            </>
                        ) : horairesContext.actionPage === 'error'(
                            <>
                                <p className='confirmPopup__message_p'>
                                    {horairesContext.actionPage}
                                </p>
                                <FontAwesomeIcon icon={faTriangleExclamation} />
                                <FontAwesomeIcon icon={faCircleExclamation} />
                            </>
                        )
                    } */}
                </div >
            </div >
        );
    }
    return null;
}