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
                    return (<ListEmployeeContent key={index} item={item}
                        positionSelect={this.state.positionSelect}
                        projectID={this.props.projectID}
                        projectType={this.props.projectType}
                        projectField={this.props.projectField}
                        projectStatus={this.props.status}
                        projectName={this.props.projectName}
                    />)
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

    render() {
        var { listEmployee } = this.props
        console.log(listEmployee)
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
                                {this.showEmployee(listEmployee)}
                                {listEmployee.length > 0 ? '' : <div className='row justify-content-center' style={{ width: 'auto' }} >
                                    <h4 style={{ fontStyle: 'italic', color: 'gray' }} >No data</h4>
                                </div>}

                            </div>
                        </>}
                </div>
                {this.state.isLoading || this.props.status === 4 ? '' :
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
        addMorePosition: (position) => {
            dispatch(addMorePosition(position))
        }
        // suggestAgain: (projectID) => {
        //     dispatch(sendNotificate('aaa', projectID))
        // }
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(ListEmployee);