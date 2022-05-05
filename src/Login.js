import React, { useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useHistory } from "react-router-dom";
import  {  useCookies  }  from  'react-cookie' ;

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
      setPasswordErroMessage("Senha valida!")


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
      setEmailErroMessage('Email valido!');

    } else {
      setIsEmailValid(false);
      setEmailErroMessage('Digite um email Valido!');
    }
  };


  const disabledButton = () => {

    if (isEmailValid && isValidPassword) {
      return false;

    } else {
      return true;
    }
  }
  const submitForm = (event) => {
    event.preventDefault();

    fetch('http://localhost:3001/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email, password: password })

    })
      .then((res) => res.json())
      .then((json) => setApiResponse(json))

      .catch(e => console.log(" erro!!",))
    var res = window.document.getElementById('res')
    var texto = JSON.stringify(apiResponse)
    var texto2 = JSON.parse(texto)
    if (texto2.message) {


    setCookie("user", "Logado", { path: "/" , secure: "true"});
    
      res.innerHTML = texto2.message
      history.push('/DashBoard')

    } else {
      res.innerHTML = texto2.error

    }

  }




  return (

    <div id="login-container">
      <h1>Entrar</h1>

      <form onSubmit={submitForm}>
        <label for="email">Email</label>
        <input
          type="email"
          name='email'
          id='email'
          placeholder='Email...'
          value={email}
          onChange={validateEmail}>
        </input>
        <div className={`message ${isEmailValid ? 'success' : 'error'}`}>
          {EmailErroMessage}
        </div>
        <label for="password">Senha</label>
        <input
          type="password"
          name="password"
          placeholder='Senha'
          value={password}
          onChange={validatePassword}
        >
        </input>
        <div className={`message ${isValidPassword ? 'success' : 'error'}`}>
          {PasswordErroMessage}
        </div>
        <Link to='/cadastrar' id="link"><button id='botao-cadastrar-se' >Cadastrar-se</button></Link>

        <input
          type="submit"
          id='botao-entrar'
          value="Entrar"
          disabled={disabledButton()}
        ></input>

      </form>
      <div id="res"> </div>
    </div>


  );

}

export default App;
