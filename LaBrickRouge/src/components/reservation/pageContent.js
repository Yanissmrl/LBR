import ResaChoice from "./resaChoice";
import ResaVue from "./reservationVue";


export default function pageContent() {

    return (
        <section className='reservation'>
            <div className="container">
                <h1 className="title">Reservations</h1>
                <div className="reservation__content">
                    <ResaVue />
                    <ResaChoice />
                </div>
            </div>
        </section>
    )
}