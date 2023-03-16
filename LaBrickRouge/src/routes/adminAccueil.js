import HeaderAdmin from '../components/admin/headerAdmin';
import Horaires from '../components/admin/horaires';
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
                    <ul>
                        <button onClick={() => {
                            setPage(1)
                        }} >page 1</button>
                        <button onClick={() => {
                            setPage(2)
                        }}>page 2</button>
                    </ul>
                </div>
                <div>
                    {page === 1 && <HeaderAdmin />}
                    {page === 2 && <Horaires />}
                </div>
            </section>
            <Footer></Footer>
        </div>
    );
}