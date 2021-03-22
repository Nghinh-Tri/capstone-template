import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Action from "../../service/action/ProjectAction";
import ProjectTableItem from "../../component/project-table-item/ProjectTableItem";
import { checkSession } from '../../service/action/AuthenticateAction';

class Project extends Component {

    constructor(props) {
        super(props);
        this.state = {
            project: {
                name: '',
                dateBegin: '',
                dateEndEst: '',
                description: '',
                stakeholder: ''
            },
            page: 1
        }
    }

    componentDidMount = () => {
        this.props.checkSession()
        this.props.fetchProject(this.state.page)
    }

    onGenerateProject = () => {
        this.props.generateProject(this.state.project)
        localStorage.setItem("projectId", 0)
    }

    onShowListProject = (projectList) => {
        var result = null
        if (typeof projectList !== 'undefined') {
            result = projectList.map((project, index) => {
                return (<ProjectTableItem key={index} project={project} index={index} />);
            })
        }
        return result
    }

    onNext = () => {
        var { projects } = this.props
        if (projects.pageIndex < projects.pageCount)
            this.props.fetchProject(projects.pageIndex + 1)
    }

    onPrevios = () => {
        var { projects } = this.props
        console.log(projects.pageIndex > 1)
        if (projects.pageIndex > 1)
            this.props.fetchProject(projects.pageIndex - 1)
    }

    render() {
        var { projects } = this.props
        return (
            <div className="container-fluid">
                <button type="button" className="btn btn-primary"
                    style={{ fontWeight: 700, borderRadius: 5, marginLeft: 10, }}
                    onClick={this.onGenerateProject} >
                    <i className="material-icons mr-5">add_box</i>
                        Create New Project
                </button>

                <div className="row">
                    <div className="card mb-80">
                        <div className="card-body">
                            <div className="form-group">
                                <div className="row">
                                    <div className="card-body">

                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead className=" text-primary">
                                                    <tr>
                                                        <th className="font-weight-bold text-center">No</th>
                                                        <th className="font-weight-bold text-center">Project Name</th>
                                                        <th className="font-weight-bold text-center">Status</th>
                                                        <th className="font-weight-bold text-center"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.onShowListProject(projects.items)}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="row align-items-center">
                                            <div className="col">
                                                <button type="button"
                                                    style={{ fontWeight: 700, width:120 }}
                                                    className="btn btn-primary pull-right" onClick={this.onPrevios}>
                                                    Previous
                                                </button>
                                            </div>
                                            <div className="col-auto">
                                                <div className="text-center" style={{fontSize:20, fontWeight:700, color: '#9c27b0'}}>
                                                    {projects.pageIndex} - {projects.pageCount}
                                                </div>
                                            </div>
                                            <div className="col">
                                                <button type="button"
                                                    style={{ fontWeight: 700, width:120 }}
                                                    className="btn btn-primary" onClick={this.onNext}>
                                                    Next
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                </div>
            </div>
        );
    }
}

const mapStateToProp = state => {
    return {
        projects: state.ProjectFetchReducer
    }
}

const mapDispatchToProp = (dispatch) => {
    return {
        generateProject: (project) => {
            dispatch(Action.generateProject(project))
        },
        fetchProject: (pageIndex) => {
            dispatch(Action.fetchProject(pageIndex))
        },
        checkSession: () => {
            dispatch(checkSession())
        }
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(Project);