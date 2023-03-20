import HeaderCarte from "../components/Carte/Header";
import Plats from "../components/Carte/plats";
import Desserts from "../components/Carte/desserts";
import Entree from "../components/Carte/entree";
import Boissons from "../components/Carte/boissons";
import Nav from "../components/nav";
import APIProvider from "../api/APIcall";
import Footer from "../components/footer";
import { useState, } from "react";
import table from '../assets/table.svg';
export default function Carte() {

    const [page, setPage] = useState(1);
    return (
        <APIProvider>
            <div className="page">
                <Nav></Nav>
                <div className="container">
                    <div className="carte-page">
                        <div className="left">
                            <ul className="left__nav">
                                <p className="left__nav_link" onClick={() => {
                                    setPage(1)
                                }} >Menu</p>
                                <p className="left__nav_link" onClick={() => {
                                    setPage(2)
                                }}>Entrées</p>
                                <p className="left__nav_link" onClick={() => {
                                    setPage(3)
                                }}>Plats</p>
                                <p className="left__nav_link" onClick={() => {
                                    setPage(4)
                                }}>Desserts</p>
                                <p className="left__nav_link" onClick={() => {
                                    setPage(5)
                                }}>Boissons</p>
                            </ul>
                            <img className="left__nav_image" src={table} alt="illstration" />
                        </div>

                        {page === 1 && <HeaderCarte />}
                        {page === 2 && <Entree />}
                        {page === 3 && <Plats />}
                        {page === 4 && <Desserts />}
                        {page === 5 && <Boissons />}
                    </div>
                </div>
                <Footer></Footer>
            </div>
        </APIProvider>
    )
}