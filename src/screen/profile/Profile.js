import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PositionTable from '../../component/profile/PositionTable';
import ProfileTable from '../../component/profile/ProfileTable';
import { checkSession } from '../../service/action/AuthenticateAction';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            select: 1
        }
    }

    componentDidMount = () => {
        this.props.checkSession()
    }

    onClickMenu = (value) => {
        this.setState({ select: value })
    }

    render() {
        var {empID} = this.props
        return (
            <div>
                <div className='row'>
                    <div className='col-auto' style={{ marginTop: 30 }}>
                        <ul className='ul'>
                            <li className='li'>
                                <a className={this.state.select === 1 ? 'active' : ''} onClick={() => this.onClickMenu(1)}>Profile</a>
                            </li>
                            <li className='li' >
                                <a className={this.state.select === 2 ? 'active' : ''} onClick={() => this.onClickMenu(2)} >Position</a>
                            </li>
                        </ul>
                    </div>

                    <div className='col'>
                        {this.state.select === 1 ?
                            <ProfileTable empID={empID} />
                            :
                            <PositionTable empID={empID} />
                        }                        
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProp = (dispatch) => {
    return {
        checkSession: () => {
            dispatch(checkSession())
        }
    }
}

export default connect(null, mapDispatchToProp)(Profile);