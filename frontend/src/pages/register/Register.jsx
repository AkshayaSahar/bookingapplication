import { Link } from "react-router-dom";
import "./register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { loading, error, dispatch } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
  });

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async () => {
    try {
      const res = await axios.post("/api/auth/register", credentials);
      dispatch({type:"LOGIN_SUCCESS", payload: res.data});
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <>
      <div className="rHeader">
        <div className="rHeaderContainer">
          <Link
            to="/"
            style={{ color: "inherit", textDecoration: "underline" }}
          >
            <span className="logo">akshabooking</span>
          </Link>
          <Link to="/login">
            <button className="navButton">Login</button>
          </Link>
        </div>
      </div>
      <div className="register">
        <div className="rContainer">
          <input
            type="text"
            placeholder="username"
            id="username"
            className="rInput"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="email"
            id="email"
            className="rInput"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="password"
            id="password"
            className="rInput"
            onChange={handleChange}
          />
          <button  disabled={loading} className="rButton" onClick={handleClick}>
            Register
          </button>
          {error && <span className="rError">{error.message}</span>}
        </div>
      </div>
    </>
  );
};

export default Register;
