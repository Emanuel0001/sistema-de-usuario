import React, { useState } from 'react';
import './App.css';


function App() {
  
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [EmailErroMessage, setEmailErroMessage] = useState('');
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [PasswordErroMessage, setPasswordErroMessage] = useState('');
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  const validatePassword = (event) => {
    const password = event.target.value;

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

    if (emailRegex.test(email)) {
      setIsEmailValid(true);
      setEmailErroMessage('Email Valido!');
    } else {
      setIsEmailValid(false);
      setEmailErroMessage('Digite um email Valido!');
    }
  console.log(retornaTrueOuFalse());
  };
   
  const retornaTrueOuFalse = () => {
  
    if(isEmailValid && isValidPassword ){
      return false;
    } else {
      return true;
    }
    
  } 
  

  return (
    <div id="login-container">
      <h1>Entrar</h1>

      <form action='http://localhost:3001/' method='POST'>
        <label for="email">Email</label>
        <input
          type="email"
          name='email'
          id='email'
          placeholder='Email...'
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
          onChange={validatePassword}
         >
        </input>
        <div className={`message ${isValidPassword ? 'success' : 'error'}`}>
          {PasswordErroMessage}
        </div>

        <a href='#' id='forgot-pass'>Esqueceu a senha?</a>
        <input type="submit" id='botao-cadastrar-se' value="Cadastre-se"></input>
        <input type="submit" id='botao-entrar' value="Entrar" disabled={retornaTrueOuFalse()}></input>
      </form>
      
    </div>
    
    
  );
}

export default App;
