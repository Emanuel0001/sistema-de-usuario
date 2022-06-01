import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useCookies } from 'react-cookie';
import logo from './imagens/iconeLogin.png'

function App() {

  let history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [apiResponse, setApiResponse] = useState('');
  const [cookies, setCookie] = useCookies(['name']);

  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const [PasswordErroMessage, setPasswordErroMessage] = useState('');
  const [EmailErroMessage, setEmailErroMessage] = useState('');

  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;



  const validatePassword = (event) => {
    const password = event.target.value;
    setPassword(event.target.value)

    if (password.length >= 6) {
      setIsValidPassword(true);
      setPasswordErroMessage("")


    } else {
      setIsValidPassword(false)
      setPasswordErroMessage("A senha deve ter no minimo 6 caracteres")
    }
  }

  const validateEmail = (event) => {
    const email = event.target.value;
    setEmail(event.target.value);

    if (emailRegex.test(email)) {
      setIsEmailValid(true);
      setEmailErroMessage('');

    } else {
      setIsEmailValid(false);
      setEmailErroMessage('Digite um email Valido!');
    }
  };
  async function submitForm(event) {
    event.preventDefault();

    let response = await fetch('https://test-backend-12.herokuapp.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email, password: password })

    })
    const result = await response.json()
    const token = result.token
    const NomeUser = result.email
    setCookie("x-access-token", token, { path: "/", secure: "true" })
    setCookie("userName", NomeUser   , { path: "/", secure: "true" })
    console.log(result.token)
    setApiResponse(result)
    var resultado = window.document.getElementById('resultado')
    console.log("nome"+NomeUser)
    if (result.message) {

      const resultadoCliente = await fetch('https://test-backend-12.herokuapp.com/client', {
        method: 'GET',
        headers: {
          'x-access-token': token,
          'email': NomeUser 
        }
      })
      if (resultadoCliente.status === 200) {
        history.push("/Dashboard")
      } else {
        resultado.innerHTML = 'Token Inválido'
      }

    } else {
      resultado.innerHTML = result.error

    }

  }

  const disabledButton = () => {
    if (isEmailValid && isValidPassword) {

      return false;

    } else {
      return true;
    }
  }



  return (

    <div id="login-container">

      <img src={logo} />
      <h1>Sign In</h1>

      <form onSubmit={submitForm}>
        <i class="bi bi-envelope"></i>
        <input
          type="email"
          name='email'
          id='email'
          placeholder='E-mail'
          value={email}
          onChange={validateEmail}>
        </input>

        <div className={`message ${isEmailValid ? 'success' : 'error'}`}>
          {EmailErroMessage}
        </div>

        <input
          type="password"
          name="password"
          placeholder='Password'
          value={password}
          onChange={validatePassword}
        >
        </input>
        <div className={`message ${isValidPassword ? 'success' : 'error'}`}>
          {PasswordErroMessage}
        </div>
        <div id="resultado"> </div>
        <input
          type="submit"
          id='botao-entrar'
          value="LOGIN"
          disabled={disabledButton()}
        ></input>

      </form>


      <footer>
        <Link to='/cadastrar' id="link">Create Account</Link>
      </footer>
    </div>


  );

}

export default App;
