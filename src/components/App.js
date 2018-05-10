import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import Home from './Home'
import Pesquisar from './Pesquisar'
import Cadastro from './Cadastro'
import Login from './Login'
import Cadastro2 from './Cadastro2'
import Tabela from './Tabela'
import Cadastro3 from './Cadastro3'
import TabelaCrianca from './TabelaCriancas'
import Medida from './Medida'


//const About = () => <section className="intro-section"><h1>sobre</h1></section >

class App extends Component {
  render() {
    return (

      <Router>
        <div >
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/Pesquisar' component={Pesquisar} />
            <Route path='/Cadastro' component={Cadastro} />
            <Route path='/Login' component={Login} />
            <Route path='/Cadastro2' component={Cadastro2} />
            <Route path='/Tabela' component={Tabela} />
            <Route path='/Cadastro3' component={Cadastro3} />
            <Route path='/TabelaCrianca' component={TabelaCrianca} />
            <Route path='/Medida' component={Medida} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
