import moment from 'moment';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { getRole, showSpan, showStatus } from '../../service/util/util';

class ProjectTableItem extends Component {
    render() {
        var { index, project } = this.props
        return (
            <React.Fragment>
                { getRole() === 'PM' ?                    
                    <tr>
                        <th className="text-center">{index + 1}</th>
                        <th className="" style={{width:350}}>{project.projectName}</th>
                        <th className="" style={{width:250}}>{project.typeName}</th>
                        <th className="text-center" style={{width:150}}>{moment(project.dateBegin).format('DD-MM-YYYY')}</th>
                        <th className="text-center" style={{width:100}} >
                            <span className={`badge badge-pill ${showSpan(project.status)} span`}>
                                {showStatus(project.status)}
                            </span>
                        </th>
                        <th className="text-center">
                            <NavLink className='text-primary' to={`/project/detail/${project.projectID}`}>
                                Detail
                            </NavLink>
                        </th>
                    </tr>
                    :
                    <tr>
                        <th className="text-center">{index + 1}</th>
                        <th className="">{project.projectName}</th>
                        <th className="">{project.posName}</th>
                        <th className="text-center">{moment(project.dateIn).format('DD-MM-YYYY')}</th>
                        <th className="text-center">
                            <NavLink to={`/project/detail/${project.projectID}`}>
                                Detail
                            </NavLink>
                        </th>
                    </tr>
                }
            </React.Fragment>
        );
    }
}

export default ProjectTableItem;