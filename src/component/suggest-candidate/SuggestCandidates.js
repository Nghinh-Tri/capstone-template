import React, { Component } from 'react';
import SuggestCandidateItems from './suggest-candidate-items/SuggestCandidateItems';

class SuggestCandidates extends Component {

    constructor(props) {
        super(props);
        this.state = {
            select: 0
        }
    }

    onSelect = (value, candidate) => {
        if (value) {
            this.props.onSelectCandidate(candidate, this.props.item.position)
        }
        else{
            this.props.onUnselectCandidate(candidate, this.props.item.position)
        }
    }

    showCandidate = (candidateList, selectedItem) => {
        var result = null
        result = candidateList.map((candidate, index) => {
            return (<SuggestCandidateItems key={index}
                onSelect={this.onSelect}
                candidate={candidate}
                index={index}
                candidateSelectedList={selectedItem === null ? null : selectedItem.candidateSelect}
            />)
        })
        return result
    }

    render() {
        var { item, selectedItem } = this.props
        return (
            <div className="card mb-80">
                <div className="card-header card-header-primary">
                    <div className="row">
                        <div className="col-9">
                            <h4 className="font-weight-bold">{item.position}</h4>
                        </div>
                        <div className="col">
                            <h4 className="font-weight-bold pull-right">Select - {selectedItem === null ? 0: selectedItem.candidateSelect.length}</h4>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="form-group">
                        <div className="row">
                            <div className="card-body">
                                <div className="table-responsive">
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
                                            {this.showCandidate(item.matchDetail, selectedItem)}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

        );
    }
}

export default SuggestCandidates;