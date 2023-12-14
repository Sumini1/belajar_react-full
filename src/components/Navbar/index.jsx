import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";

const Navbar = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  console.log("token", accessToken);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <div className="navbar">
      <Link to={"/"}>
        <p>Home</p>
      </Link>
      {accessToken ? (
        <p onClick={handleLogout}>logout</p>
      ) : (
        <Link to={"/login"}>
          <p>Login</p>
        </Link>
      )}
    </div>
  );
};
export default Navbar;
