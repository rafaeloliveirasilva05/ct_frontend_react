import React, { Component } from "react";
import moment from "moment";
import axios from "axios";
import DatePicker from "react-datepicker";
import { Link, Redirect } from 'react-router-dom'
import NavBar from "./NavBar";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class Cadastro3 extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.location.params)
    this.state = {
      //dados vindo do atendimentos pendentes
      id_atendimento: this.props.location.params.id_atendimento,
      id_crianca: this.props.location.params.id_crianca,
      nome_crianca: this.props.location.params.nome_crianca,
      data_nascimento: moment(this.props.location.params.data_nascimento).format("l"),
      nome_mae_genitora: this.props.location.params.nome_mae,
      CT: this.props.location.params.CT,
      bairro: this.props.location.params.bairro,
      
      //dados preechidos nesta tela (cadastro3)
      servico:'',
      como_chegou_ct:'',
      conselheiro_atendimento:"",
      destino_ficha:'',
      data_preenchimento: moment(),
      p2_atendimento:'',

      toMedida:false,
      modal: false,
      mudarInput: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.mudarData = this.mudarData.bind(this);
    this.closeInput = this.closeInput.bind(this);
    this.saveAtendimento = this.saveAtendimento.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  //mostrar botão input (Conselheiro(a) do Atendimento) e retiar botão select como mesmo nome
  showInput = e =>{
    if(e.target.name == "conselheiro_atendimento" && e.target.value == "Outro" ){
      this.setState({mudarInput:true})
    }
    else{
      this.setState({[e.target.name]: e.target.value})
    }
  }

  saveAtendimento(){
    const atendimento_p2 = {
      id_atendimento: this.state.id_atendimento,
      id_crianca:this.state.id_crianca,
      servico: this.state.servico,
      como_chegou_ct: this.state.como_chegou_ct,
      conselheiro_atendimento: this.state.conselheiro_atendimento,
      destino_ficha: this.state.destino_ficha,
      data_preenchimento: moment(this.state.data_preenchimento._d).format("l"),  
      p2_atendimento: 1
    }
    console.log(atendimento_p2)
   
    axios
      .put(`https://peaceful-peak-43227.herokuapp.com/cadastrarCrianca/atendimento2`, { atendimento_p2 })
      .then(res => {
        this.setState({toMedida:true})
      });
  }

  //fechar Modal
  toggle() {
    this.setState({modal: !this.state.modal})
  }

  mudarData = data => {
    this.setState({data_preenchimento: data})
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({modal:true})
  }

  //fechar botão input (Conselheiro(a) do Atendimento) e colocar no lugar botão select
  closeInput = event =>{
    this.setState({mudarInput:false})
  }

  render() {
    if (this.state.toMedida === true) {
      return < Redirect to={{
          pathname: '/Medida',
          params: this.state.id_atendimento
      }} push={true} />
    }

    return (
      <div>
        <NavBar />
        <div className="py-5">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 className="text-center">Parte 2 do atendimento</h1>
                <h1 className="text-center">(conselheiro)</h1>
                <hr />
                <form onSubmit={this.handleSubmit}>
                  <div className="row">
                    <div className="form-group col-md-10">
                      <label>Data de Abertura</label>
                      <input
                        type="text"
                        className="form-control"
                        name="customer['name']"/>
                    </div>
                    <div className="form-group col-md-2">
                      <label>Nº da Ficha </label>
                      <input
                        type="text"
                        className="form-control"
                        name="customer['name']"
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group col-md-10">
                      <label>Nome da Criança/Adolescente</label>
                      <input
                        name="nome_crianca"
                        className="form-control"
                        type="text"
                        value={this.state.nome_crianca}
                        readOnly="true"
                      />
                    </div>
                    <div className="form-group col-md-2">
                      <label>Data de Nascimento</label>
                      <input
                        name="data_nascimento"
                        className="form-control"
                        type="text"
                        value={this.state.data_nascimento}
                        readOnly="true"
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group col-md-12">
                      <label>Mãe/Genitora</label>
                      <input
                        name="nome_mae_genitora"
                        className="form-control"
                        type="text"
                        value={this.state.nome_mae_genitora}
                        readOnly="true"
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group col-md-2">
                      <label>CT</label>
                      <input
                        name="CT"
                        className="form-control"
                        type="text"
                        value={this.state.CT}
                        readOnly="true"
                      />
                    </div>
                    <div className="form-group col-md-4">
                      <label>Bairro</label>
                      <input
                        name="bairro"
                        type="text"
                        className="form-control"
                        value={this.state.bairro}
                        readOnly="true"/>
                    </div>
                  </div>

                  <div className="row">
                    
                    <div className="form-group col-md-4">
                      <label>Serviço</label>
                      <select
                        name="servico"
                        className="form-control"
                        onChange={this.handleChange}>
                        <option value="1">Selecionar</option>
                        <option value="Cadastro Novo">Cadastro Novo</option>
                        <option value="Cadastro Existente">Cadastro Existente</option>
                      </select>
                    </div>

                    <div className="form-group col-md-4">
                      <label>Como chegou ao CT</label>
                      <select
                        name="como_chegou_ct"
                        className="form-control"
                        onChange={this.handleChange}>
                        <option value="1">Selecionar</option>
                        <option value="Plantão Noturno">Plantão Noturno</option>
                        <option value="Denúncia">Denúncia</option>
                        <option value="Convocação">Convocação</option>
                        <option value="Espontaneo">Espontaneo</option>
                        <option value="CAIC">CAIC</option>
                        <option value="CAPS AD">CAPS AD</option>
                        <option value="CAPS Menta">CAPS Mental</option>
                        <option value="Cartório">Cartório</option>
                        <option value="Casa Abrigo">Casa Abrigo</option>
                        <option value="Casa de Acolhimento">Casa de Acolhimento</option>
                        <option value="CEJUSC">CEJUSC</option>
                        <option value="CEME">CEME</option>
                        <option value="CRAS">CRAS</option>
                        <option value="CREAS">CREAS</option>
                        <option value="DDM">DDM</option>
                        <option value="Defensoria Pública Educação">Defensoria Pública Educação</option>
                        <option value="Defensoria Pública - orientação Juridica">Defensoria Pública - orientação Juridica</option>
                        <option value="Diretoria de Ensino">Diretoria de Ensino</option>
                        <option value="Escola Municipal">Escola Municipal</option>
                        <option value="Escola Estadual">Escola Estadual</option>
                        <option value="Farmacia Popular">Farmacia Popular</option>
                        <option value="Hospital Universitário">Hospital Universitário</option>
                        <option value="IML">IML</option>
                        <option value="Maternidade">Maternidade</option>
                        <option value="ONG">ONG</option>
                        <option value="Plantão Policial">Plantão Policial</option>
                        <option value="PROHAB">PROHAB</option>
                        <option value="Santa Casa">Santa Casa</option>
                        <option value="Secretaria da Educação">Secretaria da Educação</option>
                        <option value="Secretária da Saúd">Secretária da Saúde</option>
                        <option value="Secretária de Assitencia Social">Secretária de Assitencia Social</option>
                        <option value="UBS - Saúde Fisica">UBS - Saúde Fisica</option>
                        <option value="UBS - Saúde Mental">UBS - Saúde Mental</option>
                        <option value="UFSCAR">UFSCAR</option>
                        <option value="UNICEP">UNICEP</option>
                        <option value="UNIMED">UNIMED</option>
                        <option value="UPA">UPA</option>
                        <option value="USF">USF</option>
                        <option value="Vigilância Sanitaria">Vigilância Sanitaria</option>
                        <option value="Forum">Forum </option>
                        <option value="GM">GM</option>
                        <option value="PM">PM</option>
                        <option value="Outro CT">Outro CT</option>
                      </select>
                    </div>

                      {!this.state.mudarInput &&
                        <div className="form-group col-md-4">
                          <label>Conselheiro(a) do Atendimento</label>
                          <select
                            name="conselheiro_atendimento"
                            className="form-control"
                            onChange={this.showInput}>
                            <option value="1">Selecionar</option>
                            <option value="Telma">Telma</option>
                            <option value="Carina">Carina</option>
                            <option value="Giovani">Giovani</option>
                            <option value="Amanda">Amanda</option>
                            <option value="Madalena">Madalena</option>
                            <option value="Mariana">Mariana</option>
                            <option value="Cicera">Cicera</option>
                            <option value="Cristiane">Cristiane</option>
                            <option value="Francisco">Francisco</option>
                            <option value="Marlene">Marlene</option>
                            <option value="Leandro Dantas">Leandro Dantas</option>
                            <option value="Janaina">Janaina</option>
                            <option value="Outro">Outro</option>
                          </select>
                        </div>}


                      {this.state.mudarInput &&
                        <div className="form-group col-md-4">
                          <label>Conselheiro(a) do Atendimento</label>
                          <div className="input-group ">
                            <input
                              name="conselheiro_atendimento"
                              type="text"
                              className="form-control"
                              value={this.state.conselheiro_atendimento}
                              onChange={this.handleChange} />

                            <div className="input-group-append">
                              <button className="btn btn-outline-danger" onClick={this.closeInput} type="button">X</button>
                            </div>
                          </div>
                        </div>}
                  </div>

                  <div className="row">
                    <div className="form-group col-md-4">
                      <label>Destino da Ficha</label>
                      <select
                        name="destino_ficha"
                        className="form-control"
                        onChange={this.handleChange}>
                        <option value="1">Selecionar</option>
                        <option value="Telma">Telma</option>
                        <option value="Carina">Carina</option>
                        <option value="Giovani">Giovani</option>
                        <option value="Amanda">Amanda</option>
                        <option value="Madalena">Madalena</option>
                        <option value="Mariana">Mariana</option>
                        <option value="Cicera">Cicera</option>
                        <option value="Cristiane">Cristiane</option>
                        <option value="Francisco">Francisco</option>
                        <option value="Marlene">Marlene</option>
                        <option value="Leandro Dantas">Leandro Dantas</option>
                        <option value="Janaina">Janaina</option>
                        <option value="Arquivo">Arquivo</option>
                        <option value="Acompanhamento">Acompanhamento</option>
                      </select>
                    </div>
                    
                    <div className="form-group col-md-2">
                      <label>Data</label>
                      <DatePicker
                        className="form-control"
                        name="data_preenchimento"
                        selected={this.state.data_preenchimento}
                        onChange={this.mudarData}/>
                    </div>
                  </div>

                  <div className="row  justify-content-end" id="actions">
                     <div className="col-md-1 col-4">
                      <button type="submit" className="btn btn-danger">Cancelar</button>
                    </div>
                    <div className="col-md-1 col-4">
                      <button type="submit" className="btn btn-success">Salvar</button>
                    </div>
                  </div>


                  <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>
                        Deseja Cadastrar o Atendimento?
                    </ModalHeader>
                   
                    <ModalFooter>
                        <div className="modal-footer">
                            <button onClick={this.toggle}  className="btn btn-danger btn-lg">Não</button>
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

export default Cadastro3;
