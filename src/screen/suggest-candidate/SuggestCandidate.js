import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ProgressBar from '../../component/progress-bar/ProgressBar';
import SuggestCandidates from '../../component/suggest-candidate/SuggestCandidates';
import * as Action from "../../service/action/SuggestCandidateAction";
import '../../css/SuggestNav.css'

class SuggestCandidate extends Component {
    constructor(props) {
        super(props);
    }

    onSelected = (index) => {
        this.props.onPositionSelect(index)
    }

    showPosition = () => {
        var { suggestCandidateList, selectedIndex } = this.props
        var result = null;
        result = suggestCandidateList.map((item, index) => {
            return (
                <li className='li'>
                    <a key={index} className={selectedIndex === index ? 'active' : ''} onClick={() => this.onSelected(index)} >{item.position}</a>
                </li>
            )
        })
        return result
    }

    selectCandidate = (candidate, position) => {
        this.props.selectCandidate(candidate, position)
    }

    unselectCandidate = (candidate, position) => {
        this.props.unSelectCandidate(candidate, position)
    }

    getSelectedCandidateList = (suggestCandidateItem, selecedCandidateList) => {
        for (let k = 0; k < selecedCandidateList.length; k++) {
            if (suggestCandidateItem.position === selecedCandidateList[k].position)
                return selecedCandidateList[k]
        }
        return null
    }

    render() {
        var { suggestCandidateList, selectedIndex, candidateSelectedList } = this.props
        return (
            <div>
                <ProgressBar step="step3" />
                <div class="row">
                    <div className='col-2'>
                        <ul className='ul'>
                            {this.showPosition()}
                        </ul>
                    </div>
                    <div className='col'>
                        <SuggestCandidates
                            item={suggestCandidateList[selectedIndex]}
                            onSelectCandidate={this.selectCandidate}
                            selectedItem={this.getSelectedCandidateList(suggestCandidateList[selectedIndex], candidateSelectedList)}
                            onUnselectCandidate={this.unselectCandidate}
                        />
                    </div>
                </div>
                <NavLink to="/project/confirm-select-candidates">
                    <button type="submit" className="btn btn-primary pull-right pt">Next</button>
                </NavLink>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        suggestCandidateList: state.SuggestCandidateList,
        selectedIndex: state.SuggestCandidateSelect,
        candidateSelectedList: state.SuggestCandidateSelectedListReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onPositionSelect: index => {
            dispatch(Action.setPositionSelect(index))
        },
        selectCandidate: (candidate, position) => {
            dispatch(Action.selectCandidate(candidate, position))
        },
        unSelectCandidate: (candidate, position) => {
            dispatch(Action.unselectCandiate(candidate, position))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SuggestCandidate);