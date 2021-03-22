import React, { Component } from 'react';

class CandidateTable extends Component {

    showCandidate = (candidateList) => {
        var result = null
        result = candidateList.map((candidate, index) => {
            return (<tr>
                <th className="text-center">{index + 1}</th>
                <th className="text-center">{candidate.empName}</th>
                <th className="text-center">{candidate.languageMatch.toFixed(2)} / 10</th>
                <th className="text-center">{candidate.softSkillMatch.toFixed(2)} / 10</th>
                <th className="text-center">{candidate.hardSkillMatch.toFixed(2)} /10 </th>
                <th className="text-center">{candidate.overallMatch.toFixed(2)} / 100</th>      
            </tr>)
        })
        return result
    }

    render() {
        var { item } = this.props
        return (
            <div>
                <div className="card-body">
                    <div className='row header'>
                        <h3 className="font-weight-bold">{item.position}</h3>
                    </div>
                    <div className="row">
                        <div className="card-body confirm-table">
                            <table className="table">
                                <thead className=" text-primary">
                                    <tr>
                                        <th className="font-weight-bold text-center">No</th>
                                        <th className="font-weight-bold text-center">Name</th>
                                        <th className="font-weight-bold text-center">Match Language</th>
                                        <th className="font-weight-bold text-center">Match Soft Skill</th>
                                        <th className="font-weight-bold text-center">Match Hard Skill</th>
                                        <th className="font-weight-bold text-center">Total Match</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.showCandidate(item.candidateSelect)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CandidateTable;