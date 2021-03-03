import React, { Component } from 'react';
import '../login/login.css'
import { connect } from 'react-redux';
import { userActions } from '../../store/store-action/UserAction';


class Login extends Component {
    constructor(props) {
        super(props);
        this.props.logout();
        this.state = {
            email: '',
            password: '',
            submitted: false
        };
    }


    // static getDerivedStateFromProps(nextProps, prevState) {
    //     if (nextProps.loggingIn !== prevState.loggingIn) {
    //         return { loggingIn: nextProps.loggingIn };
    //     }
    //     return null;
    // }

    // componentDidUpdate(prevProps, prevState) {
    //     if (prevProps.loggingIn !== this.props.loggingIn) {
    //         console.log('aa', this.props.loggingIn)
    //         if (this.props.loggingIn.loggedIn) {
    //             this.props.history.push('/')
    //         }
    //     }
    // }
    componentDidMount() {
        // console.log(localStorage.getItem('jwt') !== null)
        console.log(this.props.loggingIn.loggingIn)
        //     if (localStorage.getItem('jwt'))
        //         this.props.history.push('/')
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
        }//ko nhan props logginIn
    }

    render() {
        const { loggingIn } = this.props;
        const { email, password, submitted } = this.state;
        return (
            <div className="container px-4 py-5 mx-auto">
                <div className="card card0">
                    <div className="d-flex flex-lg-row flex-column-reverse">
                        <div className="card card1">
                            <div className="row justify-content-center my-auto">
                                <div className="col-md-8 col-10 my-5">
                                    <div className="row justify-content-center px-3 mb-3"> <img id="logo" src="https://i.imgur.com/PSXxjNY.png" /> </div>
                                    <h3 className="mb-5 text-center heading">Hello</h3>
                                    <h6 className="msg-info">Please login to your account</h6>

                                    <form onSubmit={this.handleSubmit} >
                                        <fieldset className="form-group"> <label className="form-control-label text-muted">Username</label>
                                            <input type="text"
                                                id="email" name="email"
                                                placeholder="Phone no or email id"
                                                className="form-control"
                                                onChange={this.handleChange}
                                            />
                                            {submitted && !email &&
                                                <div className="help-block">Email is required</div>
                                            }
                                        </fieldset>
                                        <fieldset className="form-group">
                                            <label className="form-control-label text-muted">Password</label>
                                            <input type="password"
                                                id="password" name="password"
                                                placeholder="Password"
                                                className="form-control"
                                                onChange={this.handleChange}
                                            />
                                            {/* block password validate have errorr */}
                                            {submitted && !password &&
                                                <div className="">Password is required</div>
                                            }
                                        </fieldset>
                                        <div className="row justify-content-center my-3 px-3">
                                            <button className="btn-block btn-color">Login to ESMS</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="card card2">
                            <div className="my-auto mx-md-5 px-md-5 right">
                                <h3 className="text-white">We are more than just a company</h3> <small className="text-white">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


function mapState(state) {
    // const { loggingIn } = state.authentication;
    return { loggingIn: state.authentication };
}

const actionCreators = {
    login: userActions.login,
    logout: userActions.logout
}
export default connect(mapState, actionCreators)(Login);