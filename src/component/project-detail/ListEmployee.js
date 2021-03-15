import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import ListEmployeeContent from "./ListEmployeeContent";

class ListEmployee extends Component {
    render() {
        return (
            <div>
                <ListEmployeeContent />
                <ListEmployeeContent />
                <div className="row">
                    <div className="col pull-right" style={{marginRight:20, marginBottom:10}}>
                        <NavLink to="/project/create-position">
                            <button className="btn btn-primary pull-right "> Add more position</button>
                        </NavLink>
                    </div>
                </div>
            </div>
        );
    }
}

export default ListEmployee;