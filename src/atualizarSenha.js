import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Cadastrar.css';
import iconeImagem from './imagens/icone-Editar.png'
import { useHistory } from "react-router-dom";
import { Button, Modal } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmacao, setPasswordConfimacao] = useState('');
  const [apiResponse, setApiResponse] = useState('');
  const [isValidPasswordConfirmacao, setIsValidPasswordConfimacao] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isValidCadastro, setIsValidCadastro] = useState(false);
  const [PasswordErroMessage2, setPasswordErroMessage2] = useState('');
  const [PasswordErroMessage, setPasswordErroMessage] = useState('');
  const [EmailErroMessage, setEmailErroMessage] = useState('');
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const nameRegex = /^[a-z ,.'-]+$/i
  let history = useHistory();

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
  const validatePasswordConfimacao = (event) => {
    const passwordConfirmacao = event.target.value;
    setPasswordConfimacao(event.target.value)
    if (passwordConfirmacao.length >= 6) {
      setIsValidPasswordConfimacao(true);
      setPasswordErroMessage2("")
    } else {
      setIsValidPasswordConfimacao(false)
      setPasswordErroMessage2("A senha deve ter no minimo 6 caracteres")
    }
  }

  const validateEmail = (event) => {
    const email = event.target.value;
    setEmail(event.target.value);
    if (emailRegex.test(email)) {
      setIsEmailValid(true);
      setEmailErroMessage();
    } else {
      setIsEmailValid(false);
      setEmailErroMessage('Digite um email Valido!');
    }
  };

  const disabledButton = () => {
    if (isEmailValid && isValidPassword && isValidPasswordConfirmacao) {
      return false;
    } else {
      return true;
    }
  }
  const div = document.getElementById('load');
  const divResultado = document.getElementById('resultado');
 
  async function submitForm(event) {
    event.preventDefault();
    document.getElementById('botao-entrar').disabled = true;
    let response = await fetch('http://localhost:3001/alterarSenha', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email, password: password, passwordConfirmacao: passwordConfirmacao })
    })
    div.style.display = 'inline-block';
    const result = await response.json()
    console.log(result)
    setApiResponse(result)
    var resultado = window.document.getElementById('resultado')
    
    if (result.message) {
      divResultado.style.display = 'none';
      setIsValidCadastro(true);
    } else {
      let i = 0;
      divResultado.style.display = 'none';
      while (i <= 1) {
        i++;
        if (i == 1) {
          document.getElementById('botao-entrar').disabled = false;
          div.style.display = 'none';
          divResultado.style.display = '';
          continue;
        }
        resultado.innerHTML = result.error
      }
    }
  }

  const fecharModalPermanecer = () => {
    setIsValidCadastro(false);
    div.style.display = 'none';
    var resultado = window.document.getElementById('resultado')
    resultado.style.color = "green"
    resultado.innerHTML = 'Alterado com sucesso'
    divResultado.style.display = '';
  }

  function fecharModal() {
    history.push('/')
  }
  return (
    <div id="cadastrar-container">
      <img src={iconeImagem}></img>
      <h1 id='tituloCadastrar'>Change Password</h1>
      <form onSubmit={submitForm}>
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
        <input
          type="password"
          name="pass"
          placeholder='New Password'
          value={passwordConfirmacao}
          onChange={validatePasswordConfimacao}
        >
        </input>
        <div className={`message ${isValidPasswordConfirmacao ? 'success' : 'error'}`}>
          {PasswordErroMessage2}
        </div>
        <div id='load'></div>
        <div id="resultado"></div>
        <input
          type="submit"
          id='botao-entrar'
          value="Enviar"
          disabled={disabledButton()}
        ></input>
        <footer>
          <Link to='/' id="link">Login Here</Link>
        </footer>
        <Modal show={isValidCadastro}>
          <Modal.Header closeButton onClick={fecharModalPermanecer}>
            Alterado com sucesso!
          </Modal.Header>
          <Modal.Body>
            Você será redirecionado para tela login.
          </Modal.Body>
          <Modal.Footer>
            <Button id="btn-primary" onClick={fecharModal}>
              Login
            </Button>
          </Modal.Footer>
        </Modal>
      </form>
    </div>
  );
}

export default App;
