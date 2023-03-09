import HeaderCarte from "../components/Carte/Header";
import Nav from "../components/nav";
import APIProvider from "../api/APIcall";
import Footer from "../components/footer";
export default function Carte() {

    return (
        <APIProvider>
            <div>
                <Nav></Nav>
                <HeaderCarte></HeaderCarte>
                <Footer></Footer>
            </div>
        </APIProvider>
    )
}