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
            this.props.onSelectCandidate(candidate, this.props.item)
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
        console.log('item',item)
        console.log('selectedItem',selectedItem)
        return (
            <div className="card">
                <div className="card-header card-header-primary">
                    <div className="row">
                        <div className="col-9">
                            <h4 className="font-weight-bold" style={{ color: 'whitesmoke' }}>{item.position}</h4>
                        </div>
                        <div className="col">
                            <h4 className="font-weight-bold pull-right" style={{ color: 'whitesmoke' }}>Select - {selectedItem === null ? 0 : selectedItem.candidateSelect.length}</h4>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="form-group">
                        <div className="row">
                            <div className="card-body">
                                <div className="" >
                                    <table className="table">
                                        <thead className=" text-primary">
                                            <tr>
                                                <th className="font-weight-bold text-center">No</th>
                                                <th className="font-weight-bold">Name</th>
                                                <th className="font-weight-bold text-center">
                                                    <div className='row justify-content-center'>
                                                        <div className='col-auto align-self-center' style={{ paddingRight: 0 }}>
                                                            Match Language
                                                        </div>
                                                        <div className='col-1' style={{ paddingLeft: 0, cursor: "pointer" }}>
                                                            <i className="material-icons" name='langugage' style={{ paddingTop: 5 }} onClick={this.onSortLanguage}>swap_vert</i>
                                                        </div>
                                                    </div>
                                                </th>
                                                <th className="font-weight-bold text-center">
                                                    <div className='row justify-content-center '>
                                                        <div className='col-auto align-self-center' style={{ paddingRight: 0 }}>
                                                            Match Soft Skill
                                                        </div>
                                                        <div className='col-1' style={{ paddingLeft: 0, cursor: "pointer" }}>
                                                            <i className="material-icons" style={{ paddingTop: 5 }} onClick={this.onSortSoftSkill}>swap_vert</i>
                                                        </div>
                                                    </div>
                                                </th>
                                                <th className="font-weight-bold text-center">
                                                    <div className='row justify-content-center '>
                                                        <div className='col-auto align-self-center' style={{ paddingRight: 0 }}>
                                                            Match Hard Skill
                                                        </div>
                                                        <div className='col-1' style={{ paddingLeft: 0, cursor: "pointer" }}>
                                                            <i className="material-icons" style={{ paddingTop: 5 }} onClick={this.onSortHardSkill}>swap_vert</i>
                                                        </div>
                                                    </div>
                                                </th>
                                                <th className="font-weight-bold text-center">
                                                    <div className='row justify-content-center '>
                                                        <div className='col-auto align-self-center' style={{ paddingRight: 0 }}>
                                                            Overall Match
                                                        </div>
                                                        <div className='col-1' style={{ paddingLeft: 0, cursor: "pointer" }}>
                                                            <i className="material-icons" style={{ paddingTop: 5 }} onClick={this.onSortOverall}>swap_vert</i>
                                                        </div>
                                                    </div>
                                                </th>
                                                <th className="font-weight-bold text-center">
                                                    <input type="checkbox" onClick={this.onSelectAll} checked={selectedItem === null ? false : selectedItem.selectAll} />
                                                </th>
                                            </tr>
                                        </thead>
                                        {item.matchDetail.length === 0 ?
                                            ''
                                            :
                                            <tbody>
                                                {this.showCandidate(item.matchDetail, selectedItem)}
                                            </tbody>
                                        }
                                    </table>
                                    {item.matchDetail.length === 0 ?
                                        <h4 className="text-center" style={{ fontStyle: 'italic', color: 'gray' }} >No data</h4>
                                        : ''}
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