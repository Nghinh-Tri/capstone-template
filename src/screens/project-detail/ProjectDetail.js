import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import CandidateTable from "../../components/candidate-table/CandidateTable";
import * as Action from "../../store/store-action/ProjectAction";
import { showSpan, showStatus } from '../../util';

class ProjectDetail extends Component {

    componentDidMount = () => {
        var { match } = this.props
        this.props.fetchProjectDetail(match.params.id)
    }

    render() {
        var { project } = this.props

        // const showPosition = () => {

        // }

        return (
            <div className="card mb-80">
                <div className="card-body">
                    <div className="form-group">
                        {/* Project detail */}
                        <div className="row">
                            <div className="col-7">
                                {/* Project Name */}
                                <div className="row">
                                    <div className="mr-20-ml-20">
                                        <label className="bmd-label-floating">
                                            <h4 className="font-weight-bold">Project Name : </h4>
                                        </label>
                                    </div>
                                    <div className="mr-20">
                                        <label className="bmd-label-floating">
                                            <h4 className="font-weight-bold">{project.projectName}</h4>
                                        </label>
                                    </div>
                                </div>
                                {/* Date Begin - Date End Est */}
                                <div className="row">
                                    {/* Date Begin */}
                                    <div className="mr-20-ml-20">
                                        <label className="bmd-label-floating">
                                            <h4 className="font-weight-bold">Date Begin : </h4>
                                        </label>
                                    </div>
                                    <div className="mr-40">
                                        <label className="bmd-label-floating">
                                            <h4 className="font-weight-bold">{project.dateBegin}</h4>
                                        </label>
                                    </div>
                                    {/* Date End Est */}
                                    <div className="mr-20-ml-20 mr-50">
                                        <label className="bmd-label-floating">
                                            <h4 className="font-weight-bold">Date End Estimate :</h4>
                                        </label>
                                    </div>
                                    <div className="mr-40">
                                        <label className="bmd-label-floating">
                                            <h4 className="font-weight-bold">{project.dateEstimatedEnd}</h4>
                                        </label>
                                    </div>
                                </div>
                                {/* Description */}
                                <div className="row">
                                    <div className="mr-20-ml-20">
                                        <label className="bmd-label-floating">
                                            <h4 className="font-weight-bold">Desciption : </h4>
                                        </label>
                                    </div>
                                    <div className="mr-40">
                                        <label className="bmd-label-floating">
                                            <h4 className="font-weight-bold">{project.description}</h4>
                                        </label>
                                    </div>
                                </div>
                                {/* Status */}
                                <div className="row">
                                    <div className="mr-20-ml-20">
                                        <label className="bmd-label-floating">
                                            <h4 className="font-weight-bold">Status : </h4>
                                        </label>
                                    </div>
                                    <div className="mr-70">
                                        <h4 className="card-title">
                                            <span className={`badge badge-pill ${showSpan(project.status)} span`}>
                                                {showStatus(project.status)}
                                            </span>
                                        </h4>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <NavLink to={`/project/${project.projectID}/edit`}>
                                    <button type="button" className="btn btn-primary pull-right">Update</button>
                                </NavLink>
                            </div>
                        </div>

                        {/* Position candiate */}
                        <div className="row">
                            <div className="card mb-50">
                                <div className="card-header">
                                    <div className="row">
                                        <div className="col">
                                            <h5 className="font-weight-bold">Position</h5>
                                        </div>
                                        <div className="col pull-right">
                                            <NavLink to="/project/suggest-candidate">
                                                <button className="btn btn-primary pull-right "> Add more candidates</button>
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <CandidateTable />
                                </div>
                            </div>
                        </div>

                        {/* Add more position */}
                        <div className="row">
                            <div className="col pull-right">
                                <NavLink to="/project/create-position">
                                    <button className="btn btn-primary pull-right "> Add more position</button>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

const mapStateToProp = state => {
    return {
        project: state.ProjectFetchReducer
    }
}

const mapDispatchToProp = dispatch => {
    return {
        fetchProjectDetail: projectID => {
            dispatch(Action.fetchProjectDetail(projectID))
        }
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(ProjectDetail);