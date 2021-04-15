import { Checkbox } from 'antd';
import React, { Component } from 'react';
import SuggestCandidateItems from './suggest-candidate-items/SuggestCandidateItems';

class SuggestCandidates extends Component {

    onSortLanguage = () => {
        this.props.onSort('language')
    }

    onSortSoftSkill = () => {
        this.props.onSort('softSkill')
    }

    onSortHardSkill = () => {
        this.props.onSort('hardSkill')
    }

    onSortOverall = () => {
        this.props.onSort('overall')
    }

    onSelect = (value, candidate) => {
        if (value) {
            this.props.onSelectCandidate(candidate, this.props.item, this.getCandidateNeeds(this.props.item.posId))
        }
        else {
            this.props.onUnselectCandidate(candidate, this.props.item.position)
        }
    }

    onSelectAll = (event) => {
        var value = event.target.checked
        if (value)
            this.props.onSelectAll(this.props.item)
        else
            this.props.onUnSelectAll(this.props.item.position)
    }

    showCandidate = (candidateList, selectedItem, candidateNeeds) => {
        var { item } = this.props
        var result = null
        result = candidateList.map((candidate, index) => {
            return (<SuggestCandidateItems key={index}
                onSelect={this.onSelect}
                candidate={candidate}
                index={index}
                candidateNeeds={candidateNeeds}
                position={item.position}
                candidateSelectedList={selectedItem === null ? null : selectedItem}
            />)
        })
        return result
    }

    getCandidateNeeds = (posId) => {
        var candidateNeeds = 0
        // var require = JSON.parse(localStorage.getItem('positionRequire'))
        var require = [
            {
                posID: 4,
                candidateNeeded: 6,
                language: [
                    { langID: 1, priority: 10 }
                ],
                softSkillIDs: [
                    20, 22, 24, 26, 27, 29, 36, 40, 43, 47
                ],
                hardSkills: [
                    { hardSkillID: 1, certificationLevel: 0, priority: 10, skillLevel: 1 },
                    { hardSkillID: 2, certificationLevel: 0, priority: 10, skillLevel: 1 },
                    { hardSkillID: 7, certificationLevel: 0, priority: 10, skillLevel: 1 },
                    { hardSkillID: 13, certificationLevel: 0, priority: 10, skillLevel: 1 },
                    { hardSkillID: 62, certificationLevel: 0, priority: 10, skillLevel: 1 },
                ]
            },
            {
                posID: 13,
                candidateNeeded: 5,
                language: [
                    { langID: 1, priority: 10 }
                ],
                softSkillIDs: [
                    20, 22, 24, 26, 27, 29, 36, 40, 43, 47
                ],
                hardSkills: [
                    { hardSkillID: 3, certificationLevel: 0, priority: 10, skillLevel: 1 },
                    { hardSkillID: 5, certificationLevel: 0, priority: 10, skillLevel: 1 },
                    { hardSkillID: 6, certificationLevel: 0, priority: 10, skillLevel: 1 },
                ]
            }
        ]
        require.forEach(element => {
            if (element.posID === posId)
                candidateNeeds = element.candidateNeeded
        });
        return candidateNeeds
    }

    render() {
        var { item, selectedItem } = this.props
        var candidateNeeds = this.getCandidateNeeds(item.posId)
        return (
            <React.Fragment>
                <div class="table-responsive">
                    <h5 className="pull-right" style={{ marginTop: 0 }}>Select {selectedItem === null ? 0 : selectedItem.candidateSelect.length} / {candidateNeeds} </h5>

                    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                        <thead>
                            <tr>
                                <th className="font-weight-bold text-center">No</th>
                                <th className="font-weight-bold">Name</th>
                                <th className="font-weight-bold text-center">
                                    Match Language
                                    <i className="material-icons" name='langugage' style={{ marginTop: -10, cursor: 'pointer' }} onClick={this.onSortLanguage}>swap_vert</i>
                                </th>
                                <th className="font-weight-bold text-center">
                                    Match Soft Skill
                                    <i className="material-icons" style={{ marginTop: -10, cursor: 'pointer' }} onClick={this.onSortSoftSkill}>swap_vert</i>
                                </th>
                                <th className="font-weight-bold text-center">
                                    Match Hard Skill
                                    <i className="material-icons" style={{ marginTop: -10, cursor: 'pointer' }} onClick={this.onSortHardSkill}>swap_vert</i>
                                </th>
                                <th className="font-weight-bold text-center">
                                    Overall Match
                                    <i className="material-icons" style={{ marginTop: -10, cursor: 'pointer' }} onClick={this.onSortOverall}>swap_vert</i>
                                </th>
                                <th className="font-weight-bold text-center">
                                    {candidateNeeds >= item.matchDetail.length ?
                                        <input type="checkbox" onClick={this.onSelectAll} checked={selectedItem === null ? false : selectedItem.selectAll} />
                                        : ''}
                                </th>
                            </tr>
                        </thead>
                        {typeof item.matchDetail !== 'undefined' ? (
                            <tbody>
                                {this.showCandidate(typeof item.matchDetail !== 'undefined' ? item.matchDetail : [], selectedItem, candidateNeeds)}
                            </tbody>
                        ) : ('')}
                    </table>
                </div>
                {typeof item.matchDetail !== 'undefined' ?
                    item.matchDetail.length === 0 ?
                        <div className='row justify-content-center' style={{ width: 'auto' }} >
                            <h4 style={{ fontStyle: 'italic', color: 'gray' }} >No data</h4>
                        </div>
                        : ''
                    : ''}
            </React.Fragment>
        );
    }
}

export default SuggestCandidates;