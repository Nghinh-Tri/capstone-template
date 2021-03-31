import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { showSpan, showStatus } from '../../service/util/util';
import * as Action from "../../service/action/ProjectAction";
import moment from 'moment';
import { Input } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

class ProjectDetailTable extends Component {

    setUpdateButton = (project) => {
        if (project.status === 2)
            return (<div className="col">
                <NavLink to={`/project/detail/${project.projectID}/edit`}>
                    <button type="button" className="btn btn-primary pull-right">Update</button>
                </NavLink>
            </div>)
        return null;
    }

    setFinishButton = (project) => {
        if (project.status === 2)
            return (<div className="pull-right">
                <button className="btn btn-primary" onClick={this.onChangeStatusToFinish}> Finish</button>
            </div>)
        return null
    }

    onChangeStatusToFinish = () => {
        var { match } = this.props
        this.props.changeStatusToFinish(match.params.id)
    }

    render() {
        var { project } = this.props
        var result = {}
        if (typeof project !== 'undefined')
            result = project
            console.log(result)
        return (
            <div className="card">
                <div className="card-header card-header-primary">
                    <h4 className="card-title">Project Detail</h4>
                </div>
                <div className="card-body">
                    <div className="form-group">
                        {/* Project detail */}
                        <div className="row">
                            {/* Project Name */}
                            <div className="col-auto">
                                <label className="bmd-label">
                                    <h4 className="font-weight-bold">Project Name : </h4>
                                </label>
                            </div>
                            <div className="col-auto" style={{ marginTop: -15, width: 500 }}>
                                <Input className="form-group" value={result.projectName} disabled="true" style={{ color: "black", cursor: 'default', fontWeight: 700, fontSize: 18, border: 'none', backgroundColor: 'white' }} />
                            </div>

                            {/* Project Status */}
                            <div className="col-auto">
                                <label className="bmd-label">
                                    <h4 className="font-weight-bold">Project Status : </h4>
                                </label>
                            </div>
                            <div className="col" style={{ marginTop: -5, width: 250, fontWeight: 600, fontSize: 20 }}>
                                <span className={`badge badge-pill ${showSpan(project.status)} span`}>
                                    {showStatus(project.status)}
                                </span>
                            </div>
                        </div>
                        <div className='row'>
                            {/* Project Type */}
                            <div className="col-auto">
                                <label className="bmd-label">
                                    <h4 className="font-weight-bold">Project Type : </h4>
                                </label>
                            </div>
                            <div className="col" style={{ marginLeft: 10, marginTop: -15, width: 250 }}>
                                <Input className="form-group" value={result.typeName} disabled="true" style={{ color: "black", cursor: 'default', fontWeight: 700, fontSize: 18, border: 'none', backgroundColor: 'white' }} />
                            </div>
                        </div>

                        {/* Date */}
                        <div className="row">
                            {/* Date begin */}
                            <div className="col-auto">
                                <label className="bmd-label">
                                    <h4 className="font-weight-bold">Date Begin : </h4>
                                </label>
                            </div>
                            <div className="col-auto" style={{ marginLeft: 20, marginTop: -15, width: 250, fontWeight: 600, fontSize: 20 }}>
                                <Input className="form-group" value={moment(result.dateBegin).format('DD-MM-YYYY')} disabled="true" style={{ color: "black", cursor: 'default', fontWeight: 700, fontSize: 18, border: 'none', backgroundColor: 'white' }} />
                            </div>
                            <div className="col-auto" style={{ marginLeft: 68 }} >
                                <label className="bmd-label">
                                    <h4 className="font-weight-bold">Estimated End : </h4>
                                </label>
                            </div>
                            <div className="col-auto" style={{ marginTop: -15, width: 250, fontWeight: 600, fontSize: 20 }}>
                                <Input className="form-group" value={moment(result.dateEstimatedEnd).format('DD-MM-YYYY')} disabled="true" style={{ color: "black", cursor: 'default', fontWeight: 700, fontSize: 18, border: 'none', backgroundColor: 'white' }} />
                            </div>

                        </div>

                        {/* Description*/}
                        <div className="row">
                            <div className="col-auto">
                                <label className="bmd-label">
                                    <h4 className="font-weight-bold">Description : </h4>
                                </label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col form-group" style={{ marginTop: -8, width: 250, fontWeight: 600, fontSize: 20 }}>
                                <TextArea className="form-group" disabled="true" rows="10" defaultValue={result.description} style={{ color: "black", cursor: 'default' }} />
                            </div>
                        </div>

                        {/* Stakeholder*/}
                        <div className="row">
                            <div className="col-auto">
                                <label className="bmd-label">
                                    <h4 className="font-weight-bold">Stakeholder : </h4>
                                </label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col form-group" style={{ marginTop: -8, width: 250, fontWeight: 600, fontSize: 20 }}>
                                <TextArea className="form-group" disabled="true" rows="10" defaultValue={result.skateholder} style={{ color: "black", cursor: 'default' }} />
                            </div>
                        </div>


                        <div className="row">
                            <div className='row pull-right'>
                                <div className='col'>
                                    {this.setUpdateButton(project)}
                                </div>
                                <div className='col'>
                                    {this.setFinishButton(project)}
                                </div>
                            </div>
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