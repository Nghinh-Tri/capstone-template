import React, { Component } from 'react';

class ListEmployeeContent extends Component {
    render() {
        return (
            <div>
                <div className="card-body">
                    <div className='row header'>
                        <h4 className="font-weight-bold">Back End</h4>
                    </div>
                    <div className="row">
                        <div className="card-body confirm-table">
                            <table className="table">
                                <thead className=" text-primary">
                                    <tr>
                                        <th className="font-weight-bold text-center">No</th>
                                        <th className="font-weight-bold text-center">Name</th>
                                        <th className="font-weight-bold text-center">Date In</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* {this.showCandidate(item.candidateSelect)} */}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ListEmployeeContent;