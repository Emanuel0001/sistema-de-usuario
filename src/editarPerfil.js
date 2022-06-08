import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.css';
import { useCookies } from 'react-cookie';
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import ReactDOM from 'react-dom';
import {Button,Modal} from 'react-bootstrap'


const editarPerfil = () => {
  function ativamodal () {
   return true
  }
  
  function fecharModal(){
  }
  return (

    <div id="editar-container">
  
      <h1 id='tituloCadastrar'>Edit Account</h1>
      <Link to='/Dashboard' >voltar</Link>
<Button onChange >Open Modal</Button>
     <Modal show={ativamodal()}>
      <Modal.Header>
        <h5 >Cadastrado com sucesso</h5>
      </Modal.Header>
      <Modal.Body>
        Bem vindo!
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={fecharModal()}>
         Fazer Login
        </Button>
      </Modal.Footer>
     </Modal>
       </div>

  );




}




export default editarPerfil;
