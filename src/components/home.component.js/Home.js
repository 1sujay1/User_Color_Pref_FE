import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setColor, setName, setToken } from "./../../redux/actions";
import "./home.css";
import axios from "axios";
import Cookies from "universal-cookie";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../../environment";

const colorTemp = {
  "#ffffff": "White",
  "#ff0000": "Red",
  "#00ff00": "Green",
  "#0000ff": "Blue",
  "#ffff00": "Yellow",
};

const Home = () => {
  const color = useSelector((state) => state.color.value);
  const { name, token } = useSelector((state) => state.user);
  console.log("token ,name", token, name);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  React.useEffect(() => {
    document.body.style.backgroundColor = color;
  }, [color]);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    let userName = prompt("Enter username");
    let password = prompt("Enter password");
    let confirmPassword = prompt("Enter confirm password");
    if (!userName || !password) {
      return toast.error("Required username and password");
    }
    try {
      //CREATE API CALL
      const { data } = await axios.post(
        `${API_BASE_URL}/user`,
        {
          username: userName,
          password,
          confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (data && data.status == 200) {
        return toast.success(`User ${username}, created successfully`);
      } else {
        return toast.error(data.message);
      }
    } catch (error) {
      return toast.error(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //API call
      const axiosResp = await axios.post(`${API_BASE_URL}/signIn`, {
        username,
        password,
      });

      const cookieValue = axiosResp.headers["Set-Cookie"];
      console.log("cookieValue", cookieValue);
      let data = axiosResp.data;
      if (data && data.status == 200) {
        const { preference, token, username } = data.data;

        toast.success("Login, Success");
        setError("");
        dispatch(setColor(preference)); // Change background color to green on success
        dispatch(setToken(token)); // Update token
        dispatch(setName(username)); // Update Username
      } else {
        const errorText = data.message;
        setError(errorText);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome, {name.toUpperCase()}!</p>
      <form onSubmit={handleSubmit}>
        {token ? (
          <div>
            <p>
              Welcome, <strong>{name.toUpperCase()}!</strong>
            </p>
            <p>
              Your Selected Color Preference is{" "}
              <strong>{colorTemp[color]}</strong>
            </p>
          </div>
        ) : (
          <div>
            <div>
              <h5 className="signInText">Sign In</h5>
            </div>
            <div>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button type="submit">Sign In</button>
          </div>
        )}
        <hr />

        <div className="mt-2">
          <span>
            For Testing<br></br>
            <br />
            <strong>UserNames :</strong> Sujay, User1, User2<br></br>
            <strong>Password : </strong> 1234
            <br />
            <br />
            Each user has different background color which can be observed after
            login and you can change theme color at the top (Header) after logic
          </span>
        </div>
      </form>
      <hr />
      {token && (
        <form onSubmit={handleCreateUser}>
          <button className="login-button" type="submit">
            CreateUser
          </button>
        </form>
      )}
      {/* <hr /> */}
    </div>
  );
};

export default Home;
