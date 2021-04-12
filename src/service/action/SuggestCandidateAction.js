import axios from "axios"
import { SUGGEST_CANDIDATE } from "../constant"
import { history } from "../helper/History"
import { API_URL } from "../util/util"
import { sendNotificate } from "./FirebaseAction"
import { getUserName } from "../util/util";
import { store } from "react-notifications-component"
import confirm from "antd/lib/modal/confirm"

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
            if (res.status === 200) {
                console.log(res.data)
                dispatch(fetchSuggestListSuccess(res.data))
            }
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

export const confirmSuggestList = (suggestList) => {
    var projectID = localStorage.getItem('projectId')
    var url = `${API_URL}/Project/addCandidate/${projectID}`
    var message = { title: `Project Manager ${getUserName()} send a request`, body: '' }

    return (dispatch) => {
        if (suggestList.candidates.length === 0) {
            confirm({
                title: `We will send this request to Human Resource to recruit candidates`,
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
                                dispatch(confirmSuggestListSuccess())
                                message.body = `Project '${projectName}' not have enough candidates to select`
                                dispatch(sendNotificate(message))
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
                        var projectName = localStorage.getItem('projectName')
                        dispatch(confirmSuggestListSuccess())
                        message.body = `Project '${projectName}' need to confirm candidates`
                        dispatch(sendNotificate(message))
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
        }
    }
}

export const confirmSuggestListSuccess = () => {
    return { type: SUGGEST_CANDIDATE.CONFIRM_SUGGEST }
}

export const confirmSuggestListFail = () => {
    return { type: SUGGEST_CANDIDATE.CONFIRM_SUGGEST_FAIL }
}