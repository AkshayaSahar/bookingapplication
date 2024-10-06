import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleClick = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/"); 
  }

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "underline" }}>
          <span className="logo">akshabooking</span>
        </Link>
        {user ? (
         <div className="userInfo">
         <span className="userName">{`Hello ${user.details.username}!`}</span>
         <button onClick={handleClick} className="logoutButton">Logout</button>
       </div>
        ) : (
          <div className="navItems">
            <Link to="/register">
              <button className="navButton">Register</button>
            </Link>
            <Link to="/login">
              <button className="navButton">Login</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
