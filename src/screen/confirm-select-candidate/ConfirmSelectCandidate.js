import React, { Component } from 'react';
import CandidateTable from '../../component/confirm-candidate/CandidateTable';
import ProgressBar from '../../component/progress-bar/ProgressBar';
import './ConfirmPage.css'
import * as Action from "../../service/action/SuggestCandidateAction";
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

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

    render() {
        var { candidateList } = this.props
        return (
            <div>
                <ProgressBar step="step4" />
                <div className='card mb-80'>
                    {this.showList(candidateList)}
                </div>
                <NavLink to="/project/suggest-candidate">
                    <button type="button" className="btn btn-primary pull-right pt">Back</button>
                </NavLink>
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
            dispatch(Action.fetchList())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmSelectCandidate);