import React, { Component } from 'react';

import { Link } from 'react-router-dom'


class Login extends Component {
    render() {
        return (


            <div id="con">
                <div className="card card-login mx-auto mt-5">
                    <div className="card-header">Login</div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label for="exampleInputEmail1">Email address</label>
                                <input className="form-control" id="exampleInputEmail1" type="email" aria-describedby="emailHelp" placeholder="Enter email" />
                            </div>
                            <div className="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input className="form-control" id="exampleInputPassword1" type="password" placeholder="Password" />
                            </div>
                            <div className="form-group">
                                <div className="form-check">
                                    <label className="form-check-label">
                                        <input className="form-check-input" type="checkbox" /> Remember Password</label>
                                </div>
                            </div>
                            <Link className="btn btn-primary btn-block" to="/">Login</Link>
                        </form>
                        <div className="text-center">
                            <a className="d-block small mt-3" href="register.html">Register an Account</a>
                            <a className="d-block small" href="forgot-password.html">Forgot Password?</a>
                        </div>
                    </div>
                </div>
            </div>


        );
    }
}

export default Login;
