import HeaderResa from "../components/reservation/header";
import Nav from "../components/nav";
import APIProvider from "../api/APIcall";
import Footer from "../components/footer";
export default function Carte() {

    return (
        <APIProvider>
            <div>
                <Nav></Nav>
                <HeaderResa></HeaderResa>
                <Footer></Footer>
            </div>
        </APIProvider>
    )
}