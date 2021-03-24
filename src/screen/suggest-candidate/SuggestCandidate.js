import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ProgressBar from '../../component/progress-bar/ProgressBar';
import SuggestCandidates from '../../component/suggest-candidate/SuggestCandidatesTable'
import * as Action from "../../service/action/SuggestCandidateAction";
import '../../css/SuggestNav.css'
import { checkSession } from '../../service/action/AuthenticateAction';

class SuggestCandidate extends Component {

    componentDidMount = () => {
        this.props.checkSession()
        this.props.fetchSuggestCandidateList()
    }

    onSelected = (index) => {
        this.props.onPositionSelect(index)
    }

    showPosition = () => {
        var { suggestCandidateList, selectedIndex } = this.props
        var result = null;
        result = suggestCandidateList.map((item, index) => {
            return (
                <li className='li' key={index}>
                    <a className={selectedIndex === index ? 'active' : ''} onClick={() => this.onSelected(index)}>{item.position}</a>
                </li>
            )
        })
        return result
    }

    selectCandidate = (candidate, position, posId) => {
        this.props.selectCandidate(candidate, position, posId)
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

    onSort = (value) => {
        this.props.onSortSuggestList(value)
    }

    render() {
        var { suggestCandidateList, selectedIndex, candidateSelectedList } = this.props
        console.log(candidateSelectedList)
        console.log(suggestCandidateList)
        return (
            <div>
                <ProgressBar step="step3" />
                <div className="row">
                    <div className='col-2'>
                        <ul className='ul'>
                            {this.showPosition()}
                        </ul>
                    </div>
                    <div className='col'>
                        {suggestCandidateList.length > 0 ?
                            <SuggestCandidates
                                onSort={this.onSort}
                                item={suggestCandidateList[selectedIndex]}
                                onSelectCandidate={this.selectCandidate}
                                selectedItem={this.getSelectedCandidateList(suggestCandidateList[selectedIndex], candidateSelectedList)}
                                onUnselectCandidate={this.unselectCandidate}
                            /> :
                            ''
                        }
                    </div>
                </div>
                <div className="row pull-right">
                    <NavLink to="/project/confirm-select-candidates">
                        <button type="submit" className="btn btn-primary pull-right pt" style={{ marginBottom: 20, marginRight: 20, marginTop:0 }}>Next</button>
                    </NavLink>
                </div>

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
        selectCandidate: (candidate, position, posId) => {
            dispatch(Action.selectCandidate(candidate, position, posId))
        },
        unSelectCandidate: (candidate, position) => {
            dispatch(Action.unselectCandiate(candidate, position))
        },
        fetchSuggestCandidateList: () => {
            dispatch(Action.fetchSuggestList())
        },
        onSortSuggestList: value => {
            dispatch(Action.sortSuggestList(value))
        },
        checkSession: () => {
            dispatch(checkSession())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SuggestCandidate);