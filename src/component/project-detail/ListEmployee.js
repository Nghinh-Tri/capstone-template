import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Action from '../../service/action/ListEmployeeAction'
import SelectBar from "../select-search/SelectBar";
import ListEmployeeContent from './ListEmployeeContent';
import { addMoreCandidate, addMorePosition } from '../../service/action/PositionAction';
import { history } from '../../service/helper/History';
import { Spin } from 'antd';


class ListEmployee extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            positionList: [],
            positionSelect: 0,
            count: 0,
            isLoading: true
        }
    }

    componentDidMount = () => {
        this.props.fetchListEmployee(this.props.projectID, 1)
    }

    componentDidUpdate = (prevProp) => {
        if (prevProp.listEmployee !== this.props.listEmployee) {
            var { listEmployee } = this.props
            var { positionSelect, count } = this.state
            var temp = []
            listEmployee.forEach(element => {
                var position = { label: element.posName, value: element.posID }
                if (count === 0) {
                    count++
                    positionSelect = element.posID
                }
                temp.push(position)
            });
            console.log('temp', temp)
            this.setState({ positionList: temp, positionSelect: positionSelect, count: count, isLoading: false })
        }
    }

    // componentWillReceiveProps = () => {
    //     var { listEmployee } = this.props
    //     var { positionSelect, count } = this.state
    //     var temp = []
    //     listEmployee.forEach(element => {
    //         var position = { label: element.posName, value: element.posID }
    //         if (count === 0) {
    //             count++
    //             positionSelect = element.posID
    //         }
    //         temp.push(position)
    //     });
    //     console.log('temp', temp)
    //     this.setState({ positionList: temp, positionSelect: positionSelect, count: count, isLoading: false })
    // }

    showEmployee = (list) => {
        var result = null
        if (list.length > 0) {
            result = list.map((item, index) => {
                if (this.state.positionSelect === 0) {
                    return (<ListEmployeeContent key={index} item={item} />)
                } else if (this.state.positionSelect === item.posID) {
                    return (<ListEmployeeContent key={index} item={item} />)
                }
            })
        } else {
            return (<div className='row justify-content-center'>
                <h4 style={{ fontStyle: 'italic', color: 'gray' }} >No data</h4>
            </div>)
        }
        return result
    }

    onSelectPos = (value) => {
        this.setState({ positionSelect: value })
    }

    onAddMorePosition = () => {
        localStorage.setItem('projectId', this.props.projectID)
        localStorage.setItem('projectType', this.props.projectType)
        localStorage.setItem('projectField', this.props.projectField)
        this.props.addMorePosition(this.state.positionList)
    }

    onAddMoreCandidates = () => {
        localStorage.setItem('projectId', this.props.projectID)
        localStorage.setItem('projectType', this.props.projectType)
        localStorage.setItem('projectField', this.props.projectField)
        this.props.addMoreCandidate(this.state.positionSelect)
    }

    render() {
        var { listEmployee } = this.props
        var postList = []
        if (this.state.positionList.length >= 1)
            postList = this.state.positionList
        return (
            <React.Fragment>
                <div class="card mb-4">
                    <div class="card-header">
                        <i class="fas fa-table mr-1"></i>List Employee</div>
                    {this.state.isLoading ?
                        <div className='row justify-content-center'>
                            <Spin className='text-center' size="large" />
                        </div> :
                        <>
                            <form class="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0" >
                                <div className='col-auto' style={{ marginTop: 20 }}>
                                    <SelectBar type='special'
                                        name='positionSelect'
                                        list={postList}
                                        value={this.state.positionSelect}
                                        onSelectPos={this.onSelectPos} />
                                </div>

                            </form>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                        <thead>
                                            <th className="font-weight-bold">Name</th>
                                            <th className="font-weight-bold">Position</th>
                                            <th className="font-weight-bold">Email</th>
                                            <th className="font-weight-bold">Phone</th>
                                            <th width={120} className="font-weight-bold text-center">Date In</th>
                                        </thead>
                                        {listEmployee.length > 0 ?
                                            <tbody>
                                                {this.showEmployee(listEmployee)}
                                            </tbody>
                                            : ''}
                                    </table>
                                </div>
                                {listEmployee.length > 0 ? '' : <div className='row justify-content-center' style={{ width: 'auto' }} >
                                    <h4 style={{ fontStyle: 'italic', color: 'gray' }} >No data</h4>
                                </div>}
                                <button type="submit" className="btn btn-primary pull-right" onClick={this.onAddMoreCandidates}  >
                                    Add More Candidates
                        </button>
                                <button type="submit" className="btn btn-primary pull-right" onClick={this.onSelectCandidatesAgain}  >
                                    Select Candidates Again
                        </button>
                            </div>
                        </>}
                </div>
                {this.state.isLoading ? '' :
                    <button type="submit" className="btn btn-primary pull-right" onClick={this.onAddMorePosition} >
                        Add More Position
                    </button>
                }
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        listEmployee: state.ListEmployeeReducer
    }
}

const mapDispatchToProp = dispatch => {
    return {
        fetchListEmployee: (projectID, page) => {
            dispatch(Action.fetchListEmployee(projectID, page))
        },
        addMoreCandidate: (posID) => {
            dispatch(addMoreCandidate(posID))
        },
        addMorePosition: (position) => {
            dispatch(addMorePosition(position))
        }
        // suggestAgain: (projectID) => {
        //     dispatch(sendNotificate('aaa', projectID))
        // }
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(ListEmployee);