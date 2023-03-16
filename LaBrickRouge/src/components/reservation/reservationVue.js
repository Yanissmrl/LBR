



export default function ResaVue() {



    return (
        <div className="resaVue">
            <div className="resaVue__all">
                <h2 className="resaVue__all_title">Reservations</h2>

                <div className="resaVue__all_content">
                    <h3 className="resaVue__all_content_title">Reservations de libre :</h3>

                    <div className="resaVue__all_content_text">
                        <h4 className="resaVue__all_content_text_title">Aujourd'hui</h4>
                        <div className="resaVue__all_content_text_resacontent">
                            <p className="resaVue__all_content_text_resacontent_txt">12h00</p>
                            <p className="resaVue__all_content_text_resacontent_txt">3 places</p>
                        </div>
                    </div>

                    <div className="resaVue__all_content_text">
                        <h4 className="resaVue__all_content_text_title">Demain</h4>
                        <div className="resaVue__all_content_text_resacontent">
                            <p className="resaVue__all_content_text_resacontent_txt">12h00</p>
                            <p className="resaVue__all_content_text_resacontent_txt">5 places</p>


                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}