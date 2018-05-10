import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import Cadastro from './Cadastro'

class Modal extends Component {

    hideActiveModal = () => {
        const modal = document.getElementsByClassName('modal show')[0];
        const fade = document.getElementsByClassName('modal-backdrop show');
        modal.className = modal.className.replace('show', '');
        fade.className = fade.className.replace('show', '');
    };
    render() {
        return (

            <div className="modal" id="modalCadastrar" >
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">Criança / Adolescente não cadastrado.</h4>
                            <button type="button" className="close" data-dismiss="modal">×</button>
                        </div>

                        <div className="modal-body">
                            Deseja cadastrar?
                        </div>

                        <div className="modal-footer">
                            <Link className="btn btn-lg mx-1 btn-info" to="/Cadastro" onClick={this.hideActiveModal}>Sim</Link>
                            <Link className="btn btn-lg mx-1 btn-info" to="/Cadastro">Registro encontrado</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Modal;
