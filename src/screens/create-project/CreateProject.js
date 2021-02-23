import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as Action from "../../store/store-action/ProjectAction";
import { formatDate } from '../../util';

class CreateProject extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            name: "",
            dateBegin: "",
            dateEndEst: "",
            description: "",
            stakeholder: ""
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
        var { match } = this.props
        if (typeof match === 'undefined') {
            var { project } = this.props
            this.setState({
                id: project.projectID,
                name: project.projectName,
                dateBegin: project.dateBegin,
                dateEndEst: project.dateEstimatedEnd,
                description: project.description,
                stakeholder: project.skateholder
            })
        }
        else {
            var id = match.params.id
            this.props.fetchProjectDetail(id)
            var { projectDetail } = this.props
            this.setState({
                id: projectDetail.projectID,
                name: projectDetail.projectName,
                dateBegin: formatDate(projectDetail.dateBegin),
                dateEndEst: formatDate(projectDetail.dateEstimatedEnd),
                description: projectDetail.description,
                stakeholder: projectDetail.skateholder
            })
        }
    }

    onSave = (event) => {
        event.preventDefault()
        var { id, name, dateBegin, dateEndEst, description, stakeholder } = this.state
       
        var project = {
            projectId: id,
            projectName: name,
            description: description,
            skateholder: stakeholder,
            dateBegin: dateBegin,
            dateEstimatedEnd: dateEndEst
        }
        this.props.createProject(project)

        if (typeof match === 'undefined') {
            this.props.history.push(`/project/${id}`)
        }
        else {
            this.props.history.push("/project/create-position")
        }
    }

    render() {
        var { name, dateBegin, dateEndEst, description, stakeholder } = this.state
        return (
            <div className="card">
                <div className="card-header card-header-primary">
                    <h3 className="card-title">
                        {typeof this.props.match === 'undefined' ? "Create Project" : "Edit Project"}
                    </h3>
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
                                    <input type="date" name="dateBegin" defaultValue={dateBegin} className="form-control" onChange={this.onHandle} readOnly={typeof this.props.match === 'undefined' ? false : true} />
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
                                    <textarea className="form-control" name="description" rows="5" defaultValue={description} onChange={this.onHandle} />
                                </div>
                            </div>
                        </div>

                        {/* Stakeholder */}
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label className="bmd-label-floating">Stakeholder</label>
                                    <textarea className="form-control" name="stakeholder" rows="5" defaultValue={stakeholder} onChange={this.onHandle} />
                                </div>
                            </div>
                        </div>

                        {/* Button */}
                        <button type="submit" className="btn btn-primary pull-right" >
                            {typeof this.props.match === 'undefined' ? "Create Project" : "Edit Project"}
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        project: state.ProjectFormReducer,
        projectDetail: state.ProjectFetchReducer
    }
}

const mapDispatchToProp = (dispatch) => {
    return {
        createProject: (project) => {
            dispatch(Action.createProject(project))
        },
        fetchProjectDetail: projectID => {
            dispatch(Action.fetchProjectDetail(projectID))
        },
        updateProject: (project, id) => {
            dispatch(Action.updateProject(project, id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(CreateProject);