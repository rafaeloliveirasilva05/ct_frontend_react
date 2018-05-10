import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'

import NavBar from './NavBar'

class TabelaCriancas extends Component {
    constructor(props) {
        super(props);

        this.state = {
            criancas: this.props.location.vet,
            toCadastro2: false,
            dadosCrinaca:'',            
            atendimento: {}
        }
        this.clicaAqMano = this.clicaAqMano.bind(this);
    }

    clicaAqMano(event) {
        this.setState({
            toCadastro2: true,
            dadosCrinaca: event
        })
    }

    renderRow(resul) {
       
        return (
            <tr key={resul[2]} onClick={() => resul[0].clicaAqMano(resul[1])}>
                <td>{resul[1].nome_crianca}</td>
                <td>{resul[1].nome_mae}</td>
                <td>{resul[1].endereco}</td>
            </tr>
        )
    }

    render() {

        let rows = []
        const context = this
        const valor = this.state.criancas

        for (let i = 0; i < valor.length; i++) {

            var conteudo = this.state.criancas[i]
            var qts = i
            var resul = [context, conteudo, qts]
            rows.push(resul)
        }

        if (this.state.toCadastro2 === true) {

            return < Redirect to={{
                pathname: '/Cadastro2',
                vet: this.state.dadosCrinaca
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
                                                    <th>Nome da mãe</th>
                                                    <th>Endereço</th>
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


export default TabelaCriancas;