import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Action from '../../service/action/LoginAction'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            submitted: false
        };
    }

    handleChange = (e) => {
        var { name, value } = e.target;
        this.setState({ [name]: value })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ submitted: true });
        const { email, password } = this.state;
        if (email && password) {
            this.props.login(email, password);
        }
    }

    render() {
        const { email, password, submitted } = this.state;

        return (
            <div id="layoutAuthentication">
                <div id="layoutAuthentication_content">
                    <main>
                        <div class="container">
                            <div class="row justify-content-center">
                                <div class="col-lg-5">
                                    <div class="card shadow-lg border-0 rounded-lg mt-5">
                                        <div class="card-header"><h3 class="text-center font-weight-light my-4">Login to Web Service</h3></div>
                                        <div class="card-body">
                                            <form onSubmit={this.handleSubmit}>
                                                <div class="form-group">
                                                    <label class="small mb-1" for="inputEmailAddress">Email</label>
                                                    <input class="form-control py-4" type="text"
                                                        id="email" name="email"
                                                        className="form-control"
                                                        onChange={this.handleChange} />
                                                    {submitted && !email &&
                                                        <div className="help-block">Email is required</div>
                                                    }
                                                </div>
                                                <div class="form-group">
                                                    <label class="small mb-1" for="inputPassword">Password</label>
                                                    <input class="form-control py-4" type="password"
                                                        id="password" name="password"
                                                        className="form-control"
                                                        onChange={this.handleChange} />
                                                    {/* block password validate have errorr */}
                                                    {submitted && !password &&
                                                        <div className="">Password is required</div>
                                                    }
                                                </div>
                                                <div class="form-group d-flex align-items-center justify-content-between mt-4 mb-0">
                                                    <button type='submit' class="btn btn-primary">Login</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        );
    }
}

const mapState = (state) => {
    return { loggingIn: state.authentication };
}

const mapDispatchToProp = dispatch => {
    return {
        login: (username, password) => {
            dispatch(Action.login(username, password))
        }
    }
}

export default connect(mapState, mapDispatchToProp)(Login);