import { Spin } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkSession } from '../../service/action/AuthenticateAction';
import { fetchPositionRequire } from '../../service/action/project/ProjectAction';
import RequireModal from './RequireModal';

class PositionRequire extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            positionRequire: [],
            isLoading: true,
        }
    }

    componentDidMount = () => {
        this.props.fetchPositionRequire(this.props.projectID)
    }

    componentDidUpdate = (prevProp) => {
        if (prevProp.positionRequire !== this.props.positionRequire) {
            this.setState({ isLoading: false })
        }
    }

    onShowRequireDetail = () => {
        this.setState({ visible: true })
    }

    showPosition = (list) => {
        var result = null
        result = list.map((value, index) => {
            return (
                <RequireModal key={index} value={value} index={index} />
            )
        })
        return result
    }

    handleOk = (e) => {
        this.setState({
            visible: false,
        });
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }

    render() {
        var { positionRequire } = this.props
        return (
            <React.Fragment>
                {this.state.isLoading ?
                    <div className='row justify-content-center'>
                        <Spin className='text-center' size="large" />
                    </div> :
                    <div class="card mb-4">
                        <div class="card-header">
                            <i class="fas fa-table mr-1"></i>
                    Position
                    </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                    <thead>
                                        <tr>
                                            <th width={50} className='text-center'>No</th>
                                            <th>Position</th>
                                            <th width={180}>Candidates Needs</th>
                                            <th width={145}>Employee Miss</th>
                                            <th width={190} className='text-center'>Hard Skill Requirements</th>
                                            <th width={190} className='text-center'>Language Requirements</th>
                                            <th width={190} className='text-center'>Soft Skill Requirements</th>
                                            <th width={120} className='text-center'>Date Create</th>
                                            <th width={100} className='text-center'>Status</th>
                                            <th width={100}></th>
                                        </tr>
                                    </thead>
                                    {positionRequire.length > 0 ?
                                        <tbody>
                                            {this.showPosition(positionRequire)}
                                        </tbody>
                                        : ''}
                                </table>
                            </div>
                            {positionRequire.length > 0 ? '' :
                                <div className='row justify-content-center' style={{ width: 'auto' }} >
                                    <h4 style={{ fontStyle: 'italic', color: 'gray' }} >No data</h4>
                                </div>
                            }
                        </div>
                    </div>
                }
            </React.Fragment>
        );
    }
}

const mapStateToProp = state => {
    return {
        positionRequire: state.PositionRequireReducer
    }
}

const mapDispatchToProp = dispatch => {
    return {
        fetchPositionRequire: projectID => {
            dispatch(fetchPositionRequire(projectID))
        },
        checkSession: () => {
            dispatch(checkSession())
        }
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(PositionRequire);