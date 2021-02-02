import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ProjectBrief from '../../components/project-brief/ProjectBrief';
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
            }
        }
    }

    onGenerateProject = () => {
        this.props.generateProject(this.state.project)
    }

    render() {
        return (
            <div className="container-fluid">
                <NavLink to="/project/create-project">
                    <button type="button" className="btn btn-primary btn-lg" onClick={this.onGenerateProject} >
                        <i className="material-icons mr-5">add_box</i>
                        Create Project
                    </button>
                </NavLink>

                <div className="row">
                    <ProjectBrief />
                    <ProjectBrief />
                </div>
            </div>

        );
    }
}

const mapDispatchToProp = (dispatch) => {
    return {
        generateProject: (project) => {
            dispatch(Action.generateProject(project))
        }
    }
}

export default connect(null, mapDispatchToProp)(Project);