import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Action from "../../service/action/ProjectAction";
import ProjectDetailTable from "../../component/project-detail/ProjectDetailTable";
import ListEmployee from '../../component/project-detail/ListEmployee';
import { checkSession } from '../../service/action/AuthenticateAction';
import { NavLink } from 'react-router-dom';

class ProjectDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            select: 1,
            project: {}
        }
    }

    componentDidMount = () => {
        this.props.checkSession()
        var { match } = this.props
        this.props.fetchProjectDetail(match.params.id)
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.project !== prevState.project) {
            return { someState: nextProps.project };
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.project !== this.props.project) {
            if (typeof this.props.project.isCreateNew === 'undefined')
                this.setState({ project: this.props.project })
        }
    }

    onClickMenu = (value) => {
        this.setState({ select: value })
    }

    render() {
        var { project } = this.state
        return (
            <div>
                <div className='row'>
                    <div className='col-auto' style={{ marginTop: 30 }}>
                        <ul className='ul'>
                            <li className='li'>
                                <a className={this.state.select === 1 ? 'active' : ''} onClick={() => this.onClickMenu(1)}>Project Detail</a>
                            </li>
                            <li className='li' >
                                <a className={this.state.select === 2 ? 'active' : ''} onClick={() => this.onClickMenu(2)} >Employee List</a>
                            </li>
                        </ul>
                    </div>

                    <div className='col'>
                        {this.state.select === 1 ?
                            <ProjectDetailTable project={project} match={this.props.match} />
                            :
                            <ListEmployee project={project} />
                        }
                    </div>
                </div>
                <div className='row pull-right'>
                    <NavLink to="/project">
                        <button type="button" className="btn btn-primary " style={{ marginRight: 30, width: 110, fontWeight: 600, marginTop: -8 }}>Back</button>
                    </NavLink>
                </div>
            </div>
        );
    }
}

const mapStateToProp = state => {
    return {
        project: state.ProjectFetchReducer
    }
}

const mapDispatchToProp = dispatch => {
    return {
        fetchProjectDetail: projectID => {
            dispatch(Action.fetchProjectDetail(projectID))
        },
        changeStatusToFinish: projectID => {
            dispatch(Action.changeStatusToFinish(projectID))
        },
        checkSession: () => {
            dispatch(checkSession())
        }
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(ProjectDetail);