import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'

import NavBar from './NavBar'

class Tabela extends Component {
    constructor(props) {
        super(props);
        this.state = {
            atendimento_pendente: this.props.location.params,
            mostarTelaCastro3: false,
            atendimento:''
        }
        this.clicaAqMano = this.clicaAqMano.bind(this);
    }

    clicaAqMano(event) {
        this.setState({
            mostarTelaCastro3: true,
            atendimento: event
        })
    }

    renderRow(resul) {
        return (
            <tr key={resul[2]} onClick={() => resul[0].clicaAqMano(resul[1])}>
                <td>{resul[1].nome_crianca}</td>
                <td>{resul[1].CT}</td>
            </tr>
        )
    }

    render() {

        let rows = []
        const context = this
        const valor = this.state.atendimento_pendente

        for (let i = 0; i < valor.length; i++) {

            var conteudo = this.state.atendimento_pendente[i]
            var qts = i
            var resul = [context, conteudo, qts]
            rows.push(resul)
        }

        if (this.state.mostarTelaCastro3 === true) {
            return < Redirect to={{
                pathname: '/Cadastro3',
                params: this.state.atendimento
            }} push={true} />
        }

        return (
            <div>
                <NavBar />
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-10 py-5">
                            <div className="card mb-3">

                                <div className="card-header">
                                    <i className="fa fa-table"></i> Atendimentos Pendentes</div>
                                <div className="card-body">

                                    <div className="table-responsive">
                                        <table className="table table-bordered table-hover" id="dataTable" width="100%" cellSpacing="0">
                                            <thead>
                                                <tr >
                                                    <th>Nome</th>
                                                    <th>CT</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {rows.map(this.renderRow)}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Tabela;