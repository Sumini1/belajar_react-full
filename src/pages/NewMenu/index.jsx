import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewMenu = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    type: "beverage",
    imageUrl: "",
    price: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    // distructuring (mengambil objek value dari objek)
    const { name, value } = event.target;
    // mengganti value baru yg di dapat dari form
    setForm({
      ...form, //ambil form nya (semua isinya)
      [name]: value, // name nya dimasukin kemudian  diisi sama value nya
      // ganti semua name dan value nya sama yg baru
    });
  };
  console.log("form", form); // cara mengecekmnya di luaf function

  // function untuk onClick handleSubmit
  const handleSubmit = () => {
    //  mengubah tipe data price dari string ke number
    form.price = Number(form.price);

    // buat config untuk Authorization yg isinya token (untuk mengakses token)
    const token = localStorage.getItem("accessToken");
    // harus sesuai dg yg di postman
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // request post create Menu
    axios
      .post("https://api.mudoapi.tech/menu", form, config) // form itu datanya
      .then((respon) => {
        console.log(respon);
        navigate('/')
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  return (
    <div>
      <Navbar />

      <h3>Create Menu</h3>
      <input
        onChange={handleChange}
        type="text"
        name="name"
        placeholder=" Input Name"
      />
      <div>
        <input
          onChange={handleChange}
          type="text"
          name="description"
          placeholder="description"
        />
        <div>
          <select onChange={handleChange} name="type" id="">
            <option value="beverage">Beverage</option>
            <option value="main-dish">Main - Dish</option>
          </select>
          <div>
            <input
              onChange={handleChange}
              type="text"
              name="imageUrl"
              placeholder="image Url"
            />
            <div>
              <input
                onChange={handleChange}
                type="text"
                name="price"
                placeholder="Harga"
              />
            </div>
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NewMenu;
