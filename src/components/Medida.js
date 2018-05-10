import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios';

import NavBar from './NavBar'

class Medida extends Component {

    constructor(props){
        super(props);
        console.log(this.props.location.params)
        this.state={
            id_atendimento: this.props.location.params,

            numero_ficha_medida:'',
            data_abertura_atendimento:'',
            numero_ficha_atendimento:'',
            nome_sobrenome:"",
            pais_responsáveis:"",
            bairro:"",
            
            artigo_eca:'',
            medida_artigo:'',
            direito:'',
            agente_violador:'',
            identificacao_situação:'',
            servico_encaminhado:'',
            descricao:'',
            procedimento:'',
            conselheiro:'',
            destino_ficha:'',

            medidas_101:[
                {
                    "artigo":"101",
                    "numero_media":"1",
                    "medida":"I-Termo de responsabilidade",
                    "identificacao_situacao": [
                        "Vaga em Projeto (ONG)", 
                        "Drogadição dos Pais ou Responsáveis",
                        "Vaga em Projeto (ONG)", 
                    ]
                },
                {
                    "artigo":"101",
                    "numero_media":"2",
                    "medida":"II-Orientação e acompanhamento temporário"
                },
                {
                    "artigo":"101",
                    "numero_media":"3",
                    "medida":"III-Matrícula em estabelicimento de ensino"
                },
                {
                    "artigo":"101",
                    "numero_media":"4",
                    "medida":"IV-Inclusão programa comunitário ou oficial"
                },
                {
                    "artigo":"101",
                    "numero_media":"5",
                    "medida":"V-Requisição de tratamento médico, psicológico ou psiquiátrico"
                },
                {
                    "artigo":"101",
                    "numero_media":"6",
                    "medida":"VI-Inclusão em programa oficial ou comunitário de auxílio, orientação e tratamento a alcoólatras e toxicômanos"
                },
                {
                    "artigo":"101",
                    "numero_media":"7",
                    "medida":"VII-Acolhimento institucional"
                }
            ],

            medidas_129:[
                {
                    "artigo":"129",
                    "numero_media":"1",
                    "medida":"I-Encaminhamento a serviços e programas oficiais ou comunitários"
                },
                {
                    "artigo":"129",
                    "numero_media":"2",
                    "medida":"II-Inclusão em programa oficial ou comunitário de auxílio, orientação e tratamento a alcoólatras e toxicômanos"
                },
                {
                    "artigo":"129",
                    "numero_media":"3",
                    "medida":"III-Encaminhamento a tratamento psicológico ou psiquiátrico"
                },
                {
                    "artigo":"129",
                    "numero_media":"4",
                    "medida":"IV-Encaminhamento a cursos ou programas de orientação"
                },
                {
                    "artigo":"129",
                    "numero_media":"5",
                    "medida":"VObrigação de matricular o filho ou pupilo e acompanhar sua frequência e aproveitamento escolar"
                },
                {
                    "artigo":"129",
                    "numero_media":"6",
                    "medida":"VI-Obrigação de encaminhar a criança ou adolescente a tratamento especializado"
                },
                {
                    "artigo":"129",
                    "numero_media":"7",
                    "medida":"VII-Advertência"
                },
            ],

            artigo:'',

            grupo_artigos:[],

            grupo_id_situacao:[],
            modal: false,
            toHome:false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.saveAtendimento = this.saveAtendimento.bind(this);
        this.toggle = this.toggle.bind(this);
    }   

    //fechar Modal
    toggle() {
        this.setState({modal: !this.state.modal})
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    saveAtendimento(){
        
        const medida = {
            id_atendimento: this.state.id_atendimento,
            artigo_eca: this.state.artigo_eca,
            medida_artigo: this.state.medida_artigo,
            direito: this.state.direito,
            agente_violador: this.state.agente_violador,
            identificacao_situação: this.state.identificacao_situação,
            servico_encaminhado: this.state.servico_encaminhado,
            descricao: this.state.descricao,
            procedimento: this.state.procedimento,
            conselheiro: this.state.conselheiro,
            destino_ficha: this.state.destino_ficha,
        }

        axios
            .post(`https://peaceful-peak-43227.herokuapp.com/cadastrarMedida`, { medida })
            .then(res => {
                this.setState({toHome:true})
                console.log(res.data)
        });
    }

    handleSubmit = (e) => {
        console.log("teste")
        e.preventDefault()
        this.setState({modal:true})
    }

    criarMedida = (e)=>{
        e.preventDefault()

        const medida = {
            id_atendimento: this.state.id_atendimento,
            artigo_eca: this.state.artigo_eca,
            medida_artigo: this.state.medida_artigo,
            direito: this.state.direito,
            agente_violador: this.state.agente_violador,
            identificacao_situação: this.state.identificacao_situação,
            servico_encaminhado: this.state.servico_encaminhado,
            descricao: this.state.descricao,
            procedimento: this.state.procedimento,
            conselheiro: this.state.conselheiro,
            destino_ficha: this.state.destino_ficha,
        }

        axios
            .post(`https://peaceful-peak-43227.herokuapp.com/cadastrarMedida`, { medida })
            .then(res => {
                this.setState({destino_ficha:""})
        });
    }

    achar_medida = event => {

        const artigo_eca = event.target.value
        console.log(artigo_eca)
        var grupo_artigos = []
        
        if(artigo_eca == 101){
            grupo_artigos  = this.state.medidas_101
            this.setState({grupo_artigos, artigo_eca })
        }else if(artigo_eca == 129){
            grupo_artigos  = this.state.medidas_129
            this.setState({grupo_artigos, artigo_eca})
        }else{
            grupo_artigos  = []
            this.setState({grupo_artigos, artigo_eca})
        }
    }

    achar_id_situacao = event =>{

        var grupo_id_situacao = []
        var medida_artigo = event.target.value
        this.setState({medida_artigo})
        
        for(var i=0;i<this.state.grupo_artigos.length;i++){
            if(event.target.value == this.state.grupo_artigos[i].medida){
                grupo_id_situacao = this.state.grupo_artigos[i].identificacao_situacao
                this.setState({grupo_id_situacao})
            }
        }
    }

    renderRow(row) {
        return (
          <option key={row[0]} value={row[1]}>
            {row[1]}
          </option>
        );
    }

    renderRow2(row) {
        return (
            <option key={row[0]} value={row[1]}>
            {row[1]}
            </option>
        );
    }

    render() {
        let rows = [];
        let rows_id_situacao = []

        for (let i = 0; i < this.state.grupo_artigos.length; i++) {
            var lin = this.state.grupo_artigos[i].medida;
            var resul = [i, lin];
            rows.push(resul);
        }

        for (let i = 0; i < this.state.grupo_id_situacao.length; i++) {
            var lin = this.state.grupo_id_situacao[i]
            var resul = [i, lin];
            rows_id_situacao.push(resul);
        }

        if (this.state.toHome === true) {
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
                            <h1 className="text-center">Medidas ECA&nbsp;</h1>
                            <hr/>
                            <form className="">


                            <div className="row">
                                <div className="form-group col-md-4">
                                    <label htmlFor="name">Data de Abertura</label>
                                    <input type="text" className="form-control"/> 
                                </div>
                                <div className="form-group col-md-2">
                                    <label htmlFor="name">Ficha CT</label>
                                    <input type="text" className="form-control"/> 
                                </div>
                                <div className="form-group col-md-2">
                                    <label htmlFor="campo3">Mês</label>
                                    <input type="text" className="form-control"/> 
                                </div>
                            </div>


                            <div className="row">
                                <div className="form-group col-md-12">
                                    <label>Nome da Criança/Adolescente</label>
                                    <input
                                        name="nome_sobrenome"
                                        className="form-control"
                                        type="text"
                                        value={this.state.nome_sobrenome}
                                        readOnly="true"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-md-12">
                                    <label>Pais / Responsáveis</label>
                                    <input
                                        name="pais_responsáveis"
                                        type="text"
                                        className="form-control"
                                        value={this.state.pais_responsáveis}
                                        readOnly="true"/>
                                </div>
                            </div>


                            <div className="row">
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

                            <h1 className="text-center"> Medidas Aplicadas</h1>
                            <hr/>

                            <div className="row">

                                <div className="form-group col-md-4">
                                    <label htmlFor="exampleFormControlSelect1">Artigo do ECA</label>
                                    <select 
                                        className="form-control" 
                                        name="artigo_eca"
                                        onChange={this.achar_medida}>
                                        <option value="1">Selecionar</option>
                                        <option value="101">101</option>
                                        <option value="129">129</option>
                                        <option value="Atender e Aconselhar">Atender e Aconselhar</option>
                                    </select>
                                </div>

                                <div className="form-group col-md-8">
                                    <label htmlFor="exampleFormControlSelect1">Medida Aplicada</label>
                                    <select 
                                        className="form-control" 
                                        name="medida_artigo"
                                        onChange={this.achar_id_situacao}>
                                        <option value="1">Selecionar</option>
                                        {rows.map(this.renderRow)}
                                    </select>
                                </div>
                            </div>

                            <div className="row">
                                <div className="form-group col-md-4">
                                    <label htmlFor="name">Direitos</label>
                                    <select 
                                        className="form-control" 
                                        name="direito"
                                        onChange={this.handleChange}>
                                        <option value="">Selecionar</option>
                                        <option value="Violados">Violados</option>
                                        <option value="Ameaçados">Ameaçados</option>
                                    </select>
                                </div>

                                <div className="form-group col-md-8">
                                    <label htmlFor="name">Agente Violador</label>
                                    <select 
                                        className="form-control" 
                                        name="agente_violador"
                                        onChange={this.handleChange}>
                                        <option value="1">Selecionar</option>
                                        <option value="Pais e Responsaveis">Pais e Responsaveis</option>
                                        <option value="Em Razão de Sua Conduta">Em Razão de Sua Conduta</option>
                                        <option value="Sociedade ou Estado">Sociedade ou Estado</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="name">Identificição da Situação</label>
                                        <select 
                                            className="form-control" 
                                            name="identificacao_situação"
                                            onChange={this.handleChange}>
                                            <option value="1">Selecionar</option>
                                            {rows_id_situacao.map(this.renderRow2)}
                                        </select>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="name">Serviço Encaminhado</label>
                                    <select 
                                        className="form-control" 
                                        name="servico_encaminhado"
                                        onChange={this.handleChange}>
                                        <option value="1">Selecionar</option>
                                        <option value="Laprev">Laprev</option>
                                        <option value="Sem Necessidade de Encaminhamento">Sem Necessidade de Encaminhamento</option>
                                        <option value="Nosso Lar">Nosso Lar</option>
                                        <option value="Estrela da Manhã">Estrela da Manhã</option>
                                        <option value="Unidade Escolar proxima a residencia">Unidade Escolar proxima a residencia</option>
                                        <option value="DDM">DDM</option>
                                        <option value="CAPS I J">CAPS I J</option>
                                        <option value="CRAS">CRAS</option>
                                        <option value="CREAS">CREAS</option>
                                        <option value="Diretoria de Ensino">Diretoria de Ensino</option>
                                        <option value="UBS - Saúde Fisica">UBS - Saúde Fisica</option>
                                        <option value="Unidade Escolar proxima a residencia">Unidade Escolar proxima a residencia</option>
                                        <option value="CRAS">CRAS</option>
                                        <option value="CRAS">CRAS</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Descrição</label>
                                <textarea 
                                    name="descricao"
                                    className="form-control" 
                                    value={this.state.descricao}
                                    onChange={this.handleChange}/>
                            </div>

                            <div className="row">
                                <div className="form-group col-md-4">
                                    <label htmlFor="name">Procedimento</label>
                                    <input
                                        name="procedimento"
                                        type="text"
                                        className="form-control"
                                        value={this.state.procedimento}
                                        onChange={this.handleChange} />
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="name">Conselheiro (a)</label>
                                    <input
                                        name="conselheiro"
                                        type="text"
                                        className="form-control"
                                        value={this.state.conselheiro}
                                        onChange={this.handleChange} /> 
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="name">Destino da ficha</label>
                                    <input
                                        name="destino_ficha"
                                        type="text"
                                        className="form-control"
                                        value={this.state.destino_ficha}
                                        onChange={this.handleChange} /> 
                                </div>
                            </div>
                            


                            <div className="row  justify-content-end" id="actions">
                                <div className="col-md-1 col-4">
                                    <button type="submit" className="btn btn-danger">Cancelar</button>
                                </div>
                                <div className="col-md-3 col-4">
                                    <button type="submit" className="btn btn-success" onClick={this.criarMedida}>Salvar e Aplicar Proxima Medida</button>
                                </div>
                                <div className="col-md-1 col-4">
                                    <button type="submit" className="btn btn-success" onClick={e => this.handleSubmit(e)}>Salvar</button>
                                </div>
                            </div>


                            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                                <ModalHeader toggle={this.toggle}>
                                    Deseja Salvar Medida?
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
            </div >
        );
    }
}

export default Medida 
