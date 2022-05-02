import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Login from './Login'
import Cadastrar from './cadastrar'
import './App.css';
  const DashBoard = () => {
      
    return (
     <div>
         <h1>BEM-VINDO <Link to='/' id="Sair" >Sair</Link></h1>
        
     </div>
  
    );
  }
  
  export default DashBoard;