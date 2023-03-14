import PageContent from "../components/reservation/pageContent";
import Nav from "../components/nav";
import APIProvider from "../api/APIcall";
import Footer from "../components/footer";
export default function Reservation() {

    return (
        <APIProvider>
            <section className="page">
                <Nav></Nav>
                <PageContent></PageContent>
                <Footer></Footer>
            </section>
        </APIProvider>
    )
}