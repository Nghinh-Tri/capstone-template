import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Action from "../../service/action/ProjectAction";
import ProjectDetailTable from "../../component/project-detail/ProjectDetailTable";
import ListEmployee from '../../component/project-detail/ListEmployee';

class ProjectDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            select: 1
        }
    }

    componentDidMount = () => {
        var { match } = this.props
        this.props.fetchProjectDetail(match.params.id)
    }

    onClickMenu = (value) => {
        this.setState({ select: value })
    }

    render() {
        var { project } = this.props
        return (
            <div>
                <div className='row'>
                    <div className='col-auto' style={{ marginTop: 30 }}>
                        <ul className='ul'>
                            <li className='li'>
                                <a className={this.state.select === 1 ? 'active' : ''} onClick={() => this.onClickMenu(1)}>Project Detail</a>
                            </li>
                            <li className='li' >
                                <a className={this.state.select === 2 ? 'active' : ''} onClick={() => this.onClickMenu(2)} >List Employees</a>
                            </li>
                        </ul>
                    </div>

                    <div className='col'>
                        <div className="card">
                            {this.state.select === 1 ?
                                <ProjectDetailTable project={project} match={this.props.match} />
                                :
                                <ListEmployee project={project}/>
                            }
                        </div >
                    </div>
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
        }
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(ProjectDetail);