import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import SuggestCandidates from '../../components/suggest-candidate/SuggestCandidates';

class SuggestCandidate extends Component {
    render() {
        return (
            <div>
                <SuggestCandidates />
                <SuggestCandidates />
                <NavLink to="/project">
                    <button type="submit" className="btn btn-primary pull-right pt">Next</button>
                </NavLink>
                <button type="submit" className="btn btn-primary pull-right pt">Back</button>
            </div>
        );
    }
}

export default SuggestCandidate;