import React, { Component } from 'react';
import CandidateTable from '../../component/confirm-candidate/CandidateTable';
import ProgressBar from '../../component/progress-bar/ProgressBar';
import './ConfirmPage.css'
import * as Action from "../../service/action/SuggestCandidateAction";
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { convertSuggestList } from '../../service/util/util';

class ConfirmSelectCandidate extends Component {

    showList = (candidateList) => {
        var result = null
        result = candidateList.map((item, index) => {
            return (<CandidateTable key={index} item={item} />)
        })
        return result
    }

    componentDidMount = () => {
        this.props.fetchSelectCandidate()
    }

    onSuggest = () => {
        var { candidateList } = this.props
        var list = convertSuggestList(candidateList)
        var obj = { candidates: list }
        this.props.confirmSuggestList(obj)
    }

    render() {
        var { candidateList } = this.props
        return (
            <div>
                <ProgressBar step="step4" />
                <div className='card mb-80'>
                    {this.showList(candidateList)}
                </div>
                <div className="row pull-right">
                    <div className="col">
                        <NavLink to="/project/suggest-candidate">
                            <button type="button" className="btn btn-primary pull-right" style={{ width: 110, fontWeight: 600 }}>Back</button>
                        </NavLink>
                    </div>
                    <div className="col">
                        <button type="button" className="btn btn-primary pull-right" onClick={this.onSuggest} style={{ width: 110, fontWeight: 600 }}>Suggest</button>
                    </div>
                </div>

            </div>


        );
    }
}

const mapStateToProps = state => {
    return {
        candidateList: state.SuggestCandidateSelectedListReducer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchSelectCandidate: () => {
            dispatch(Action.fetchSelectedList())
        },
        confirmSuggestList: suggestList => {
            dispatch(Action.confirmSuggestList(suggestList))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmSelectCandidate);