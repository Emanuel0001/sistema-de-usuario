import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.css';
import { useCookies } from 'react-cookie';
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie'
import logo from './imagens/icons8-imagem-96.png'
import menu from './imagens/iconeMenu.png'

import uploadImg from './imagens/uploadImg.png'

import { Button, Modal } from 'react-bootstrap'

const DashBoard = () => {

  const [isValidCadastro, setIsValidCadastro] = useState(false);
  const [isBase64Code, setIsBase64Code] = useState('')
  const [isImagem, setIsImagem] = useState('')
  const [tituloHeader, setIsTituloHeader] = useState('');

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

      } else {
        history.push("/")
      }
    } validaToken()
  }, []);

  const deletarCookie = () => {
    Cookies.remove('email');
    Cookies.remove('x-access-token');
    history.push('/');

  }

  async function submitForm(event) {
    event.preventDefault();

  }
  const abrirEditarPerfil = () => {
    setIsValidCadastro(true);
  }

  const fecharModal = () => {
    setIsValidCadastro(false);
  }

  async function salvarEFecharModal() {

    let email = Cookies.get("userName")
    var resultadoImg = document.getElementById('resultadoSalvarImg');

    let response = await fetch('https://test-backend-12.herokuapp.com/salvarFoto', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email, code64: isBase64Code })

    })


    const result = await response.json()
    console.log(result.message)
    console.log(result.error)

    if (result.message) {
      setIsValidCadastro(false)
      resultadoImg.innerHTML = result.message
    } else {
      resultadoImg.innerHTML = result.error

    }


  }

  const onChange = e => {
    const files = e.target.files;
    const file = files[0];
    getBase64(file);
  };

  const onLoad = fileString => {
    setIsBase64Code(fileString)
  };

  const getBase64 = file => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      onLoad(reader.result);
    };
  }
  const imprimiImagem = () => {
    var image = new Image();

  }
  imprimiImagem()



  async function apagarFoto() {

    let email = Cookies.get("userName");
    var resultadoImg = document.getElementById('resultadoSalvarImg');

    let response = await fetch('https://test-backend-12.herokuapp.com/apagaImagem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email })
    })

    const result = await response.json()
    console.log(result.message)
    console.log(result.error)

    if (result.message) {
      function delay(n) {
        return new Promise(function (resolve) {
            setTimeout(resolve, n * 1000);
            
        });
    }
    setIsValidCadastro(false)
  } else {
      resultadoImg.innerHTML = result.error

    }
    setIsBase64Code('');
  }


  async function pegaImagem() {

    let email = Cookies.get("userName")
    var resultadoImg = document.getElementById('resultadoSalvarImg');

    let response = await fetch('https://test-backend-12.herokuapp.com/imagem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email })

    })


    const result = await response.json()
    if(result.message.id_cod_img){
       setIsImagem(result.message.id_cod_img) 
    setIsTituloHeader("Perfil")
    } else {
      setIsTituloHeader("Adcionar foto")
      setIsImagem('')
    }
   
  } pegaImagem()


  return (
    <div>

      <nav className="menuNav">
        <p id="logoSite">DASHBOARD</p>
        <ul>
          <li><div id="cssImagem"><img onClick={abrirEditarPerfil} id="imagemDoUsuario" src={isImagem || logo} /></div></li>
          <li><a id="nameUser">{userName}</a></li>
          <li><a><img id="menu" src={menu} /></a>
            <ul>
              <li> <a onClick={abrirEditarPerfil}>Adicionar Foto</a></li>
              <li><a>2</a></li>
              <li><a>3</a></li>
              <li><a>4</a></li>

              <li><a onClick={deletarCookie} id="Sair">Sair</a></li>
            </ul>
          </li>
        </ul>
      </nav>


      <Modal id="modal-header-adcionar-foto" show={isValidCadastro} >
        <Modal.Header id="modal-header-adcionar-foto" closeButton onClick={fecharModal}>
          {tituloHeader}

        </Modal.Header>
        <Modal.Body id="modal-body-adciona-foto">
         <img id="imagemCentroUpload"  src={uploadImg}></img>  
         <div>
            <input type="file" id="modal-input-file" onChange={onChange}></input>
            <label for="modal-input-file">
             
              <img
                id="uploadImg"
                src={isBase64Code || isImagem } >
              </img>
             
            </label>

          </div>
          Click para enviar

        </Modal.Body>
        <Modal.Footer>
          <Button id="btn-go-out" onClick={apagarFoto} >
            Apagar foto
          </Button>
          <Button id="btn-primary" onClick={salvarEFecharModal} >
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>

    </div>

  );
}

export default DashBoard;
