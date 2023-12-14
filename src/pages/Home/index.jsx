import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

const Home = () => {
  const [menus, setMenus] = useState([]);
  // data dibawah harus diisi daan dtg dari API
  const [paging, setPaging] = useState({
    currentPage: 1,
    previousPage: 0,
    nextPage: 2,
  });

  useEffect(() => {
    getMenus();
    // buat updating, jika current page bakal ngehit ulang get Menu nya (setiap currentPage nya berubah, maka bakal mangggil API nya ulang)
  }, [paging.currentPage]);

  const getMenus = () => {
    axios
      .get(
        `https://api.mudoapi.tech/menus?name=&type=&perPage=10&page=${paging.currentPage}`
      ) // query param itu buat filter
      .then((respon) => {
        console.log(respon);
        setMenus(respon.data.data.Data);
        setPaging({
          currentPage: respon.data.data.currentPage,
          nextPage: respon.data.data.nextPage,
          previousPage: respon.data.data.previousPage,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .delete(`https://api.mudoapi.tech/menu/${id}`, config)
      .then((respon) => {
        console.log(respon);
        getMenus(); // reload ulang ke getmenu lagii
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleBack = () => {
    setPaging({
      ...paging,
      currentPage: paging.currentPage - 1,
    });
  };

  const handleNext = () => {
    setPaging({
      ...paging,
      currentPage: paging.currentPage + 1,
    });
  };

  return (
    <div>
      <Navbar />
      <h1>Ini List Menu di Halaman Home Page</h1>
      <Link to={"/new-menu"}>
        <p>Create Menu</p>
      </Link>
      <h1>Page {paging.currentPage}</h1>
      <div>
        <button disabled={!paging.previousPage} onClick={handleBack}>
          Back
        </button>
        <button disabled={!paging.nextPage} onClick={handleNext}>
          Next
        </button>
      </div>
      {menus.length &&
        menus.map((item, idx) => (
          <div>
            <p key={idx}>{item.name}</p>
            <img width={"150px"} src={item.imageUrl} alt="" />
            <Link to={`/user/${item.id}`}>
              <button>detail</button>
            </Link>
            <button onClick={() => handleDelete(item.id)}>delete</button>
            <p>{item.description}</p>
            <p>{item.price}</p>
          </div>
        ))}
    </div>
  );
};
export default Home;
