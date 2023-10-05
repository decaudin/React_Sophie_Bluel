import React from "react";
import { Link } from "react-scroll";
import { useNavigate, useLocation } from "react-router-dom";
import "./Header.scss";
import instagram from "../../assets/instagram.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';

const Header = ({ isAuthenticated, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const login = () => {
    navigate("/Login");
  };

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <div>
      <div className={`headerBlack ${isAuthenticated ? 'adminMode' : ''}`}>
        <FontAwesomeIcon icon={faPenToSquare} />
        <p className="headerMiddle">Mode édition</p>
        <p className="headerChange">publiez les changements</p>
      </div>
      <div className="header">
        <div className="title">
          <h1>Sophie Bluel</h1>
          <h2>ARCHITECTE D'INTÉRIEUR</h2>
        </div>
        <nav className="navBar">
          <ul>
            <li>
              <Link to="projects" smooth={true} duration={500}>
                projets
              </Link>
            </li>
            <li>
              <Link to="contact" smooth={true} duration={800}>
                contact
              </Link>
            </li>
            <li className={`${location.pathname === "/Login" ? "loginBold" : ""}`}>
              {isAuthenticated ? (
                <span onClick={handleLogout}>logout</span>
              ) : (
                <span onClick={login}>login</span>
              )}
            </li>
            <li>
              <img src={instagram} alt="logo d'Instagram" />
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
