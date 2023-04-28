import EventContent from "../components/evenement/content";
import Nav from "../components/nav";
import APIProvider from "../context/APIcall";
import Footer from "../components/footer";
export default function Reservation() {

    return (
        <APIProvider>
            <Nav></Nav>
            <section className="container">

                <EventContent></EventContent>

            </section>
            <Footer></Footer>
        </APIProvider>
    )
}