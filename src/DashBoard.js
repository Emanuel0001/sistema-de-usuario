import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.css';
import { useCookies } from 'react-cookie';
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie'
import logo from './imagens/iconeLogin.png'
import menu from './imagens/iconeMenu.png'



const DashBoard = () => {
  let history = useHistory();

  var userName = Cookies.get("userName")
  useEffect(() => {

    const token = Cookies.get("x-access-token")
    var resultado = window.document.getElementById('nomeUser')

    async function validaToken() {
      const resultadoCliente = await fetch('https://test-backend-12.herokuapp.com/client', {
        method: 'GET',
        headers: {
          'x-access-token': token
        }
      })
      if (resultadoCliente.status === 200) {
        resultado.innerHTML = userName
      } else {
        history.push("/")
      }

      console.log(resultadoCliente.status)
    } validaToken()
  }, []);

  const deletarCookie = () => {
    Cookies.remove('email');
    Cookies.remove('x-access-token');
    history.push('/');
  }


  async function submitForm(event) {
    event.preventDefault();

    let response = await fetch('https://test-backend-12.herokuapp.com/get', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})

    })
    const result = await response.json()
    console.log(result)
    var resultado = window.document.getElementById('resultado')
    if (result.message) {
      resultado.innerHTML = result.message
    } else {
      resultado.innerHTML = result.error

    }
  }

  return (
    <div>

      <nav className="menuNav">
        <p id="logoSite">Dashboard</p>
        <ul>
          <li><img id="imagemDoUsuario" src={logo} /></li>
          <li><a id="nameUser">{userName}</a></li>
          <li><a><img id="menu" src={menu} /></a>
            <ul>
              <li><a onClick={submitForm} >Editar Perfil</a></li>
              <li><a onClick={deletarCookie} id="Sair">Sair</a></li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>

  );
}

export default DashBoard;
