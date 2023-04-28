import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { APIContext } from "../../context/APIcall";
import couverts from '../../assets/couverts.svg';


export default function Plats() {
    const apiContext = useContext(APIContext);
    let { plats } = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {

        apiContext.getPlats().then(data => setData(data));

    }, [plats, apiContext])

    if (!plats) {

        return (
            <div className="right">
                <div className="right__first-section">
                    <h1 className="right__first-section_title">Plats</h1>
                    <img className="right__first-section_image" src={couverts} alt="illustration" />
                </div>
                <div className="right__plats">
                    {data.map((plat) => {
                        const category = plat.category;
                        if (category === "plat") {
                            return (
                                <div className="right__plats_all">
                                    <div className="right__plats_all_head">
                                        <p className="right__plats_all_head_name">{plat.name}</p>
                                        <p className="right__plats_all_head_price">{plat.price}€</p>
                                    </div>
                                    <div className="right__plats_all_content">
                                        <p className="right__plats_all_content_desc">{plat.description}</p>
                                        {

                                        }
                                        <p className="right__plats_all_content_ingredients">{plat.ingredients.map((ingredients) => {
                                            return (
                                                <span>{ingredients}, </span>
                                            )
                                        })}</p>
                                    </div>
                                </div>
                            )
                        }

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