import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

import NavBar from './NavBar'

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            qts_atendimento_pendente: '',
            atendimento_pendente: []
        }
    }

    hideActiveModal = () => {
        const modal = document.getElementsByClassName('modal show')[0];
        const fade = document.getElementsByClassName('modal-backdrop show');
        modal.className = modal.className.replace('show', '');
        fade.className = fade.className.replace('show', '');
    }

    componentDidMount() {
        axios.get(`https://peaceful-peak-43227.herokuapp.com/buscarAtendimento2NaoRalizado`)
            .then(res => {
                this.setState({
                    qts_atendimento_pendente: res.data.atendimento.length,
                    atendimento_pendente: res.data.atendimento
                })
            })
    }

    render() {
        return (
            <div>
                <NavBar />

                <div className="row" id="body-row">

                    <div id="sidebar-container" className="sidebar-expanded d-none d-md-block">
                        <div className="list-group">

                            <a href="#submenu1" data-toggle="collapse" aria-expanded="false" className="bg-dark list-group-item list-group-item-action flex-column align-items-start"
                                title="Atendimento">
                                <div className="d-flex w-100 justify-content-start align-items-center">
                                    <i className="fa fa-fw fa-dashboard mr-3"></i>
                                    <span className="menu-collapsed">Atendimento</span>
                                    <span className="submenu-icon ml-auto"></span>
                                </div>
                            </a>

                            <div id='submenu1' className="collapse sidebar-submenu">
                                <Link to="/Pesquisar" className="list-group-item list-group-item-action bg-dark text-white">
                                    <span >Administrativo</span>
                                </Link>
                                <a to="/About" className="list-group-item list-group-item-action bg-dark text-white">
                                    <span className="menu-collapsed">Visita</span>
                                </a>
                            </div>

                            <Link to="/Cadastro" className="bg-dark list-group-item list-group-item-action">
                                <div className="d-flex w-100 justify-content-start align-items-center">
                                    <span className="fa fa-plus-circle mr-3"></span>
                                    <span className="menu-collapsed">Cadastro</span>
                                </div>
                            </Link>

                            <a href="#" className="bg-dark list-group-item list-group-item-action">
                                <div className="d-flex w-100 justify-content-start align-items-center">
                                    <i className="fa fa-bell mr-3"></i>
                                    <span className="menu-collapsed">Notificação (Denúncia)</span>
                                </div>
                            </a>

                            <a href="#" className="bg-dark list-group-item list-group-item-action">
                                <div className="d-flex w-100 justify-content-start align-items-center">
                                    <span className="fa fa-file mr-3"></span>
                                    <span className="menu-collapsed">Requisição</span>
                                </div>
                            </a>

                            <a href="#" className="bg-dark list-group-item list-group-item-action">
                                <div className="d-flex w-100 justify-content-start align-items-center">
                                    <span className="fa fa-bullhorn mr-3"></span>
                                    <span className="menu-collapsed">Convocação</span>
                                </div>
                            </a>


                            <a href="#" className="bg-dark list-group-item list-group-item-action">
                                <div className="d-flex w-100 justify-content-start align-items-center">
                                    <span className="fa fa-newspaper-o mr-3"></span>
                                    <span className="menu-collapsed">Oficicio</span>
                                </div>
                            </a>

                            <a href="pages/reuniao.html" className="bg-dark list-group-item list-group-item-action">
                                <div className="d-flex w-100 justify-content-start align-items-center">
                                    <span className="fa fa-users mr-3"></span>
                                    <span className="menu-collapsed">Reunião</span>
                                </div>
                            </a>

                            <a href="#" className="bg-dark list-group-item list-group-item-action">
                                <div className="d-flex w-100 justify-content-start align-items-center">
                                    <span className="fa fa-fw fa-area-chart mr-3"></span>
                                    <span className="menu-collapsed">Relatório</span>
                                </div>
                            </a>

                            <a href="#" className="bg-dark list-group-item list-group-item-action">
                                <div className="d-flex w-100 justify-content-start align-items-center">
                                    <span className="fa fa-envelope-o fa-fw mr-3"></span>
                                    <span className="menu-collapsed">Messages</span>
                                    <span className="badge badge-pill badge-primary ml-2">5</span>
                                </div>
                            </a>


                            <li className="list-group-item sidebar-separator menu-collapsed"></li>


                            <a href="#" data-toggle="sidebar-colapse" className="bg-dark list-group-item list-group-item-action d-flex align-items-center">
                                <div className="d-flex w-100 justify-content-start align-items-center">
                                    <span id="collapse-icon" className="fa fa-2x mr-3"></span>
                                    <span id="collapse-text" className="menu-collapsed">Collapse</span>
                                </div>
                            </a>


                            <li className="list-group-item logo-separator d-flex justify-content-center">
                                <img src='https://v4-alpha.getbootstrap.com/assets/brand/bootstrap-solid.svg' width="30" height="30" />
                            </li>
                        </div>
                    </div>

                    <div className="col">

                        <div className="card my-5">
                            <h4 className="card-header">Requirements</h4>
                            <div className="card-body">
                                <ul>
                                    <li>JQuery</li>
                                    <li>Bootstrap 4 beta-3</li>
                                </ul>
                            </div>
                        </div>

                        <div className="container-fluid">

                            <div className="row">

                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-primary">
                                        <div className="card-body">
                                            <div className="card-body-icon">
                                                <i className="fa fa-fw fa-comments"></i>
                                            </div>
                                            <h1>{this.state.qts_atendimento_pendente}</h1>
                                            <h4>Atendimentos Pendentes!</h4>
                                        </div>

                                        <Link to={{
                                            pathname: '/Tabela',
                                            params: this.state.atendimento_pendente
                                        }}
                                            className="card-footer text-white clearfix small z-1"
                                            href="pages/tabela.html">

                                            <span className="float-left">Ver Detalhes</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>

                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-danger o-hidden h-100">
                                        <div className="card-body">
                                            <div className="card-body-icon">
                                                <i className="fa fa-fw fa-support"></i>
                                            </div>
                                            <h1>26</h1>
                                            <h4>Denúncias Pendentes!</h4>
                                        </div>
                                        <a className="card-footer text-white clearfix small z-1" href="pages/tabelaMedidas.html">
                                            <span className="float-left">Ver Detalhes</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </a>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="modal fade" id="modalLogout" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Pronto para sair?</h5>
                                        <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">×</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">Selecione "Logout" abaixo se você estiver pronto para encerrar sua sessão atual.</div>
                                    <div className="modal-footer">
                                        <a className="btn btn-secondary text-white" data-dismiss="modal">Cancel</a>
                                        <Link className="btn btn-primary" to="/Login" onClick={this.hideActiveModal}>Logout</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default Home