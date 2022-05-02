import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';


function App() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmacao, setPasswordConfimacao] = useState('');

    const [apiResponse, setApiResponse] = useState('');

    const [isValidPasswordConfirmacao, setIsValidPasswordConfimacao] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);

    const [PasswordErroMessage2, setPasswordErroMessage2] = useState('');
    const [PasswordErroMessage, setPasswordErroMessage] = useState('');
    const [EmailErroMessage, setEmailErroMessage] = useState('');


    const [isValidSenhas, setIsValidSenhas] = useState(false);

    const [ValidaSenhasMessage, setValidaSenhasMessage] = useState('');

    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const validatePassword = (event) => {
        const password = event.target.value;
        setPassword(event.target.value)

        if (password.length >= 6) {
            setIsValidPassword(true);
            setPasswordErroMessage("Senha valida!")


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
            setPasswordErroMessage2("Senha valida!")


        } else {
            setIsValidPasswordConfimacao(false)
            setPasswordErroMessage2("A senha deve ter no minimo 6 caracteres")
        }
    }
    /*
        const validaSenhas = (event) => {
           setIsValidSenhas(event.target.value)
            
           var senha1= passwordConfirmacao 
           var senha2 =  password 
           if (password = passwordConfirmacao) {
            setIsValidSenhas(true);
            setValidaSenhasMessage("Senhas Iguais!")
    
           } else {
            setIsValidPasswordConfimacao(false)
            setPasswordErroMessage2("Senhas Não conferem")
        }
    
        }
      */
    const validateEmail = (event) => {
        const email = event.target.value;
        setEmail(event.target.value);

        if (emailRegex.test(email)) {
            setIsEmailValid(true);
            setEmailErroMessage('Email valido!');

        } else {
            setIsEmailValid(false);
            setEmailErroMessage('Digite um email Valido!');
        }
    };


    const disabledButton = () => {

        if (isEmailValid && isValidPassword) {
            return false;

        } else {
            return true;
        }
    }
    const submitForm = (event) => {
        event.preventDefault();

        fetch('http://localhost:3001/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password })

        })
            .then((res) => res.json())
            .then((json) => setApiResponse(json))

            .catch(e => console.log(" erro!!",))

        var res = window.document.getElementById('res')
        var texto = JSON.stringify(apiResponse)
        var texto2 = JSON.parse(texto)
        if (texto2.message) {
            res.innerHTML = texto2.message
        } else {
            res.innerHTML = texto2.error

        }

    }




    return (

        <div id="login-container">
            <h1>Cadastre-se</h1>

            <form onSubmit={submitForm}>
                <label for="email">Email</label>
                <input
                    type="email"
                    name='email'
                    id='email'
                    placeholder='Email...'
                    value={email}
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
                    value={password}
                    onChange={validatePassword}
                >
                </input>
                <div className={`message ${isValidPassword ? 'success' : 'error'}`}>
                    {PasswordErroMessage}
                </div>
                <label for="password">Confirmar senha</label>
                <input
                    type="password"
                    name="pass"
                    placeholder='Senha'
                    value={passwordConfirmacao}
                    onChange={validatePasswordConfimacao}
                >
                </input>
                <div className={`message ${isValidPasswordConfirmacao ? 'success' : 'error'}`}>
                    {PasswordErroMessage2}
                </div>

                <div className={`message ${isValidSenhas ? 'success' : 'error'}`}>
                    {ValidaSenhasMessage}
                </div>

                <input
                    type="submit"
                    id='botao-entrar'
                    value="Salvar"
                    disabled={disabledButton()}
                ></input>
               <Link to='/' id="link"><button  id='botao-cadastrar-se' >Voltar</button></Link>
               

            </form>
            <div id="res">Resultado </div>




        </div>


    );

}

export default App;