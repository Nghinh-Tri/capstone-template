import React, { Component } from 'react';

class SuggestCandidateItems extends Component {

    onSelect = (event) => {
        this.props.onSelect(event.target.checked)
    }

    render() {
        return (
            <tr>
                <th className="text-center">1</th>
                <th className="text-center">ID</th>
                <th className="text-center">Name</th>
                <th className="text-center">Skill</th>
                <th className="text-center">90 %</th>
                <th className="text-center">
                    <input type="checkbox" onClick={this.onSelect} />
                </th>
            </tr>
        );
    }
}

export default SuggestCandidateItems;