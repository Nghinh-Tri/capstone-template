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

class ConfirmSelectCandidate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isUpdate: false,
            isRejected: false,
            title: '',
            content: ''
        }
    }

    // componentDidUpdate = (prevProp) => {
    //     if (prevProp.rejectedCandidate !== this.props.rejectedCandidate) {
    //         console.log('componentDidUpdate', this.props.rejectedCandidate.message)

    //     }
    // }

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

    componentWillReceiveProps = () => {
        if (this.props.rejectedCandidate.message !== "") {
            var content = ""
            this.props.rejectedCandidate.list.forEach(element => {
                content = content + element + '\n'
            });
            console.log('componentWillReceiveProps', content, this.props.rejectedCandidate.message)

            this.setState({
                isRejected: true,
                title: this.props.rejectedCandidate.message + ". Are you sure you want to suggest those candidates.",
                content: content
            })
        }

    }

    onSuggest = () => {
        var { candidateList, confirmSuggestList } = this.props
        var list = convertSuggestList(candidateList)
        var obj = { candidates: list }
        // this.props.checkRejectedCandidate(obj)
        // if (this.state.isRejected) {
        //     var { title, content } = this.state
        //     console.log('onSuggest', title, content)
        //     confirm({
        //         title: this.state.title,
        //         content: (<>
        //             <TextArea defaultValue={this.state.content} disabled={true} autoSize={true}
        //                 style={{ color: 'black', backgroundColor: 'white', borderColor: 'white', cursor: 'default' }} />
        //         </>),
        //         okType: 'danger',
        //         onOk() { confirmSuggestList(obj) }
        //     });
        // } else 

        confirmSuggestList(obj)

    }

    onBack = () => {
        // history.push('/project/suggest-candidate', { isUpdate: this.state.isUpdate })
        history.goBack()
    }

    render() {
        var { candidateList } = this.props
        return (
            <div>
                <ProgressBar current={3} />
                <BriefDetail />
                {candidateList.length === 0 ?
                    <h4 className="text-center" style={{ fontStyle: 'italic', color: 'gray', }} >You did not select any candidate</h4>
                    :
                    this.showList(candidateList)
                }
                <div className="row pull-right" style={{ marginBottom: 10, marginTop: -10 }}>
                    <div className="col" >
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
        candidateList: state.SuggestCandidateSelectedListReducer,
        rejectedCandidate: state.CheckRejectedCandidates
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