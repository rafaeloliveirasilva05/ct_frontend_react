import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import moment from "moment";
import {Redirect } from 'react-router-dom'
import "moment/locale/pt-br";

import NavBar from "./NavBar";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

import "react-datepicker/dist/react-datepicker.css";

class Cadastro2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_crianca: this.props.location.vet.id_crianca,
      numero_ficha: "",
      mes: moment().format("MMMM"),
      data_abertura: moment(),
      horario: moment().format("LT"),
      CT: "",
      bairro: "",
      quem_compareceu: "",
      grau_parentesco: "",
      p2_atendimento: 0,

      nomeSobrenome: this.props.location.vet.nome_crianca,
      datadeNascimento: moment(this.props.location.vet.data_nascimento).format("l"),
      nome_mae_genitora: this.props.location.vet.nome_mae,

      toCadastro3:false,
      bairros: [],
      modal:false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.mudarData = this.mudarData.bind(this);
    this.saveAtendimento = this.saveAtendimento.bind(this)
    this.toggle = this.toggle.bind(this)
  }

  renderRow(row) {
    return (
      <option key={row[0]} value={row[1]}>
        {row[1]}
      </option>
    );
  }

  mudarData = data => {
    this.setState({
      data_abertura: data
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  toggle() {
    this.setState({modal: !this.state.modal})
  }

  mudarCT = data => {
    var bairros = [];
    const CT = data.target.value;
    
    this.setState({ CT });

    axios.post(`https://peaceful-peak-43227.herokuapp.com/buscarBairrosCT`, {CT} )
      .then(res => {
        var bairrosCT  = res.data.bairros
        var i=0;
       
        while(i < bairrosCT.length){
          bairros.push(bairrosCT[i].nome_bairro)
          i++;
        }
        //Fazer um for para ler cada bairro vindo do BD, e colocar na variavel bairro[]
        this.setState({ bairros });
    });
  }

  saveAtendimento(){

    const user = {
      id_crianca: this.state.id_crianca,
      numero_ficha: this.state.numero_ficha,
      mes: this.state.mes,
      data_abertura: moment(this.state.data_abertura._d).format("l"),
      horario: this.state.horario,
      CT: this.state.CT,
      bairro: this.state.bairro,
      quem_compareceu: this.state.quem_compareceu,
      grau_parentesco: this.state.grau_parentesco,
      p2_atendimento: this.state.p2_atendimento
    }

    axios
      .post(`https://peaceful-peak-43227.herokuapp.com/cadastrarCrianca/atendimento`, { user })
      .then(res => {
        this.setState({toCadastro3:true})
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.setState({modal:true})
  }   

  render() {
    let rows = [];

    for (let i = 0; i < this.state.bairros.length; i++) {
      var lin = this.state.bairros[i];
      var resul = [i, lin];
      rows.push(resul);
    }
    //Depois q o cadastro/atendimento é feito, mudar para tela home
    if (this.state.toCadastro3 === true) {
      return < Redirect to={{
          pathname: '/',
      }} push={true} />
    }

    return (
      <div>
        <NavBar />
        <div className="py-5">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 className="text-center">Parte 1 do atendimento</h1>
                <h1 className="text-center">(Secretaria)</h1>
                <hr />

                <form onSubmit={this.handleSubmit}>
                  <div className="row">
                    <div className="form-group col-md-10">
                      <label>Data de Abertura</label>
                      <input
                        name="dataAbertura"
                        type="text"
                        className="form-control"
                        value={this.state.dataAbertura}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="form-group col-md-2">
                      <label>Nº da Ficha </label>
                      <input
                        name="numeroFicha"
                        type="text"
                        className="form-control"
                        value={this.state.numeroFicha}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group col-md-10">
                      <label>Nome da Criança/Adolescente</label>
                      <input
                        name="nomeSobrenome"
                        className="form-control"
                        type="text"
                        value={this.state.nomeSobrenome}
                        readOnly="true"
                      />
                    </div>
                    <div className="form-group col-md-2">
                      <label>Data de Nascimento</label>
                      <input
                        name="datadeNascimento"
                        className="form-control"
                        type="text"
                        value={this.state.datadeNascimento}
                        readOnly="true"
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group col-md-12">
                      <label>Mãe/Genitora</label>
                      <input
                        type="text"
                        className="form-control"
                        name="nome_mae_genitora"
                        value={this.state.nome_mae_genitora}
                        readOnly="true"
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group col-md-2">
                      <label>Mês</label>
                      <input
                        name="mes"
                        type="text"
                        className="form-control"
                        value={this.state.mes}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="form-group col-md-2">
                      <label>Data</label>
                      <DatePicker
                        className="form-control"
                        name="data_abertura"
                        selected={this.state.data_abertura}
                        onChange={this.mudarData}/>
                    </div>
                    <div className="form-group col-md-2">
                      <label>Harário</label>
                      <input
                        name="horario"
                        type="text"
                        className="form-control"
                        value={this.state.horario}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="form-group col-md-2">
                      <label>CT</label>
                      <select
                        name="CT"
                        className="form-control"
                        onChange={this.mudarCT}>
                        
                        <option value="1">Selecionar</option>
                        <option value="CT1">CT1</option>
                        <option value="CT2">CT2</option>
                      </select>
                    </div>

                    <div className="form-group col-md-4">
                      <label>Bairro</label>
                      <select
                        name="bairro"
                        className="form-control"
                        onChange={this.handleChange}>
                        <option value="1">Selecionar</option>
                        {rows.map(this.renderRow)}
                      </select>
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group col-md-8">
                      <label>Quem Compareceu</label>
                      <input
                        type="text"
                        className="form-control"
                        name="quem_compareceu"
                        value={this.state.quem_compareceu}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="form-group col-md-4">
                      <label>Grau de Parentesco</label>
                      <select 
                        name="grau_parentesco"
                        className="form-control"
                        onChange={this.handleChange}>
                        <option value="1">Selecionar</option>
                        <option value="Mãe">Mãe</option>
                        <option value="Pai">Pai</option>
                        <option value="Avó">Avó</option>
                        <option value="Avô">Avô</option>
                        <option value="Tia">Tia</option>
                        <option value="Tio">Tio</option>
                        <option value="Madrasta">Madrasta</option>
                        <option value="Padrasto">Padrasto</option>
                      </select>
                    </div>
                  </div>

                  <div className="row  justify-content-end" id="actions">
                    <div className="col-md-1 col-4">
                        <button className="btn btn-danger">Cancelar</button>
                    </div>
                    <div className="col-md-1 col-4">
                        <button type="submit" className="btn btn-success" onClick={e => this.handleSubmit(e)}>Cadastrar</button>
                    </div>
                  </div>

                  <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>
                        Deseja Cadastrar Criança / Adolescente?
                    </ModalHeader>
                
                    <ModalFooter>
                        <div className="modal-footer">
                            <button onClick={this.toggle} className="btn btn-danger btn-lg">Não</button>
                            <button onClick={this.saveAtendimento} className="btn btn-success btn-lg">Sim</button>
                        </div>
                    </ModalFooter>
                  </Modal>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Cadastro2;
