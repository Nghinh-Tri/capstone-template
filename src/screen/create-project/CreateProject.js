import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProgressBar from '../../component/progress-bar/ProgressBar';
import { checkSession } from '../../service/action/AuthenticateAction';
import * as Action from "../../service/action/ProjectAction";
import { convertProjectTypeList } from '../../service/util/util';
import SelectBar from "../../component/create-position-form/select-search/SelectBar";
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
            projectTypeID: 0
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

    componentDidMount = () => {
        this.props.checkSession()
        this.props.fetchProjectType()
        var { match } = this.props
        if (typeof match.params.id !== 'undefined') {
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
                    projectTypeID: projectDetail.typeID
                })
            }
        }
    }

    onSave = (event) => {
        event.preventDefault()
        var { id, name, dateBegin, dateEndEst, description, stakeholder, projectTypeID } = this.state
        var project = {
            projectId: id,
            projectName: name,
            description: description,
            skateholder: stakeholder,
            dateBegin: dateBegin,
            dateEstimatedEnd: dateEndEst,
            projectTypeID: projectTypeID
        }
        this.props.createProject(project, this.props.match)
    }

    render() {
        var { name, dateBegin, dateEndEst, description, stakeholder, projectTypeID } = this.state
        var { projectType } = this.props
        var result = []
        if (projectType.length > 0)
            result = projectType
        result = convertProjectTypeList(result)
        return (
            <div>
                {this.props.location.state !== null ? <ProgressBar step="step1" /> : ''}

                <div className="card">
                    <div className="card-header card-header-primary">
                        <p className="card-title" style={{ marginLeft: 40, fontSize: 28, fontWeight: 600 }}>
                            {typeof this.props.match.params.id === 'undefined' ? "Create Project" : "Edit Project"}
                        </p>
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.onSave}>
                            {/* Name */}
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label className={`bmd-label-${typeof this.props.match.params !== 'undefined' ? 'static' : 'floating'}`}>Project Name</label>
                                        <input type="text" className="form-control" value={name} name="name" onChange={this.onHandle} />
                                    </div>
                                </div>
                                <div className="col-auto" style={{ marginTop: 18, marginLeft: 112 }}>
                                    <label className="bmd-label-floating">Project Type</label>
                                </div>
                                <div className="col" style={{ marginTop: 15 }}>
                                    <SelectBar name='projectType'
                                        type='common'
                                        placeholder="Select project type"
                                        list={result}
                                        value={projectTypeID}
                                        onSelectProjectType={this.onSelectProjectType} />
                                </div>
                            </div>

                            {/* Date */}
                            <div className="row">
                                {/* Date begin */}
                                <div className="col-md-6">
                                    <label className="bmd-label">Start Date</label>
                                    <div className="form-group">
                                        <input type='date' name="dateBegin" className="form-control" min={moment(moment().day(10)).format('YYYY-MM-DD')}
                                            defaultValue={dateBegin} onChange={this.onHandle} readOnly={typeof this.props.match.params.id === 'undefined' ? false : true} />
                                    </div>
                                </div>
                                {/* Date end estimate */}
                                <div className="col-md-6">
                                    <label className="bmd-label">End Date</label>

                                    <div className="form-group">
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

                            {/* Stakeholder */}
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label className={`bmd-label-${typeof this.props.match.params !== 'undefined' ? 'static' : 'floating'}`}>Stakeholder</label>
                                        <textarea className="form-control" name="stakeholder" rows="5" defaultValue={stakeholder} onChange={this.onHandle} />
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
        projectType: state.ProjectTypeReducer
    }
}

const mapDispatchToProp = (dispatch) => {
    return {
        createProject: (project, match) => {
            dispatch(Action.createProject(project, match))
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
        }
    }
}

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProp))(CreateProject);