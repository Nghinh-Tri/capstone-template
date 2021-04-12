import axios from "axios"
import { alertConstants, FIREBASE } from "../constant"
import { API_URL } from "../util/util"
import { fetchProject } from "./ProjectAction";

export const sendNotificate = (message) => {
    var url = `${API_URL}/Notification?topic=news`    
    return (dispatch) => {
        if (localStorage.getItem('token') !== null) {
            axios.post(
                url,
                message,
                { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")}` } }
            ).then(res => {
                dispatch(sendNotificateSuccess())
            })
        } else {
            dispatch(recieveNotificateFail())
        }
    }
}

export const recieveNotificate = (token) => {
    var empID = JSON.parse(localStorage.getItem('EMP'))
    var url = `${API_URL}/Notification/subscription?token=${token}&topic=pm${empID}`
    return (dispatch) => {
        if (localStorage.getItem('token') !== null) {
            axios.post(
                url,
                { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")}` } }
            ).then(res => {
                dispatch(fetchProject(1, ''))
            })
        } else {
            dispatch(recieveNotificateFail())
        }
    }
}

export const sendNotificateSuccess = () => {
    return { type: FIREBASE.RECIEVE_MESSAGE }
}

export const sendNotificateFail = () => {
    return { type: FIREBASE.RECIEVE_MESSAGE }
}

export const recieveNotificateFail = () => {
    return { type: alertConstants.ERROR }
}