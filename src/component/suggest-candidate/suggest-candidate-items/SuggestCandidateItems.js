import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class SuggestCandidateItems extends Component {

    onSelect = (event) => {
        this.props.onSelect(event.target.checked, this.props.candidate)
    }

    checkSelectCandidate = (empID) => {
        var { candidateSelectedList } = this.props
        if (candidateSelectedList !== null) {
            for (let index = 0; index < candidateSelectedList.length; index++) {
                if (candidateSelectedList[index].empID === empID)
                    return true
            }
        }
        return false
    }

    render() {
        var { index, candidate } = this.props
        return (
            <tr>
                <th className="text-center">{index + 1}</th>
                <th className="">
                    <NavLink className='text-primary' to={`/project/suggest-candidate/emp/${candidate.empID}`}> {candidate.empName}</NavLink>
                </th>
                <th className="text-center">{candidate.languageMatch.toFixed(2)} / 10</th>
                <th className="text-center">{candidate.softSkillMatch.toFixed(2)} / 10</th>
                <th className="text-center">{candidate.hardSkillMatch.toFixed(2)} /10 </th>
                <th className="text-center">{candidate.overallMatch.toFixed(2)} / 100</th>
                <th className="text-center">
                    <input type="checkbox" onClick={this.onSelect} checked={this.checkSelectCandidate(candidate.empID)} />
                </th>
            </tr>
        );
    }
}

export default SuggestCandidateItems;