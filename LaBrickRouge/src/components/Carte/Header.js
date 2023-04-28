import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { APIContext } from "../../context/APIcall";
import couverts from '../../assets/couverts.svg';


export default function HeaderCarte() {
    const apiContext = useContext(APIContext);
    let { menu } = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {

        apiContext.getMenus().then(data => setData(data));

    }, [menu, apiContext])

    if (!menu) {

        return (
            <div className="right">
                <div className="right__first-section">
                    <h1 className="right__first-section_title">Menu</h1>
                    <img className="right__first-section_image" src={couverts} alt="illustration" />
                </div>
                <div className="right__menu">
                    {
                        data.map((element) => {
                            return (
                                <div className="right__menu_all">
                                    <div className="right__menu_all_head">
                                        <h3 className="right__menu_all_head_title">{element.name}</h3>
                                        <p className="right__menu_all_head_price">{element.price} €</p>
                                    </div>
                                    <div className="right__menu_all_content">
                                        <div className="right__menu_all_content_part">
                                            <h3 className="right__menu_all_content_part_title">- Entrée</h3>
                                            <div className="right__menu_all_content_part_desc">
                                                {
                                                    element.entree.map((entree) => {
                                                        return (
                                                            <p className="right__menu_all_content_part_desc_txt">{entree}</p>
                                                        )
                                                    })
                                                }</div>
                                        </div>

                                        <div className="right__menu_all_content_part">
                                            <h3 className="right__menu_all_content_part_title">- Plat</h3>
                                            <div className="right__menu_all_content_part_desc">
                                                {
                                                    element.plats.map((plats) => {
                                                        return (
                                                            <p className="right__menu_all_content_part_desc_txt">{plats}</p>
                                                        )
                                                    })
                                                }</div>
                                        </div>

                                        <div className="right__menu_all_content_part">
                                            <h3 className="right__menu_all_content_part_title">- Dessert</h3>
                                            <div className="right__menu_all_content_part_desc">

                                                {
                                                    element.desserts.map((dessert) => {
                                                        return (
                                                            <p className="right__menu_all_content_part_desc_txt">{dessert}</p>
                                                        )
                                                    })
                                                }

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    } else {
        return (
            <></>

        )
    }




}