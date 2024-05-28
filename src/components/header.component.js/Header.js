import React from "react";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

import { Link } from "react-router-dom";
import "./header.css"; // Import the CSS file
import { remToken, setColor, setName } from "../../redux/actions";
import axios from "axios";
import { API_BASE_URL } from "../../environment";
import { colorTemp, defaultUsername } from "../../config/config";

const Header = () => {
  const dispatch = useDispatch();
  const { name, token } = useSelector((state) => state.user);
  const { value } = useSelector((state) => state.color);

  const handleColorChange = (event) => {
    dispatch(setColor(event.target.value));
  };

  const handleLogout = () => {
    dispatch(remToken());
    localStorage.clear();
    let defaultColor = Object.keys(colorTemp)[0];
    toast.success(
      `Logout Success!!!, default theme color updated to ${colorTemp[defaultColor]}`
    );
    dispatch(setColor(defaultColor));
    dispatch(setName(defaultUsername));
  };

  const handleThemeChange = async () => {
    console.log("token", token);
    if (!token) {
      return toast.error("Login to update color preference");
    }
    let promptResp = window.confirm(
      `Are you sure to change your theme color to (${colorTemp[value]})`
    );
    console.log("promptResp", promptResp);
    if (promptResp) {
      const { data } = await axios.put(
        `${API_BASE_URL}/preferences`,

        {
          color: value,
          username: name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (data && data.status == 200) {
        localStorage.setItem(
          "user",
          JSON.stringify({ preference: value, username: name })
        );
        toast.success("Theme updated success, re-login to check");
      } else {
        toast.error(`Theme updation failed, ${data.message}`);
      }
    }
  };

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
      <div>
        <label htmlFor="color-select">Choose a color: </label>
        <select id="color-select" onChange={handleColorChange}>
          <option value="#ffffff">White</option>
          <option value="#ff0000">Red</option>
          <option value="#00ff00">Green</option>
          <option value="#0000ff">Blue</option>
          <option value="#ffff00">Yellow</option>
        </select>
        <button className="theme-button" onClick={handleThemeChange}>
          Change Theme
        </button>
        {/* <Toaster /> */}
        {token && (
          <button className="login-button" onClick={handleLogout}>
            Logout
          </button>
        )}

        <Toaster />
      </div>
    </header>
  );
};

export default Header;
