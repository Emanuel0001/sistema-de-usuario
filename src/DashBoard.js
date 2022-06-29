import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.css';
import { useCookies } from 'react-cookie';
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie'
import imagemUser from './imagens/imagem-user.png'
import iconeMenu from './imagens/icone-Menu.png'
import iconeEditarFoto from './imagens/editar-imagem.png'
import uploadImg from './imagens/uploadImg.png'
import { Button, Modal } from 'react-bootstrap'

const DashBoard = () => {
  const [dadosBackend, setDadosBackend] = useState([]);
  const [isValidCadastro, setIsValidCadastro] = useState(false);
  const [isBase64Code, setIsBase64Code] = useState('')
  const [isImagem, setIsImagem] = useState('')
  const [tituloHeader, setIsTituloHeader] = useState('');
  const [isValid64Code, setIsValid64Code] = useState(true);
  const [isValidImage, setIsValidImage] = useState(false);
  let history = useHistory();
  var userName = Cookies.get("userName")

  useEffect(() => {
    buscaTodosRegistros()
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

  async function buscaTodosRegistros() {
    const div = document.getElementById('loadTable');
    let response = await fetch('https://test-backend-12.herokuapp.com/buscarRegistros', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    div.style.display = 'inline-block';
    const resultadoRegistros = await response.json();
    const usuarios = resultadoRegistros.usuarios.rows;
    setDadosBackend(usuarios);
    div.style.display = 'none';
  }

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
    setIsBase64Code('')
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
    setIsValid64Code(false)
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
    if (result.message) {
      setIsValidCadastro(false)
      setIsValid64Code(true)
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
    if (result.message.id_cod_img) {
      setIsImagem(result.message.id_cod_img)
      setIsValidImage(true)
      setIsTituloHeader("Perfil")
    } else {
      setIsTituloHeader("Adcionar foto")
      setIsValidImage(false);
      setIsImagem('');
    }
  } pegaImagem()

  const dasabilitar = () => {
    if (isValidImage || isValid64Code) {
      return true;
    } else {
      return false;
    }
  }

  const dasabilitarApagarFoto = () => {
    if (isValidImage) {
      return false
    } else {
      return true
    }
  }
  return (
    <div>
      <nav className="menuNav">
        <p id="logoSite">DASHBOARD</p>
        <ul>
          <li>
            <div>
              <img
                onClick={abrirEditarPerfil}
                class="imagemDoUsuario"
                src={isImagem || imagemUser} />
            </div>
          </li>
          <li><a id="nameUser">{userName}</a></li>
          <li><a><img id="menu" src={iconeMenu} /></a>
            <ul id="menu-selecionar">
              <li> <a onClick={abrirEditarPerfil}>Adicionar Foto</a></li>
              <li><a onClick={deletarCookie} >Sair</a></li>
            </ul>
          </li>
        </ul>
      </nav>
      <div id="container-list" >
        LISTA DE USUÁRIOS DO SISTEMA
        <table >
          <thead>
            <tr>
              <th >Foto</th>
              <th>Nome</th>
              <th> E-mail</th>
            </tr>
          </thead>
          <div id='loadTable'></div>
          {dadosBackend.map((val, key) => {
            return (
              <tbody>
                <tr key={key}>
                  <td><img class="imagemUsuario" src={val.id_cod_img || imagemUser}></img></td>
                  <td>{val.name}</td>
                  <td>{val.email}</td>
                </tr>
              </tbody>
            )
          })}
        </table>
      </div>
      <Modal id="modal-header-adcionar-foto" show={isValidCadastro} >
        <Modal.Header id="modal-header-adcionar-foto" closeButton onClick={fecharModal}>
          <img
            id="imagemHeaderModal"
            src={iconeEditarFoto}>
          </img>
          {tituloHeader}
        </Modal.Header>
        <Modal.Body id="modal-body-adciona-foto">
          <img
            id="imagemCentroUpload"
            src={uploadImg}>
          </img>
          <div>
            <input
              type="file"
              id="modal-input-file"
              onChange={onChange}>
            </input>
            <label for="modal-input-file">
              <img
                id="uploadImg"
                src={isBase64Code || isImagem} >
              </img>
            </label>
          </div>
          Click para enviar
        </Modal.Body>
        <Modal.Footer>
          <Button
            id="btn-go-out"
            disabled={dasabilitarApagarFoto()}
            onClick={apagarFoto} >
            Apagar foto
          </Button>
          <Button
            id="btn-primary"
            disabled={dasabilitar()}
            onClick={salvarEFecharModal} >
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DashBoard;
