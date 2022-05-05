import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.css';
import { useCookies } from 'react-cookie';
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie'

const DashBoard = () => {
  let history = useHistory();

  useEffect(() => {

    let dadosCookie = Cookies.get("user")

    if (dadosCookie == 'Logado') {
    } else { history.push('/') }
  }, []);

  const deletarCookie = () => {
    Cookies.remove('user');
    history.push('/');
  }
  return (
    <div>
      <h1>BEM-VINDO <Link onClick={deletarCookie} id="Sair" >Sair</Link></h1>

    </div>

  );
}

export default DashBoard;