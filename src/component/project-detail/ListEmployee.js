import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Action from '../../service/action/ListEmployeeAction'
import ListEmployeeContent from './ListEmployeeContent';
import { addMorePosition } from '../../service/action/PositionAction';
import { Spin, Tabs } from 'antd';
const TabPane = Tabs.TabPane;


class ListEmployee extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            positionList: [],
            positionSelect: 0,
            count: 0,
            isLoading: true,
            posIndex: 0
        }
    }

    componentDidMount = () => {
        this.props.fetchListEmployee(this.props.projectID, 1)
    }

    componentDidUpdate = (prevProp) => {
        if (prevProp.listEmployee !== this.props.listEmployee) {
            var { listEmployee } = this.props
            var temp = []
            listEmployee.forEach(element => {
                var pos = { value: element.posID }
                temp.push(pos)
            });
            this.setState({ isLoading: false, positionList: temp })
        }
    }

    showEmployee = (list) => {
        if (list.length > 0) {
            return (<ListEmployeeContent item={list[this.state.posIndex]}
                positionSelect={this.state.positionSelect}
                projectID={this.props.projectID}
                projectType={this.props.projectType}
                projectField={this.props.projectField}
                projectStatus={this.props.status}
                projectName={this.props.projectName}
            />)
        } else {
            return (<div className='row justify-content-center'>
                <h4 style={{ fontStyle: 'italic', color: 'gray' }} >No data</h4>
            </div>)
        }
    }

    onSelected = (value) => {
        this.setState({ posIndex: value })
    }

    onAddMorePosition = () => {
        localStorage.setItem('projectId', this.props.projectID)
        localStorage.setItem('projectType', this.props.projectType)
        localStorage.setItem('projectField', this.props.projectField)
        console.log(this.state.positionList)
        this.props.addMorePosition(this.state.positionList)
    }

    showPositionTabs = () => {
        var { listEmployee } = this.props;
        var result = listEmployee.map((item, index) => {
            return (<TabPane tab={item.posName} key={index}></TabPane>)
        });
        return result;
    };

    render() {
        var { listEmployee } = this.props
        return (
            <React.Fragment>
                <div class="card mb-4">
                    <div class="card-header">
                        <Tabs defaultActiveKey='0' onChange={this.onSelected}>
                            {this.showPositionTabs()}
                        </Tabs>
                    </div>
                    {this.state.isLoading ?
                        <div className='row justify-content-center'>
                            <Spin className='text-center' size="large" />
                        </div> :
                        <>
                            <div class="card-body">
                                {listEmployee.length > 0 ? this.showEmployee(listEmployee)
                                    : <div className='row justify-content-center' style={{ width: 'auto' }} >
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