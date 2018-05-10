import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios';
import moment from "moment";
import DatePicker from "react-datepicker";

import NavBar from './NavBar'

class Pesquisar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nome_crianca: '',
            data_nascimento: moment(),
            modal: false,
            usuario: '',
            loginButton: false,
            toTabelaCrianca: false,
            path: '',

            resultadoCriancas:[]
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.mudarData = this.mudarData.bind(this);
        this.toggle = this.toggle.bind(this);
    }

     //fechar Modal
    toggle() {
        this.setState({modal: !this.state.modal})
    }

    mudarData = data => {
        console.log(moment(data._d).format("l"))
        this.setState({
            data_nascimento: data
        });
    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault();

        const user = {
            nome_crianca: this.state.nome_crianca.toLowerCase(),
            data_nascimento: moment(this.state.data_nascimento._d).format("l"),
        }

        axios.post(`https://peaceful-peak-43227.herokuapp.com/procurarNome`, { user })
            .then(res => {
                const resultado = res.data.crianca
                const [nome_crianca, data_nascimento] = resultado
               
                if (resultado.length === 0) {
                    this.setState({
                        modal: !this.state.modal,
                        path: '/Cadatro'
                    });

                } else if (resultado.length === 1) {
                    this.setState({
                        path: '/Cadastro2',
                        usuario: resultado,
                        loginButton: true
                    });
                } else {
                    this.setState({
                        path: '/TabelaCrianca',
                        usuario: resultado,
                        toTabelaCrianca: true
                    });
                }
            })
    }


    render() {

        if (this.state.loginButton === true) {
            const vet = this.state.usuario[0];
            return < Redirect to={{
                pathname: this.state.path,
                vet
            }} push={true} />
        }

        if (this.state.toTabelaCrianca === true) {
            
            const vet = this.state.usuario;
            return < Redirect to={{
                pathname: this.state.path,
                vet
            }} push={true} />
        }

        return (
            <div>
                <NavBar />
                <div className="container">
                    <div className="py-5 col align-self-center">
                        <div className="container">
                            <h1 className="text-center">Pesquisar por criança / adolescente</h1>
                            <hr />
                            <form onSubmit={this.handleSubmit}>
                                <div className="row">
                                    <div className="form-group col-md-8">
                                        <label>Nome:</label>
                                        <input
                                            name="nome_crianca"
                                            type="text"
                                            className="form-control"
                                            value={this.state.name}
                                            onChange={this.handleChange} />
                                    </div>

                                    <div className="form-group col-md-4">
                                        <label>Data Nascimento</label>
                                        <DatePicker
                                        className="form-control"
                                        name="data_nascimento"
                                        peekNextMonth
                                        showMonthDropdown
                                        showYearDropdown
                                        selected={this.state.data_nascimento}
                                        onChange={this.mudarData}/>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-success">Pesquisar
                                </button>

                                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                                    <ModalHeader toggle={this.toggle}>
                                      Criança / Adolescente não cadastrado
                                    </ModalHeader>
                                    <ModalBody>
                                        <h4>Deseja cadastrar?</h4>
                                    </ModalBody>
                                    <ModalFooter>
                                        <div className="modal-footer">
                                            <Button className="btn btn-danger btn-lg" onClick={this.toggle}>Não</Button>
                                            <Link className="btn btn-success btn-lg" to="/Cadastro">Sim</Link>
                                        </div>
                                    </ModalFooter>
                                </Modal>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default Pesquisar 
