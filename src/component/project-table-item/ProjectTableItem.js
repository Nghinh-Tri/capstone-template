import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { showSpan, showStatus } from '../../service/util/util';

class ProjectTableItem extends Component {    
    render() {        
        var { index, project } = this.props
        return (
            <tr>
                <th className="text-center">{index + 1}</th>
                <th className="text-center">{project.projectName}</th>
                <th className="text-center">
                    <span className={`badge badge-pill ${showSpan(project.status)} span`}>
                        {showStatus(project.status)}
                    </span>
                </th>
                <th className="text-center">
                    <NavLink to={`/project/detail/${project.projectID}`}>
                        Detail
                    </NavLink>
                </th>
            </tr>
        );
    }
}

export default ProjectTableItem;