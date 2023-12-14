import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSucces] = useState("");
 const [loading, setLoading] = useState('')

 const navigate = useNavigate();

  const onChangeUsername = (e) => {
    console.log(e.target.value);
    setUsername(e.target.value);
    setSucces("");
    setError("");
  };

  const onChangePassword = (e) => {
    console.log(e);
    setPassword(e.target.value);
    setSucces("");
    setError("");

  };
  const onSubmit = (e) => {
   setLoading(true)
e.preventDefault();
    // nyiapin data yg akan dikasih ke api
    const bodyPayload = {
      // buat data
      username: username,
      password: password,
    };
    axios
      .post("https://api.mudoapi.tech/login", bodyPayload)
      .then((respon) => {
        console.log(respon);

        //  simpan token di localstorage
        const token = respon.data.data.token;
        localStorage.setItem("accessToken", token)
        setSucces(respon.data.message);
        setLoading(false)

        // navigasi (pindah halaman / diarahin ke halaman link Home jika berhasil)
        navigate("/")
      })
      .catch((error) => {
        console.log(error.response);
        setError(error.response.data.message);
        setLoading(false)
      });
  };

  return (
    <div>
      <Navbar />
      {error.length ? <h1>{error}</h1> : null}
      {success.length ? <h1>{success}</h1> : null}
      <div>
        <label>Username</label>
        {/* event hanler, af=dalah eeven ketika ada sebuah kejadian */}
        <input onChange={onChangeUsername} />
      </div>
      <div>
        <label>Password</label>
        <input onChange={onChangePassword} />
      </div>
      <button disabled={loading ? true : false}  onClick={onSubmit}>{loading ? 'loading...' : 'submit'}</button>
    </div>
  );
};
export default Login;
