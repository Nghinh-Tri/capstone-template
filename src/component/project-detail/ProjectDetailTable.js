import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { showSpan, showStatus } from '../../service/util/util';
import * as Action from "../../service/action/ProjectAction";

class ProjectDetailTable extends Component {

    setUpdateButton = (project) => {
        if (project.status === 1)
        return (<div className="col">
            <NavLink to={`/project/detail/${project.projectID}/edit`}>
                <button type="button" className="btn btn-primary pull-right">Update</button>
            </NavLink>
        </div>)
        return null;
    }

    setFinishButton = (status) => {
        if (status === 1)
        return (<div className="pull-right">
            <button className="btn btn-primary" onClick={this.onChangeStatusToFinish}> Finish</button>
        </div>)
        return null
    }

    onChangeStatusToFinish = () => {
        var { match } = this.props
        console.log(match)
        this.props.changeStatusToFinish(match.params.id)
    }

    render() {
        var { project } = this.props
        return (
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
                                <div className="col-auto" style={{marginLeft:5}}>
                                    <label className="bmd-label-floating">
                                        <h4 className="font-weight-bold">Date Begin : </h4>
                                    </label>
                                </div>
                                <div className="col-auto">
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
                                <div className="">
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
                    </div>
                    <div className='row pull-right'>
                        <div className='col'>
                            {this.setUpdateButton(project)}
                        </div>
                        <div className='col'>
                            {this.setFinishButton(project.status)}
                        </div>
                    </div>
                </div>

            </div>

        );
    }
}

const mapDispatchToProp = dispatch => {
    return {
        changeStatusToFinish: projectID => {
            dispatch(Action.changeStatusToFinish(projectID))
        }
    }
}
export default connect(null, mapDispatchToProp)(ProjectDetailTable);