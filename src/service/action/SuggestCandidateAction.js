import axios from "axios"
import { SUGGEST_CANDIDATE } from "../constant"
import { history } from "../helper/History"
import { API_URL } from "../util/util"
import { sendNotificate } from "./FirebaseAction"
import { getUserName } from "../util/util";
import { store } from "react-notifications-component"
import confirm from "antd/lib/modal/confirm"
import moment from "moment"

export const setPositionSelect = index => {
    return {
        type: SUGGEST_CANDIDATE.SET_SELECT_POSITION,
        index
    }
}

export const selectCandidate = (candidate, candidateList, limit) => {
    return {
        type: SUGGEST_CANDIDATE.SELECT_CANDIDATE,
        candidate, candidateList, limit
    }
}

export const selectAllCandidates = (candidateList) => {
    return {
        type: SUGGEST_CANDIDATE.SELECT_ALL_CANDIDATE,
        candidateList
    }
}

export const unselectCandiate = (candidate, position) => {
    return {
        type: SUGGEST_CANDIDATE.UNSELECT_CANDIDATE,
        candidate, position
    }
}

export const unselectAllCandiates = (position) => {
    return {
        type: SUGGEST_CANDIDATE.UNSELECT_ALL_CANDIDATE,
        position
    }
}

export const cancelSuggest = () => {
    var projectID = localStorage.getItem('projectId')
    return { type: SUGGEST_CANDIDATE.CANCEL_SUGGEST, projectID }
}

export const fetchSelectedList = () => {
    return {
        type: SUGGEST_CANDIDATE.FETCH_SELECTED_LIST
    }
}

export const fetchSuggestList = () => {
    var projectID = localStorage.getItem('projectId')
    var projectType = localStorage.getItem('projectType')
    var projectField = localStorage.getItem('projectField')
    var urlToGetListSuggest = `${API_URL}/User/candidate/${projectID}`
    var positionItem = JSON.parse(localStorage.getItem('positionRequire'))
    var position = { requiredPositions: positionItem, projectTypeID: parseInt(projectType), projectFieldID: parseInt(projectField) }
    return (dispatch) => {
        axios.post(
            urlToGetListSuggest,
            position,
            { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")} ` } }
        ).then(res => {
            console.log(res)
            if (res.status === 200) {
                dispatch(fetchSuggestListSuccess(res.data.resultObj))
            }
        }).catch(err => {
            console.log(err)
        })
    }
}

export const fetchSuggestListSuccess = (list) => {
    return {
        type: SUGGEST_CANDIDATE.FETCH_SUGGEST_LIST,
        list
    }
}

export const sortSuggestList = value => {
    return {
        type: SUGGEST_CANDIDATE.SORT_LIST,
        value
    }
}

export const checkRejectCandidatesInSuggestList = (suggestList) => {
    var projectID = localStorage.getItem('projectId')
    var checkUrl = `${API_URL}/Project/checkCandidate/${projectID}`
    return (dispatch) => {
        if (suggestList.candidates.length > 0) {
            axios.post(
                checkUrl,
                suggestList,
                { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")} ` } }
            ).then(res => {
                if (res.data.isSuccessed) {
                    dispatch(rejectedCandidate('', []))
                } else {
                    dispatch(rejectedCandidate(res.data.message, res.data.resultObj))
                }
            })
        } else {
            dispatch(rejectedCandidate('', []))
        }
    }
}

export const confirmSuggestList = (suggestList) => {
    var projectID = localStorage.getItem('projectId')
    var url = `${API_URL}/Project/addCandidate/${projectID}`
    var message = {
        title: `Project Manager ${getUserName()} sent a request`,
        body: '',
        topic: 'news',
        status: true,
        dateCreate: moment.now()
    }
    return (dispatch) => {
        if (suggestList.candidates.length === 0) {
            confirm({
                title: `We will send this request to Human Resources to recruit candidates`,
                okText: 'Yes',
                okType: 'danger',
                cancelText: 'No',
                onOk() {
                    axios.post(
                        url,
                        suggestList,
                        { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")} ` } }
                    ).then(res => {
                        if (res.status === 200) {
                            if (res.data.isSuccessed) {
                                var projectName = localStorage.getItem('projectName')
                                message.body = `Project '${projectName}' does not have enough suitable candidates`
                                setTimeout(() => {
                                    dispatch(sendNotificate(message))
                                }, 5000);
                                dispatch(confirmSuggestListSuccess())
                                localStorage.removeItem('positionRequire')
                                localStorage.removeItem('projectId')
                                localStorage.removeItem('isNewPosition')
                                localStorage.removeItem('projectName')
                                history.push("/project")
                            }
                        }
                    }).catch(err => {
                        dispatch(confirmSuggestListFail())
                        store.addNotification({
                            message: err.response.data.message,
                            type: "danger",
                            insert: "top",
                            container: "top-center",
                            animationIn: ["animated", "fadeIn"],
                            animationOut: ["animated", "fadeOut"],
                            dismiss: {
                                duration: 2000,
                                onScreen: false
                            }
                        })
                    })
                },
                onCancel() {
                    console.log('Cancel');
                },
            });
        } else {
            axios.post(
                url,
                suggestList,
                { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")} ` } }
            ).then(res => {
                if (res.status === 200) {
                    if (res.data.isSuccessed) {
                        console.log('ook', res.data)
                        var projectName = localStorage.getItem('projectName')
                        message.body = `Project '${projectName}' has candidates that need to be confirmed`
                        dispatch(confirmSuggestListSuccess())
                        dispatch(sendNotificate(message))
                    }
                }
            }).catch(err => {
                console.log('err', err.response)
                if (typeof err.response !== 'undefined') {
                    confirm({
                        title: `${err.response.data.message}. Cancel this request`,
                        okText: 'Yes',
                        cancelText: 'No',
                        onOk() {
                            history.push(`/project/detail/${projectID}`)
                            dispatch(confirmSuggestListFail())
                        },
                        onCancel() {
                            console.log('Cancel');
                        },
                    });
                }
            })
        }
    }
}

export const rejectedCandidate = (message, list) => {
    return { type: SUGGEST_CANDIDATE.REJECTED_CANDIDATE, message, list }
}

export const confirmSuggestListSuccess = () => {
    return (dispatch) => {
        dispatch(sendNotiSuccess())
    }
}

export const sendNotiSuccess = () => {
    history.push("/project")
    localStorage.removeItem('positionRequire')
    localStorage.removeItem('projectId')
    localStorage.removeItem('isNewPosition')
    localStorage.removeItem('projectName')
    localStorage.removeItem('projectType')
    localStorage.removeItem('projectField')
    return { type: SUGGEST_CANDIDATE.CONFIRM_SUGGEST }
}

export const confirmSuggestListFail = () => {
    return { type: SUGGEST_CANDIDATE.CONFIRM_SUGGEST_FAIL }
}