import React, { Component } from 'react';
import CandidateTable from '../../component/confirm-candidate/CandidateTable';
import ProgressBar from '../../component/progress-bar/ProgressBar';
import './ConfirmPage.css'
import * as Action from "../../service/action/SuggestCandidateAction";
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { convertSuggestList } from '../../service/util/util';
import { checkSession } from '../../service/action/AuthenticateAction';
import { history } from '../../service/helper/History';
import { compose } from 'redux';

class ConfirmSelectCandidate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isUpdate: false
        }
    }

    showList = (candidateList) => {
        var result = null
        result = candidateList.map((item, index) => {
            return (<CandidateTable key={index} item={item} />)
        })
        return result
    }

    componentDidMount = () => {
        this.props.checkSession()
        this.props.fetchSelectCandidate()
        if (typeof this.props.location.state !== 'undefined')
            this.setState({ isUpdate: this.props.location.state.isUpdate })
    }

    onSuggest = () => {
        var { candidateList } = this.props
        var list = convertSuggestList(candidateList)
        var obj = { candidates: list }
        this.props.confirmSuggestList(obj)
    }

    onBack = () => {
        history.push('/project/suggest-candidate', { isUpdate: this.state.isUpdate })
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
                        <button onClick={this.onBack} type="button" className="btn btn-primary pull-right" style={{ width: 110, fontWeight: 600 }}>Back</button>
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
        },
        checkSession: () => {
            dispatch(checkSession())
        }
    }
}

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(ConfirmSelectCandidate);