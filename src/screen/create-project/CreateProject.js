import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProgressBar from '../../component/progress-bar/ProgressBar';
import { checkSession } from '../../service/action/AuthenticateAction';
import * as Action from "../../service/action/ProjectAction";
import { convertProjectTypeList } from '../../service/util/util';
import SelectBar from "../../component/select-search/SelectBar";
import { compose } from 'redux';
import { withRouter } from 'react-router';
import moment from 'moment';
class CreateProject extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            name: "",
            dateBegin: "",
            dateEndEst: "",
            description: "",
            stakeholder: "",
            projectTypeID: 1,
            projectFieldID: 1,
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

    onSelectProjectType = (value) => {
        this.setState({ projectTypeID: parseInt(value) })
    }

    onSelectProjectField = (value) => {
        this.setState({ projectFieldID: parseInt(value) })
    }

    componentDidMount = () => {
        this.props.checkSession()
        this.props.fetchProjectType()
        this.props.fetchProjectField()
        var { location, match } = this.props
        if (!location.pathname.toString().includes('create-project')) {
            this.props.fetchProjectDetail(match.params.id)
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.projectDetail !== prevState.projectDetail) {
            return { someState: nextProps.someValue };
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.projectDetail !== this.props.projectDetail) {
            var { projectDetail } = this.props
            if (typeof projectDetail.isCreateNew === 'undefined') {
                this.setState({
                    id: projectDetail.projectID,
                    name: projectDetail.projectName,
                    dateBegin: moment(projectDetail.dateBegin).format('YYYY-MM-DD'),
                    dateEndEst: moment(projectDetail.dateEstimatedEnd).format('YYYY-MM-DD'),
                    description: projectDetail.description,
                    stakeholder: projectDetail.skateholder,
                    projectTypeID: projectDetail.typeID,
                    projectFieldID: projectDetail.fieldID
                })
            }
        }
    }

    onSave = (event) => {
        event.preventDefault()
        var { id, name, dateBegin, dateEndEst, description, projectTypeID, projectFieldID } = this.state
        if (this.props.location.pathname.toString().includes('create-project')) {
            var project = {
                projectId: id,
                projectName: name,
                description: description,
                dateBegin: dateBegin,
                dateEstimatedEnd: dateEndEst,
                projectTypeID: projectTypeID,
                projectFieldID: projectFieldID
            }
            this.props.createProject(project, this.props.location.pathname)
        }
        else {
            var project = {
                description: description,
                dateEstimatedEnd: dateEndEst,
                typeID: projectTypeID,
                fieldID: projectFieldID
            }
            this.props.updateProject(project, id)
        }
    }

    render() {
        var { name, dateBegin, dateEndEst, description, stakeholder, projectTypeID, projectFieldID } = this.state
        var { projectType, projectField } = this.props
        var projectTypeConverted = convertProjectTypeList(projectType)
        var projectFieldConverted = convertProjectTypeList(projectField)
        return (
            <div>
                {this.props.location.state !== null ? <ProgressBar current='0' /> : ''}

                <div className="card">
                    <div className="card-header">
                        {typeof this.props.match.params.id === 'undefined' ? "Create Project" : "Edit Project"}
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.onSave}>
                            {/* Name */}
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label className={`bmd-label-${typeof this.props.match.params !== 'undefined' ? 'static' : 'floating'}`}>Project Name</label>
                                        <input type="text"
                                            className="form-control"
                                            value={name} name="name" onChange={this.onHandle}
                                            readOnly={typeof this.props.match.params.id === 'undefined' ? false : true} />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label className={`bmd-label-${typeof this.props.match.params !== 'undefined' ? 'static' : 'floating'}`}>Project Types</label>
                                        <SelectBar name='projectType'
                                            type='common'
                                            placeholder="Select project type"
                                            list={projectTypeConverted}
                                            value={projectTypeID}
                                            onSelectProjectType={this.onSelectProjectType} />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label className={`bmd-label-${typeof this.props.match.params !== 'undefined' ? 'static' : 'floating'}`}>Project Fields</label>
                                        <SelectBar name='projectField'
                                            type='common'
                                            placeholder="Select project fields"
                                            list={projectFieldConverted}
                                            value={projectFieldID}
                                            onSelectProjectType={this.onSelectProjectField} />
                                    </div>
                                </div>
                            </div>

                            {/* Date */}
                            <div className="row">
                                {/* Date begin */}
                                <div className="col">
                                    <div className="form-group">
                                        <label className="bmd-label">Start Date</label>
                                        <input type='date' name="dateBegin" className="form-control" min={moment(moment().day(10)).format('YYYY-MM-DD')}
                                            defaultValue={dateBegin} onChange={this.onHandle} readOnly={typeof this.props.match.params.id === 'undefined' ? false : true} />
                                    </div>
                                </div>
                                {/* Date end estimate */}
                                <div className="col">
                                    <div className="form-group">
                                        <label className="bmd-label">End Date</label>
                                        <input type="date" name="dateEndEst" min={moment(moment().day(11)).format('YYYY-MM-DD')}
                                            defaultValue={dateEndEst} className="form-control" onChange={this.onHandle} />
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label className={`bmd-label-${typeof this.props.match.params !== 'undefined' ? 'static' : 'floating'}`}>Description</label>
                                        <textarea className="form-control" name="description" rows="5" defaultValue={description} onChange={this.onHandle} />
                                    </div>
                                </div>
                            </div>

                            {/* Button */}
                            <button type="submit" className="btn btn-primary pull-right" style={{ fontWeight: 700 }} >
                                {typeof this.props.match.params.id === 'undefined' ? "Create" : "Edit"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        project: state.ProjectFormReducer,
        projectDetail: state.ProjectFetchReducer,
        projectType: state.ProjectTypeReducer,
        projectField: state.ProjectFieldReducer
    }
}

const mapDispatchToProp = (dispatch) => {
    return {
        createProject: (project, pathname) => {
            dispatch(Action.createProject(project, pathname))
        },
        fetchProjectDetail: projectID => {
            dispatch(Action.fetchProjectDetail(projectID))
        },
        updateProject: (project, id) => {
            dispatch(Action.updateProject(project, id))
        },
        checkSession: () => {
            dispatch(checkSession())
        },
        fetchProjectType: () => {
            dispatch(Action.fetchProjectType())
        },
        fetchProjectField: () => {
            dispatch(Action.fetchProjectField())
        }
    }
}

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProp))(CreateProject);