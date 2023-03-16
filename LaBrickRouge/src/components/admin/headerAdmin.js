import { APIContext } from "../../api/APIcall";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function HeaderAdmin() {

    const apiContext = useContext(APIContext);
    let { resaClient } = useParams();
    const [data, setData] = useState([]);


    useEffect(() => {

        apiContext.getResaClient().then(data => setData(data));

    }, [resaClient, apiContext])

    return (
        <div className="adminPages">
            <div className="HeaderAdmin">

                <h1 className="HeaderAdmin_title">Header de merde</h1>
                {
                    data.map((element) => {
                        return (
                            <p className="">{element.name}</p>

                        )
                    })
                }


            </div>
        </div>
    );


}