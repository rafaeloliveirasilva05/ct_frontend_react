import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class NavBar extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-md navbar-dark bg-primary">
                    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
                        aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <Link className="navbar-brand" to="/">
                        <span className="menu-collapsed">Conselho Tutelar</span>
                    </Link>

                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">

                            <li className="nav-item dropdown d-sm-block d-md-none">
                                <a className="nav-link dropdown-toggle" href="#" id="smallerscreenmenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Menu</a>
                                <div className="dropdown-menu" aria-labelledby="smallerscreenmenu">
                                    <a className="dropdown-item" href="#">Dashboard</a>
                                    <a className="dropdown-item" href="#">Profile</a>
                                    <a className="dropdown-item" href="#">Tasks</a>
                                    <a className="dropdown-item" href="#">Etc ...</a>
                                </div>
                            </li>

                        </ul>

                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="modal" href="#modalLogout">
                                    <i className="fa fa-fw fa-sign-out"></i>Logout
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div >
        );
    }
}

export default NavBar;
