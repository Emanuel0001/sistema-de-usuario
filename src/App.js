import logo from './logo.svg';
import './App.css';

function App() {
  return (

<div id = "login-container">
<h1>Entrar</h1>
<form action=''>
<label for ="email">Email</label>
<input type="email" name='email' placeholder='Digite seu email...'></input> 
<label for="password">Senha</label>
<input type="password" name='password' id="password" placeholder='Digite a sua senha'></input>
<a href='#' id='forgot-pass'>Esqueceu a senha?</a>
<input type="submit" id='botao-cadastrar-se' value="Cadastre-se"></input>
<input type="submit" id='botao-entrar' value="Entrar"></input>
</form>
</div>
  );
}

export default App;
