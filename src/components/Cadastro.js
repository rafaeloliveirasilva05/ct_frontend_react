import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
import NavBar from './NavBar'
import {Redirect } from 'react-router-dom'
import DatePicker from "react-datepicker"
import moment from "moment"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'


class Cadastro extends Component {

    constructor(props) {
        super(props)

        this.state = {
        
            data_abertura: moment(),
            numero_ficha: '',
            nome_crianca: '',
            data_nascimento:moment(),
            nome_pai: '',
            rg_pai: '',
            nome_mae: '',
            rg_mae: '',
            endereco: '',
            complemento: '',
            numero_casa: '',
            ponto_referencia: '',
            cidade: '',
            telefone: '',
            escola: '',
            ano_serie: '',
            periodo: '',
          
            toCadastro2: false,
            usuario:'',
            modal: false,
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.mudarData = this.mudarData.bind(this)
        this.saveAtendimento = this.saveAtendimento.bind(this)
        this.toggle = this.toggle.bind(this)
    }
    mudarData = data => {
        this.setState({data_nascimento:data})
    }

    mudarDataAbertura = data => {
        this.setState({data_abertura:data})
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    saveAtendimento(){
        const user = {
            data_abertura: moment(this.state.data_abertura._d).format("l"),
            nome_crianca: this.state.nome_crianca.toLowerCase(),
            numero_ficha: this.state.numero_ficha,
            data_nascimento: moment(this.state.data_nascimento._d).format("l"),
            nome_pai: this.state.nome_pai,
            rg_pai: this.state.rg_pai,
            nome_mae: this.state.nome_mae,
            rg_mae: this.state.rg_mae,
            endereco: this.state.endereco,
            complemento: this.state.complemento,
            numero_casa: this.state.numero_casa,
            ponto_referencia: this.state.ponto_referencia,
            cidade: this.state.cidade,
            telefone: this.state.telefone,
            escola: this.state.escola,
            ano_serie: this.state.ano_serie,
            periodo: this.state.periodo,
        }

        axios
            .post(`https://peaceful-peak-43227.herokuapp.com/cadastrarCrianca`, { user })
            .then(res => {
                this.setState({usuario:res.data.category})
                this.setState({toCadastro2:true})
        })
    }

    toggle() {
        this.setState({modal: !this.state.modal})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.setState({modal:true})
    }

    render() {
         //Depois q o cadastro/atendimento é feito, mudar para tela home
        if (this.state.toCadastro2 === true) {
            const vet = this.state.usuario
            return < Redirect to={{
                pathname: '/Cadastro2',
                vet
            }} push={true} />
        }
        return (
            <div>
                <NavBar />
                <div className="py-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h1 className="text-center">Novo Cadastro</h1>
                                <h1 className="text-center">Criança / Adolescente</h1>
                                <hr />
                                <form className="">
                                    <div className="row">
                                        <div className="form-group col-md-2">
                                            <label>Data Abertura</label>
                                            <DatePicker
                                                selected={this.state.data_abertura}
                                                onChange={this.handleChange}
                                                peekNextMonth
                                                showMonthDropdown
                                                showYearDropdown
                                                dropdownMode="select"
                                                className="form-control"
                                                name="data_abertura"/>
                                        </div>
                                        <div className="form-group col-md-2">
                                            <label>Nº da Ficha</label>
                                            <input
                                                name="numero_ficha"
                                                type="text"
                                                className="form-control"
                                                value={this.state.numero_ficha}
                                                onChange={this.handleChange} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-md-9">
                                            <label>Nome da Criança/Adolescente</label>
                                            <input
                                                name="nome_crianca"
                                                type="text"
                                                className="form-control"
                                                value={this.state.nome_crianca}
                                                onChange={this.handleChange} />
                                        </div>
                                        <div className="form-group col-md-3">
                                            <label>Data Nascimento</label>
                                            <DatePicker
                                                selected={this.state.data_nascimento}
                                                onChange={this.mudarData}
                                                peekNextMonth
                                                showMonthDropdown
                                                showYearDropdown
                                                dropdownMode="select"
                                                className="form-control"
                                                name="data_nascimento"/>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="form-group col-md-8">
                                            <label>Nome do Pai</label>
                                            <input
                                                name="nome_pai"
                                                type="text"
                                                className="form-control"
                                                value={this.state.nome_pai}
                                                onChange={this.handleChange} />
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label htmlFor="RG">RG</label>
                                            <input
                                                name="rg_pai"
                                                type="text"
                                                className="form-control"
                                                value={this.state.rg_pai}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-md-8">
                                            <label>Nome da Mãe</label>
                                            <input
                                                name="nome_mae"
                                                type="text"
                                                className="form-control"
                                                value={this.state.nome_mae}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label htmlFor="RG">RG</label>
                                            <input
                                                name="rg_mae"
                                                type="text"
                                                className="form-control"
                                                value={this.state.rg_mae}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-md-12">
                                            <label>Endereço</label>
                                            <input
                                                name="endereco"
                                                type="text"
                                                className="form-control"
                                                value={this.state.endereco}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-md-10">
                                            <label>Complemento</label>
                                            <input
                                                name="complemento"
                                                type="text"
                                                className="form-control"
                                                value={this.state.complemento}
                                                onChange={this.handleChange}/>
                                        </div>
                                        <div className="form-group col-md-2">
                                            <label>Número</label>
                                            <input
                                                name="numero_casa"
                                                type="text"
                                                className="form-control"
                                                value={this.state.numero_casa}
                                                onChange={this.handleChange}/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-md-12">
                                            <label>Ponto de Referência</label>
                                            <input
                                                name="ponto_referencia"
                                                type="text"
                                                className="form-control"
                                                value={this.state.ponto_referencia}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-md-12">
                                            <label>Cidade</label>
                                            <input
                                                name="cidade"
                                                type="text"
                                                className="form-control"
                                                value={this.state.cidade}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-md-8">
                                            <label>telefone</label>
                                            <input
                                                name="telefone"
                                                type="text"
                                                className="form-control"
                                                value={this.state.telefone}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-md-12">
                                            <label>Escola</label>
                                            <input
                                                name="escola"
                                                type="text"
                                                className="form-control"
                                                value={this.state.escola}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-md-6">
                                            <label>Ano/Série</label>
                                            <input
                                                name="ano_serie"
                                                type="text"
                                                className="form-control"
                                                value={this.state.ano_serie}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label>Período</label>
                                            <input
                                                name="periodo"
                                                type="text"
                                                className="form-control"
                                                value={this.state.periodo}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="row  justify-content-end" id="actions">
                                        <div className="col-md-1 col-4">
                                            <button type="submit" className="btn btn-danger" >Cancelar</button>
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
        )
    }
}

export default Cadastro