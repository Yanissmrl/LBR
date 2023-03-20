import HeaderAdmin from '../components/admin/headerAdmin';
import Horaires from '../components/admin/horaires';
import EventAdmin from '../components/admin/event';
import Nav from "../components/nav";
import Footer from "../components/footer";
import { useState, } from "react";

export default function AdminAccueil() {

    const [page, setPage] = useState(1);

    return (
        <div>
            <Nav></Nav>
            <section className='container'>
                <div className='adminPages'>
                    <div className='adminNav'>
                        <ul className='adminNav__ul'>
                            <div className='adminNav__ul_links'>
                                <p className='adminNav__ul_links_button' onClick={() => {
                                    setPage(1)
                                }} >Accueil</p>
                            </div>
                            <div className='adminNav__ul_links'>
                                <p className='adminNav__ul_links_button' onClick={() => {
                                    setPage(3)
                                }}>Reservations</p>
                            </div>
                            <div className='adminNav__ul_links'>
                                <p className='adminNav__ul_links_button' onClick={() => {
                                    setPage(4)
                                }}>Evenements</p>
                            </div>
                        </ul>
                    </div>
                    {page === 1 && <HeaderAdmin />}
                    {page === 3 && <Horaires />}
                    {page === 4 && <EventAdmin />}

                </div>
            </section>
            <Footer></Footer>
        </div>
    );
}