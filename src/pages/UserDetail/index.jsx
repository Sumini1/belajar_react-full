import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserDetail = () => {
    const [menu, setMenu] = useState({})
    const [error, setError] = useState("");



    const param = useParams()
    console.log(param.id);

    useEffect(() => {
        getMenuDetail();
    }, [])

    const getMenuDetail = () => {
        axios.get(`https://api.mudoapi.tech/menu/${param.id}`)
        .then((respon) => {
            setMenu(respon.data.data);
        })
        .catch((error) => {
            console.log(error);
            setError(error.response.data)
        })
    }
    console.log(menu);




    return (
        <div>
            <h1>Ini Halaman User Dertail</h1>
            {error.length ? <h1>{error}</h1> : null}
            <h1>{menu.name}</h1>
            <img width={"150px"} src={menu.imageUrl} alt="" />
            <p>{menu.description}</p>
            <p>{menu.price}</p>
        </div>
    )
}
export default UserDetail;