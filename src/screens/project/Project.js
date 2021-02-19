import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ProjectTableItem from '../../components/project-table-item/ProjectTableItem';
import * as Action from "../../store/store-action/ProjectAction";

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
        this.props.fetchProject(this.state.page)
    }

    onGenerateProject = () => {
        this.props.generateProject(this.state.project)
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
                <NavLink to="/project/create-project">
                    <button type="button" className="btn btn-primary btn-lg" onClick={this.onGenerateProject} >
                        <i className="material-icons mr-5">add_box</i>
                        Create New Project
                    </button>
                </NavLink>

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
                                        <div className="row pull-center">
                                            <div className="col-6">
                                                <button type="button" className="btn btn-primary pull-right" onClick={this.onPrevios}>
                                                    Previous
                                                </button>
                                            </div>
                                            <div className="col">
                                                <div className="text-center text">
                                                    {projects.pageIndex} - {projects.pageCount}
                                                </div>
                                            </div>
                                            <div className="col-5">
                                                <button type="button" className="btn btn-primary" onClick={this.onNext}>
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
        }
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(Project);