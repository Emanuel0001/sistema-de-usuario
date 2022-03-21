import React, { useState } from 'react';
import './App.css';


function App() {

  const [isValid, setIsValid] = useState(false);
  const [message, setMessage] = useState('');
  const [isValidPass, setIsValidPass] = useState(false);
  const [messagePass, setMessagePass] = useState('');
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  const validatePassword = (event) => {
    const password = event.target.value;

    if (password.length >= 6) {
      setIsValidPass(true);
      setMessagePass("Senha valida!")
    } else {
      setIsValidPass(false)
      setMessagePass("A senha deve ter no minimo 6 caracteres")
    }
  }

  const validateEmail = (event) => {
    const email = event.target.value;

    if (emailRegex.test(email)) {
      setIsValid(true);
      setMessage('Email Valido!');
    } else {
      setIsValid(false);
      setMessage('Digite um email Valido!');
    }

  };

  return (
    <div id="login-container">
      <h1>Entrar</h1>

      <form >
        <label for="email">Email</label>
        <input
          type="email"
          name='email'
          id='email'
          placeholder='Email...'
          onChange={validateEmail}>
        </input>
        <div className={`message ${isValid ? 'success' : 'error'}`}>
          {message}
        </div>
        <label for="password">Senha</label>
        <input
          type="password"
          name="password"
          placeholder='Senha'
          onChange={validatePassword}>
        </input>
        <div className={`message ${isValidPass ? 'success' : 'error'}`}>
          {messagePass}
        </div>

        <a href='#' id='forgot-pass'>Esqueceu a senha?</a>
        <input type="submit" id='botao-cadastrar-se' value="Cadastre-se"></input>
        <input type="submit" id='botao-entrar' value="Entrar"></input>
      </form>
      
    </div>
    
    
  );
}

export default App;
