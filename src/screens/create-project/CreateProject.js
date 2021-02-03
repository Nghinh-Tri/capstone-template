import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as Action from "../../store/store-action/ProjectAction";

class CreateProject extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            dateBegin: '',
            dateEndEst: '',
            description: '',
            stakeholder: ''
        }
    }

    onHandle = (event) => {
        var target = event.target;
        var name = target.name
        var value = target.value
        this.setState({
            [name]: value
        })
    }

    componentDidMount = () => {
        var { project } = this.props
        if (project.hasOwnProperty('name')) {
            this.setState({
                name: project.name,
                dateBegin: project.dateBegin,
                dateEndEst: project.dateEndEst,
                description: project.description,
                stakeholder: project.stakeholder
            })
        }
    }

    onSave = (event) => {
        event.preventDefault()
        var { name, dateBegin, dateEndEst, description, stakeholder } = this.state
        var project = {
            name: name,
            dateBegin: dateBegin,
            dateEndEst: dateEndEst,
            description: description,
            stakeholder: stakeholder
        }
        this.props.createProject(project)
        this.props.history.push("/project/create-position")
    }

    render() {
        var { name, dateBegin, dateEndEst, description, stakeholder } = this.state

        return (
            <div className="card">
                <div className="card-header card-header-primary">
                    <h3 className="card-title">Create Project</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={this.onSave}>
                        {/* Name */}
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label className="bmd-label-floating">Project Name</label>
                                    <input type="text" className="form-control" value={name} name="name" onChange={this.onHandle} />
                                </div>
                            </div>
                        </div>

                        {/* Date */}
                        <div className="row">
                            {/* Date begin */}
                            <div className="col-md-6">
                                <label className="bmd-label">Date begin</label>

                                <div className="form-group">
                                    <input type="date" name="dateBegin" defaultValue={dateBegin} className="form-control" onChange={this.onHandle} />
                                </div>
                            </div>
                            {/* Date end estimate */}
                            <div className="col-md-6">
                                <label className="bmd-label">Date End Estimate</label>

                                <div className="form-group">
                                    <input type="date" name="dateEndEst" defaultValue={dateEndEst} className="form-control" onChange={this.onHandle} />
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label className="bmd-label-floating">Description</label>
                                    <textarea className="form-control" name="description" value={description} rows="5" defaultValue={description} onChange={this.onHandle} />
                                </div>
                            </div>
                        </div>

                        {/* Stakeholder */}
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label className="bmd-label-floating">Stakeholder</label>
                                    <textarea className="form-control" name="stakeholder" value={stakeholder} rows="5" defaultValue={stakeholder} onChange={this.onHandle} />
                                </div>
                            </div>
                        </div>

                        {/* Button */}
                        <button type="submit" className="btn btn-primary pull-right" >Create Project</button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { project: state.ProjectFormReducer }
}

const mapDispatchToProp = (dispatch) => {
    return {
        createProject: (project) => {
            dispatch(Action.createProject(project))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(CreateProject);