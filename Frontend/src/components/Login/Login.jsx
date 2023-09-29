import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import "./Login.scss";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    if (e) {
      e.preventDefault();
    }

    try {
      const apiUrl = 'http://localhost:5678/api/users/login';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Identifiant et/ou mot de passe incorrect(s)');
      }

      const responseData = await response.json();
      sessionStorage.setItem('token', responseData.token);
      onLogin(true); // Appel de la fonction de rappel avec true en tant qu'argument
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de la connexion : ', error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login">
      <h2>Log In</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">E-mail</label>
        <input
          className="input"
          type="email"
          id="email"
          name="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Mot de passe</label>
        <div className='inputContainer'>
          <input
            className="input"
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {password && (
            showPassword ? (
              <FontAwesomeIcon
                icon={faEyeSlash}
                className="passwordIcon"
                onClick={togglePasswordVisibility}
              />
            ) : (
              <FontAwesomeIcon
                icon={faEye}
                className="passwordIcon"
                onClick={togglePasswordVisibility}
              />
            )
          )}
        </div>
        <input className="send" type="submit" value="Se connecter" />
      </form>
      <p>Mot de passe oublié</p>
    </div>
  );
};

export default Login;



