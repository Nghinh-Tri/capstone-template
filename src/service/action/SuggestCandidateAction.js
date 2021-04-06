import axios from "axios"
import { SUGGEST_CANDIDATE } from "../constant"
import { history } from "../helper/History"
import { API_URL } from "../util/util"
import { sendNotificate } from "./FirebaseAction"
import { getUserName } from "../util/util";
import { store } from "react-notifications-component"

export const setPositionSelect = index => {
    return {
        type: SUGGEST_CANDIDATE.SET_SELECT_POSITION,
        index
    }
}

export const selectCandidate = (candidate, candidateList) => {
    return {
        type: SUGGEST_CANDIDATE.SELECT_CANDIDATE,
        candidate,candidateList
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
    var urlToGetListSuggest = `${API_URL}/User/candidate/${projectID}`
    var positionItem = JSON.parse(localStorage.getItem('positionRequire'))
    var position = { requiredPositions: positionItem, projectTypeID: parseInt(projectType) }
    return (dispatch) => {
        axios.post(
            urlToGetListSuggest,
            position,
            { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")} ` } }
        ).then(res => {
            if (res.status === 200) {
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

export const confirmSuggestList = suggestList => {
    var projectID = localStorage.getItem('projectId')
    var url = `${API_URL}/Project/addCandidate/${projectID}`
    return (dispatch) => {
        if (suggestList.candidates.length === 0) {
            dispatch(confirmSuggestListFail())
            store.addNotification({
                message: "Please select candidates",
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
                        dispatch(sendNotificate(getUserName(), projectName))
                        localStorage.removeItem('positionRequire')
                        localStorage.removeItem('projectId')
                        localStorage.removeItem('isNewPosition')
                        localStorage.removeItem('projectName')
                        history.push("/project")
                    } else {
                        dispatch(confirmSuggestListFail())
                        store.addNotification({
                            message: res.data.message,
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
                    }
                }
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