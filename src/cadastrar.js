import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Cadastrar.css';
import imagem from './imagens/iconeEditar.png'
import { useHistory } from "react-router-dom";

function App() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmacao, setPasswordConfimacao] = useState('');

    const [apiResponse, setApiResponse] = useState('');

    const [isValidPasswordConfirmacao, setIsValidPasswordConfimacao] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isNameValid, setIsNameValid] = useState(false);

    const [PasswordErroMessage2, setPasswordErroMessage2] = useState('');
    const [PasswordErroMessage, setPasswordErroMessage] = useState('');
    const [EmailErroMessage, setEmailErroMessage] = useState('');
    const [NameErroMessage, setNameErroMessage] = useState('');

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

    const validaNome = (event) => {
        const name = event.target.value;
        setName(event.target.value);
        console.log(name)
        if (nameRegex.test(name)) {
            setIsNameValid(true);
            setNameErroMessage();

        } else {
            setIsNameValid(false);
            setNameErroMessage('Somente letras!');
        }

    };

    const disabledButton = () => {
        if (isEmailValid && isValidPassword && isNameValid && isValidPasswordConfirmacao) {
            return false;

        } else {
            return true;
        }
    }
    async function submitForm(event) {
        event.preventDefault();
        var div = document.getElementById('load');
           
            
        
        let response = await fetch('https://test-backend-12.herokuapp.com/cadastrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password, passwordConfirmacao: passwordConfirmacao, name: name })

        })
        div.style.display = 'inline-block';
        const result = await response.json()
        setApiResponse(result)
        console.log(result)
        var resultado = window.document.getElementById('resultado')
        if (result.cadastrado) {
            
            alert("Cadastrado com sucesso!");
            history.push('/')
        } else {
            let i = 0;
            while(i < 1250000){
                i++;
                if(i  <= 1250000){
                    div.style.display = 'none';
                   
                      continue;
                }
                 resultado.innerHTML = result.error
                     }
        }
    }

   const carregando = () => {
   
    var carregando = 0   
    if(carregando === 0){
            }
   }


    return (

        <div id="cadastrar-container">
            <img src={imagem}></img>
            <h1 id='tituloCadastrar'>Create Account</h1>

            <form onSubmit={submitForm}>

                <input
                    type="text"
                    name='name'
                    id='name'
                    placeholder='First name'
                    value={name}
                    onChange={validaNome}>
                </input>
                <div className={`message ${isNameValid ? 'success' : 'error'}`}>
                    {NameErroMessage}
                </div>

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
                    placeholder='Confirm Password'
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
                    value="CREATE ACCOUNT"
                    disabled={disabledButton()}
                ></input>
                <footer>
                    <Link to='/' id="link">Login Here</Link>
                </footer>



            </form>

        </div>


    );

}

export default App;
