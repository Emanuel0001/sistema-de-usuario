import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.css';
import { useCookies } from 'react-cookie';
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie'
import logo from './imagens/icons8-imagem-96.png'
import menu from './imagens/iconeMenu.png'
import editarFoto from './imagens/icons8-editar-imagem-48(2).png'
import uploadImg from './imagens/uploadImg.png'

import { Button, Modal } from 'react-bootstrap'

const DashBoard = () => {

  const [isValidCadastro, setIsValidCadastro] = useState(false);
  const [isBase64Code, setIsBase64Code] = useState('')
  const [isImagem, setIsImagem] = useState('')
  const [tituloHeader, setIsTituloHeader] = useState('');

  const [isValid64Code, setIsValid64Code] = useState(true);
  const [isValidImage, setIsValidImage] = useState(false);
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

    async function buscaTodosRegistros() {
      let tbody = document.getElementById('tbody')
      tbody.innerText = '';

      let response = await fetch('https://test-backend-12.herokuapp.com/buscarRegistros', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },

      })
      const resultadoRegistros = await response.json()

      for (let i = 0; i <= resultadoRegistros.usuarios.rowCount; i++) {
      let tr = tbody.insertRow();
      
      let td_id_cod_img = tr.insertCell();
      let td_name = tr.insertCell();
      let td_email = tr.insertCell();

      td_id_cod_img.innerHTML = `<img src= ${resultadoRegistros.usuarios.rows[i].id_cod_img || logo} width=\"70%\" height=\"30px\">`;
      td_name.innerText = resultadoRegistros.usuarios.rows[i].name;
      td_email.innerText = resultadoRegistros.usuarios.rows[i].email;
      
      }
    }
    buscaTodosRegistros()
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
    console.log(result.message)
    console.log(result.error)

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
          <li><div id="cssImagem"><img onClick={abrirEditarPerfil} id="imagemDoUsuario" src={isImagem || logo} /></div></li>
          <li><a id="nameUser">{userName}</a></li>
          <li><a><img id="menu" src={menu} /></a>
            <ul>
              <li> <a onClick={abrirEditarPerfil}>Adicionar Foto</a></li>
            

              <li><a onClick={deletarCookie} id="Sair">Sair</a></li>
            </ul>
          </li>
        </ul>
      </nav>

      <div id="container-list">
        LISTA DE USUÁRIOS DO SITEMA
        <table border="1">
          <thead>
            <tr>
              <th >Foto</th>
              <th>Nome</th>
              <th> E-mail</th>
            </tr>
          </thead>
          <tbody boder='1' id="tbody">
            <tr>
              <td><img id="imagemDoUsuario" src={isImagem}></img></td>
              <td>hitallosoares1@gmail.com</td>
              <td>Emanuel</td>
            </tr>

          </tbody>

        </table>

      </div>

      <Modal id="modal-header-adcionar-foto" show={isValidCadastro} >
        <Modal.Header id="modal-header-adcionar-foto" closeButton onClick={fecharModal}>

          <img id="imagemHeaderModal" src={editarFoto}></img>
          {tituloHeader}

        </Modal.Header>
        <Modal.Body id="modal-body-adciona-foto">
          <img id="imagemCentroUpload" src={uploadImg}></img>
          <div>
            <input type="file" id="modal-input-file" onChange={onChange}></input>
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
