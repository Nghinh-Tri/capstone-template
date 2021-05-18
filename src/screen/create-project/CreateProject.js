import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProgressBar from '../../component/progress-bar/ProgressBar';
import { checkSession } from '../../service/action/user/AuthenticateAction';
import * as Action from "../../service/action/project/ProjectAction";
import { convertProjectTypeList } from '../../service/util/util';
import SelectBar from "../../component/select-search/SelectBar";
import { compose } from 'redux';
import { withRouter } from 'react-router';
import moment from 'moment';
import TextArea from 'antd/lib/input/TextArea';
import { Modal, Spin } from 'antd';
import { history } from '../../service/helper/History';
class CreateProject extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            projectName: "",
            dateBegin: moment(moment().day(35)).format('YYYY-MM-DD'),
            dateEstimatedEnd: moment(moment().day(35 + 60)).format('YYYY-MM-DD'),
            description: "",
            stakeholder: "",
            projectTypeID: 1,
            projectFieldID: 1,
            fieldError: '',
            messageError: '',
            isLoad: true
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
        } else {
            this.props.generateProject({
                name: '',
                dateBegin: '',
                dateEndEst: '',
                description: '',
                stakeholder: ''
            }, true)
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.project !== this.props.project) {
            if (this.props.location.pathname.toString().includes('create-project'))
                this.setState({ isLoad: false })
        } else if (prevProps.projectDetail !== this.props.projectDetail) {
            var { projectDetail } = this.props
            if (typeof projectDetail.isCreateNew === 'undefined') {
                this.setState({
                    id: projectDetail.projectID,
                    projectName: projectDetail.projectName,
                    dateBegin: moment(projectDetail.dateBegin).format('YYYY-MM-DD'),
                    dateEstimatedEnd: moment(projectDetail.dateEstimatedEnd).format('YYYY-MM-DD'),
                    description: projectDetail.description,
                    stakeholder: projectDetail.skateholder,
                    projectTypeID: projectDetail.typeID,
                    projectFieldID: projectDetail.fieldID,
                    isLoad: false
                })
            }
        } else if (prevProps.status !== this.props.status) {
            let { location } = this.props
            let { id } = this.state
            if (this.props.status)
                Modal.success({
                    title: location.pathname.toString().includes('create-project') ?
                        'Create Project Successfully' : 'Update Project Successfully',
                    onOk() {
                        if (location.pathname.toString().includes('create-project'))
                            history.push('/project/create-position')
                        else
                            history.push(`/project/detail/${id}`)
                    }
                })
            else
                Modal.error({
                    title: typeof this.props.match === 'undefined' ? 'Create Project Failed' : 'Update Project Failed'
                })
        }
    }

    componentWillReceiveProps = () => {
        var { constraintsError } = this.props
        if (constraintsError.message.includes(':')) {
            var list = constraintsError.message.split(':')
            this.setState({ messageError: list[1], fieldError: list[0], })
        } else {
            this.setState({ messageError: '', fieldError: '', })
        }
    }

    componentWillUnmount = () => {
        this.props.refreshPage()
    }

    onSave = (event) => {
        event.preventDefault()
        var { id, projectName: projectName, dateBegin, dateEstimatedEnd, description, projectTypeID, projectFieldID } = this.state
        if (this.props.location.pathname.toString().includes('create-project')) {
            var project = {
                projectId: id,
                projectName: projectName.trim(),
                description: description.trim(),
                dateBegin: dateBegin,
                dateEstimatedEnd: dateEstimatedEnd,
                projectTypeID: projectTypeID,
                projectFieldID: projectFieldID
            }
            this.props.createProject(project, this.props.location.pathname)
        }
        else {
            var project = {
                description: description.trim(),
                dateEstimatedEnd: dateEstimatedEnd,
                typeID: projectTypeID,
                fieldID: projectFieldID
            }
            this.props.updateProject(project, id)
        }
    }

    render() {
        var { projectName, dateBegin, dateEstimatedEnd,
            description, projectTypeID, projectFieldID, fieldError, messageError, isLoad } = this.state
        var { projectType, projectField, error } = this.props
        var projectTypeConverted = convertProjectTypeList(projectType)
        var projectFieldConverted = convertProjectTypeList(projectField)
        return (
            <div>
                {this.props.location.state !== null ?
                    <ProgressBar current="0" />
                    : ("")
                }

                <div className="card" style={{ marginTop: typeof this.props.match.params.id === "undefined" ? "0px" : "50px", }}>
                    <div className="card-header">
                        {typeof this.props.match.params.id === "undefined"
                            ? "Create Project"
                            : "Edit Project"}
                    </div>
                    {isLoad ?
                        <div className="row justify-content-center">
                            <Spin className="text-center" size="large" />
                        </div> :

                        <div className="card-body">
                            <form onSubmit={this.onSave}>
                                {/* Name */}
                                <div className="row">
                                    <div className="col">
                                        <div className="form-group">
                                            <label className='bmd-label-static'>
                                                Project Name <span style={{ color: 'red', fontWeight: 500 }} >*</span>
                                            </label>
                                            <input type="text" className="form-control" value={projectName} name="projectName"
                                                onChange={this.onHandle}
                                                readOnly={typeof this.props.match.params.id === "undefined" ? false : true}
                                            />
                                            {typeof error.ProjectName !== "undefined"
                                                ? error.ProjectName.map((element, index) => {
                                                    return (
                                                        <div key={index} className="error text-danger font-weight-bold">
                                                            {element}
                                                        </div>
                                                    );
                                                })
                                                : ""}
                                            {fieldError.trim().includes("projectName") ? (
                                                <div className="error text-danger font-weight-bold">
                                                    {messageError}
                                                </div>
                                            ) : ""}
                                        </div>
                                    </div>
                                </div>

                                {/* Project Type - Field*/}
                                <div className="row">
                                    {/* Project Type */}
                                    <div className="col">
                                        <div className="form-group">
                                            <label classNam='bmd-label-static'>
                                                Project Type <span style={{ color: 'red', fontWeight: 500 }} >*</span>
                                            </label>
                                            <SelectBar name="projectType"
                                                type="common"
                                                placeholder="Select project type"
                                                list={projectTypeConverted}
                                                value={projectTypeID}
                                                onSelectProjectType={this.onSelectProjectType}
                                            />
                                            {typeof error.TypeID !== "undefined"
                                                ? error.TypeID.map((element, index) => {
                                                    return (
                                                        <div key={index} className="error text-danger font-weight-bold">
                                                            {element}
                                                        </div>
                                                    );
                                                })
                                                : ""}
                                        </div>
                                    </div>

                                    {/* Project Field */}
                                    <div className="col">
                                        <div className="form-group">
                                            <label className='bmd-label-static'>
                                                Project Field <span style={{ color: 'red', fontWeight: 500 }} >*</span>
                                            </label>
                                            <SelectBar
                                                name="projectField"
                                                type="common"
                                                placeholder="Select project fields"
                                                list={projectFieldConverted}
                                                value={projectFieldID}
                                                onSelectProjectField={this.onSelectProjectField}
                                            />
                                            {typeof error.FieldID !== "undefined"
                                                ? error.FieldID.map((element, index) => {
                                                    return (
                                                        <div key={index} className="error text-danger font-weight-bold">
                                                            {element}
                                                        </div>
                                                    );
                                                })
                                                : ""}
                                        </div>
                                    </div>
                                </div>

                                {/* Date */}
                                <div className="row">
                                    {/* Date begin */}
                                    <div className="col">
                                        <div className="form-group">
                                            <label className="bmd-label">
                                                Start Date <span style={{ color: 'red', fontWeight: 500 }} >*</span>
                                            </label>
                                            <input
                                                type="date"
                                                name="dateBegin"
                                                className="form-control"
                                                // min={moment(moment().day(10)).format("YYYY-MM-DD")}
                                                defaultValue={dateBegin}
                                                onChange={this.onHandle}
                                                readOnly={typeof this.props.match.params.id === "undefined" ? false : true}
                                            />
                                            {typeof error.DateBegin !== "undefined"
                                                ? error.DateBegin.map((element, index) => {
                                                    return (
                                                        <div key={index} className="error text-danger font-weight-bold">
                                                            {element}
                                                        </div>
                                                    );
                                                })
                                                : ""}
                                        </div>
                                    </div>
                                    {/* Date end estimate */}
                                    <div className="col">
                                        <div className="form-group">
                                            {console.log(dateEstimatedEnd)}
                                            <label className="bmd-label">
                                                Estimated End Date <span style={{ color: 'red', fontWeight: 500 }} >*</span>
                                            </label>
                                            <input
                                                type="date"
                                                name="dateEstimatedEnd"
                                                // min={moment(moment().day(11)).format("YYYY-MM-DD")}
                                                defaultValue={dateEstimatedEnd}
                                                className="form-control"
                                                onChange={this.onHandle}
                                            />
                                            {fieldError.trim().includes("dateEstimatedEnd") ? (
                                                <div className="error text-danger font-weight-bold">
                                                    {messageError}
                                                </div>
                                            ) : ""}
                                            {typeof error.DateEstimatedEnd !== "undefined"
                                                ? error.DateEstimatedEnd.map((element, index) => {
                                                    return (
                                                        <div key={index} className="error text-danger font-weight-bold">
                                                            {element}
                                                        </div>
                                                    );
                                                })
                                                : ""}
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label className='bmd-label-static'>
                                                Description <span style={{ color: 'red', fontWeight: 500 }} >*</span>
                                            </label>
                                            <TextArea elastic className="form-control"
                                                name="description"
                                                autoSize={{ minRows: 5, maxRows: 20 }}
                                                value={description}
                                                onChange={this.onHandle}
                                            />
                                            {typeof error.Description !== "undefined"
                                                ? error.Description.map((element, index) => {
                                                    return (
                                                        <div key={index} className="error text-danger font-weight-bold">
                                                            {element}
                                                        </div>
                                                    );
                                                }) : ""}
                                        </div>
                                    </div>
                                </div>

                                {/* Button */}
                                <button type="submit" className="btn btn-primary pull-right" style={{ fontWeight: 700 }}>
                                    {typeof this.props.match.params.id === "undefined" ? "Create" : "Edit"}
                                </button>
                            </form>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        project: state.ProjectFormReducer,
        projectDetail: state.ProjectDetailFetchReducer,
        projectType: state.ProjectTypeReducer,
        projectField: state.ProjectFieldReducer,
        error: state.ErrorReducer,
        constraintsError: state.CreateProjectErrorReducer,
        status: state.StatusReducer
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
        },
        refreshPage: () => {
            dispatch(Action.refreshPage())
        },
        generateProject: (project, isCreateNew) => {
            dispatch(Action.generateProject(project, isCreateNew))
        },
    }
}

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProp))(CreateProject);