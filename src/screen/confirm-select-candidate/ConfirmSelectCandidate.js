import React, { Component } from 'react';
import CandidateTable from '../../component/candidate-table/CandidateTable';
import ProgressBar from '../../component/progress-bar/ProgressBar';
import './ConfirmPage.css'
import * as Action from "../../service/action/suggest/SuggestCandidateAction";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { convertSuggestList } from '../../service/util/util';
import { checkSession } from '../../service/action/user/AuthenticateAction';
import { history } from '../../service/helper/History';
import { compose } from 'redux';
import BriefDetail from '../../component/brief-detail/BriefDetail';
import confirm from 'antd/lib/modal/confirm';
import TextArea from 'antd/lib/input/TextArea';
import { Modal } from 'antd';

class ConfirmSelectCandidate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isUpdate: false,
            confirmObj: {},
            click: false
        }
    }

    onDeleteCandiate = (empID, postion) => {
        this.props.removeCandidate(empID, postion)
    }

    showList = (candidateList) => {
        var result = null
        result = candidateList.map((item, index) => {
            return (<CandidateTable key={index} item={item} position={item.position} onDeleteCandiate={this.onDeleteCandiate} />)
        })
        return result
    }

    componentDidMount = () => {
        this.props.checkSession()
        this.props.fetchSelectCandidate()
        if (typeof this.props.location.state !== 'undefined')
            this.setState({ isUpdate: this.props.location.state.isUpdate })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.status !== this.props.status) {
            if (this.props.status)
                Modal.success({
                    title: 'Confirm Select Candidates Successfully',
                    onOk() {
                        localStorage.removeItem('positionRequire')
                        localStorage.removeItem('projectId')
                        localStorage.removeItem('isNewPosition')
                        localStorage.removeItem('projectName')
                        localStorage.removeItem('projectType')
                        localStorage.removeItem('projectField')
                        history.push("/project")
                    }
                })
            else
                Modal.error({
                    title: 'Confirm Select Candidates Failed'
                })
        }
    }

    componentWillReceiveProps = () => {
        var { rejectedCandidate, confirmSuggestList } = this.props
        var { confirmObj, click } = this.state
        if (click) {
            if (rejectedCandidate.message !== "" && rejectedCandidate.list.length > 0) {
                var content = ""
                this.props.rejectedCandidate.list.forEach(element => {
                    content = content + element + '\n'
                    console.log(element)

                });
                confirm({
                    title: 'There are employees that have been rejected in your list. Are you sure you still want to choose these employees?',
                    content: (<>
                        <TextArea defaultValue={content} disabled={true} autoSize={true}
                            style={{ color: 'black', backgroundColor: 'white', borderColor: 'white', cursor: 'default' }} />
                    </>),
                    okType: 'danger',
                    onOk: () => {
                        confirmSuggestList(confirmObj)
                        this.setState({ click: !this.state.click })
                    },
                    onCancel: () => { this.setState({ click: !this.state.click }) }
                });
            } else {
                if (confirmObj.candidates.length > 0) {
                    this.setState({ click: !this.state.click })
                    confirmSuggestList(confirmObj)
                }
            }
        }
    }

    onSuggest = () => {
        var { candidateList } = this.props
        var list = convertSuggestList(candidateList)
        var obj = { candidates: list }
        this.setState({ confirmObj: obj, click: !this.state.click })
        if (list.length > 0) {
            this.props.checkRejectedCandidate(obj)
        }
        else {
            this.props.confirmSuggestList(obj)
        }
    }

    onBack = () => {
        history.goBack()
    }

    render() {
        var { candidateList, location } = this.props
        return (
            <div>
                <ProgressBar current={3} />
                <BriefDetail />
                {candidateList.length === 0 ?
                    typeof location.state.isUpdate !== 'undefined' ?
                        location.state.isUpdate === "SuggestAgain" ?
                            history.push('/project/suggest-candidate', { type: 'SuggestAgain' })
                            :
                            <h4 className="text-center" style={{ fontStyle: 'italic', color: 'gray', }} >You did not select any candidate</h4>
                        :
                        <h4 className="text-center" style={{ fontStyle: 'italic', color: 'gray', }} >You did not select any candidate</h4>
                    :
                    this.showList(candidateList)
                }
                <div className="row pull-right" style={{ marginBottom: 10, marginTop: -10 }}>
                    <div className="col" >
                        <button onClick={this.onBack} type="button" className="btn btn-primary pull-right" style={{ width: 110, fontWeight: 600 }}>Back</button>
                    </div>
                    <div className="col">
                        <button type="button" className="btn btn-primary pull-right" onClick={this.onSuggest} style={{ width: 110, fontWeight: 600 }}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        candidateList: state.SuggestCandidateSelectedListReducer,
        rejectedCandidate: state.CheckRejectedCandidates,
        status: state.StatusReducer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchSelectCandidate: () => {
            dispatch(Action.fetchSelectedList())
        },
        removeCandidate: (candidate, position) => {
            dispatch(Action.unselectCandiate(candidate, position))
        },
        confirmSuggestList: suggestList => {
            dispatch(Action.confirmSuggestList(suggestList))
        },
        checkSession: () => {
            dispatch(checkSession())
        },
        checkRejectedCandidate: (suggestList) => {
            dispatch(Action.checkRejectCandidatesInSuggestList(suggestList))
        }
    }
}

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(ConfirmSelectCandidate);