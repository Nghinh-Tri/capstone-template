import React, { Component } from 'react';
import { connect } from 'react-redux';
import PositionTable from '../../component/profile/PositionTable';
import ProfileTable from '../../component/profile/ProfileTable';
import { checkSession } from '../../service/action/AuthenticateAction';
import { history } from '../../service/helper/History';

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

    onBack = () => {
        history.goBack()
    }

    onClickMenu = (value) => {
        this.setState({ select: value })
    }

    render() {
        var result = ''
        var { empID } = this.props
        if (typeof empID === 'undefined')
            result = this.props.match.params.id
        else
            result = empID
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
                            <ProfileTable empID={result} />
                            :
                            <PositionTable empID={result} />
                        }
                    </div>
                </div>
                {typeof this.props.match !== 'undefined' ?
                    <div className='row pull-right' style={{ marginRight: 20, marginTop: -20 }}>
                        <button className="btn btn-primary " onClick={this.onBack}>Back</button>
                    </div>
                    : ''}
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