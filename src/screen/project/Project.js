import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Action from "../../service/action/project/ProjectAction";
import { checkSession } from '../../service/action/user/AuthenticateAction';
import { getRole, showSpan, showStatus } from '../../service/util/util';
import { Badge, Pagination, Spin, Tooltip } from 'antd';
import Search from '../../component/search/Search';
import moment from 'moment';
import { NavLink } from 'react-router-dom';

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
            page: 1,
            search: '',
            isLoading: true
        }
    }

    componentDidMount = () => {
        this.props.checkSession()
        this.props.fetchProject(this.state.page, this.state.search)
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.projects !== prevState.projects) {
            return { someState: nextProps.projects };
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.projects !== this.props.projects) {
            console.log(this.props.projects)
            this.setState({ isLoading: false })
        }
    }

    onGenerateProject = (isCreateNew) => {
        this.props.generateProject(this.state.project, isCreateNew)
        localStorage.setItem("projectId", 0)
    }

    onShowListProject = (projectList) => {
        var result = null
        if (typeof projectList !== 'undefined') {
            result = projectList.map((project, index) => {
                return (<React.Fragment>
                    { getRole() === 'PM' ?
                        <tr key={index} >
                            <th className='text-center'>{(this.props.projects.data.pageIndex - 1) * 10 + index + 1}</th>
                            <th>
                                <Tooltip title={project.isMissEmp ? 'This project is currently missing employees' : ''} placement='right' >
                                    <Badge dot={project.isMissEmp}>
                                        <NavLink className='text-primary' to={`/project/detail/${project.projectID}`}>
                                            {project.projectName}
                                        </NavLink>
                                    </Badge>
                                </Tooltip>
                            </th>
                            <th>{project.typeName}</th>
                            <th className="text-center">{moment(project.dateBegin).format('DD-MM-YYYY')}</th>
                            <th className="text-center">
                                {project.dateEnd === null ? moment(project.dateEstimatedEnd).format('DD-MM-YYYY') : moment(project.dateEnd).format('DD-MM-YYYY')}
                            </th>
                            <th className="text-center" >
                                <span className={`badge badge-pill ${showSpan(project.status)} span`}>
                                    {showStatus(project.status)}
                                </span>
                            </th>
                        </tr>
                        :
                        <tr key={index}>
                            <th className='text-center'>{(this.props.projects.pageIndex - 1) * 10 + index + 1}</th>
                            <th>
                                <NavLink to={`/project/detail/${project.projectID}`} >
                                    {project.projectName}
                                </NavLink>
                            </th>
                            <th className='text-center' >{project.posName}</th>
                            <th className='text-center' >{moment(project.dateIn).format('DD-MM-YYYY')}</th>
                            <th className='text-center' >{moment(project.dateBegin).format('DD-MM-YYYY')}</th>
                            <th className='text-center' >
                                {project.dateEnd === null ? moment(project.dateEstimatedEnd).format('DD-MM-YYYY') : moment(project.dateEnd).format('DD-MM-YYYY')}
                            </th>
                        </tr>
                    }
                </React.Fragment>);
            })
        }
        return result
    }

    searchProject = (value) => {
        this.setState({ search: value })
        this.props.fetchProject(1, value)
    }

    onSelectPage = (e) => {
        this.props.fetchProject(e, this.state.search)
    }

    render() {
        var { projects } = this.props
        var items = []
        if (getRole() === 'PM') {
            if (typeof projects.data !== 'undefined')
                items = projects.data.items
        } else {
            items = projects.items
        }
        return (
            <React.Fragment>
                <ol class="breadcrumb mb-4 mt-3">
                    <li class="breadcrumb-item active">Projects</li>
                </ol>
                <div className="container-fluid">
                    <div class="card mb-4">
                        <div class="card-header">
                            <i class="fas fa-table mr-1"></i>Projects
                    </div>
                        <div class="card-body">
                            {this.state.isLoading ?
                                <div className="row justify-content-center">
                                    <Spin className="text-center" size="large" />
                                </div>
                                :
                                <>
                                    <div className="row mb-3">
                                        {getRole() === "PM" ?
                                            <button type="button" className="btn btn-primary" style={{ fontWeight: 700, borderRadius: 5, marginLeft: 20, marginTop: 10, }}
                                                onClick={() => this.onGenerateProject(projects.isCreateNew)}>
                                                <div className="row" style={{ paddingLeft: 7, paddingRight: 7 }}>
                                                    <i className="material-icons">add_box</i>New Project
                                            </div>
                                            </button>
                                            : ("")}
                                        <Search search="project"
                                            refresh={projects.isRefresh}
                                            placeholder="Search project name ..."
                                            searchProject={this.searchProject} />
                                    </div>
                                    {items.length > 0 ?
                                        <div class="table-responsive">
                                            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                                <thead className="font-weight-bold text-center text-primary">
                                                    {getRole() === "PM" ? (
                                                        <tr>
                                                            <th width={40}>No</th>
                                                            <th width={400}>Project Name</th>
                                                            <th width={150}>Project Type</th>
                                                            <th width={120}>Start Date</th>
                                                            <th width={100}>End Date</th>
                                                            <th width={100}>Status</th>
                                                        </tr>
                                                    ) : (
                                                        <tr>
                                                            <th width={40}>No</th>
                                                            <th width={400}>Project Name</th>
                                                            <th width={150}>Position</th>
                                                            <th width={110}>Confirmed Date</th>
                                                            <th width={100}>Start Date</th>
                                                            <th width={100}>End Date</th>
                                                        </tr>
                                                    )}
                                                </thead>
                                                <tbody>{this.onShowListProject(items)}</tbody>
                                            </table>
                                        </div>
                                        :
                                        <div className='row justify-content-center'>
                                            <h4 style={{ fontStyle: 'italic', color: 'gray' }} >No project available</h4>
                                        </div>
                                    }
                                    {
                                        getRole() === 'PM' ?
                                            projects.data.pageCount <= 1 ? ("")
                                                :
                                                <div className="row justify-content-center" style={{ marginBottom: 20 }}>
                                                    <Pagination current={projects.data.pageIndex} total={projects.data.totalRecords} onChange={this.onSelectPage} />
                                                </div>
                                            :
                                            projects.pageCount <= 1 ? ('') :
                                                <div className="row justify-content-center" style={{ marginBottom: 20 }}>
                                                    <Pagination current={projects.pageIndex} total={projects.totalRecords} onChange={this.onSelectPage} />
                                                </div>
                                    }
                                </>}
                        </div>
                    </div>
                </div>
            </React.Fragment>
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
        generateProject: (project, isCreateNew) => {
            dispatch(Action.generateProject(project, isCreateNew))
        },
        fetchProject: (pageIndex, search) => {
            dispatch(Action.fetchProject(pageIndex, search))
        },
        checkSession: () => {
            dispatch(checkSession())
        }
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(Project);