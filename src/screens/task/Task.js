import React, { Component } from 'react';
import TaskTable from '../../components/task-table/TaskTable';

class Task extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <TaskTable project={this.props.project} />
                   
                </div>
            </div>

        );
    }
}

export default Task;