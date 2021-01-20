import React, { Component } from 'react';
import TableItems from './table-item';

class TaskTable extends Component {

    showListStaff = (staffList) => {
        var result = null;
        result = staffList.map((staff, index) => {
            return (<TableItems key={index} staff={staff} index={index} />);
        })
        return result;
    }

    showStatus = (status) => {
        switch (status) {
            case 'Pending':
                return 'secondary'
            case 'On-going':
                return 'primary'
            case 'Finish':
                return 'success'
            default:
                break;
        }
    }
    render() {
        var { project } = this.props;
        return (
            <div className="col-md-12">
                <div className="card">
                    <div className="card-header card-header-primary">

                        <div className="row">
                            <div className="col-10">
                                <h4 className="card-title "> {project.name} </h4>
                                <p className="card-category"> {project.description} </p>
                            </div>
                            <div className="col">
                                <h3 className="card-title pl-100">
                                    <span className={`badge badge-pill badge-${this.showStatus(project.status)}`}>{project.status}</span>
                                </h3>
                            </div>
                        </div>

                    </div>

                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table">
                                <thead className=" text-primary">
                                    <tr>
                                        <th>No</th>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Position</th>
                                        <th>Date In</th>
                                        <th>Date Out</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.showListStaff(project.staff)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TaskTable;