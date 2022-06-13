import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.css';
import { useCookies } from 'react-cookie';
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import ReactDOM from 'react-dom';
import { Button, Modal } from 'react-bootstrap'
import uploadImg from './imagens/uploadImg.png'

const editarPerfil = () => {
 
  function ativamodal() {
    return true
  }

  function fecharModal() {
  }
  return (

    <div id="editar-container">

      <h1 id='tituloCadastrar'>Edit Account</h1>
      <Link to='/Dashboard' >voltar</Link>
      
      <Modal id="modal-header-adcionar-foto" show={false}>
        <Modal.Header id="modal-header-adcionar-foto" closeButton  >
          Adicionar foto
        </Modal.Header>
        <Modal.Body id="modal-body-adciona-foto">
          <div>
            <label for="modal-input-file">
              <img 
              id="uploadImg"
              src={uploadImg}>
              </img>
            </label>
           
           <input type="file" id="modal-input-file" ></input>
          </div> 
          Click para enviar 
        </Modal.Body>
        <Modal.Footer>

          <Button id="btn-primary" >
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>

  );




}




export default editarPerfil;
