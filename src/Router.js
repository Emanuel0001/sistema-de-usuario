import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Redirect } from "react-router-dom";
import Login from './Login'
import Cadastrar from './cadastrar'
import DashBoard from "./DashBoard";
import editarPerfil from "./editarPerfil";
import './App.css';

const router = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/cadastrar' component={Cadastrar} />
        <Route exact path='/editarPerfil' component={editarPerfil}></Route>
        <Route exact path='/DashBoard' component={DashBoard}></Route>
      </Switch>
    </Router>
  )
}

export default router;