import axios from "axios"
import { alertConstants, FIREBASE } from "../constant"
import { API_URL } from "../util/util"
import { fetchProject } from "./project/ProjectAction";

export const sendNotificate = (message) => {
    var sendUrl = `${API_URL}/Notification?topic=news`
    console.log(message)
    var token = JSON.parse(localStorage.getItem('FirebaseToken'))
    return (dispatch) => {
        if (localStorage.getItem('token') !== null && token !== null) {
            var unsubcriptUrl = `${API_URL}/Notification/unsubscription?token=${token}&topic=news`
            axios.post(
                unsubcriptUrl,
                { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")}` } }
            ).then(
                axios.post(
                    sendUrl,
                    message,
                    { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")}` } }
                ).then(res => {
                    axios.post(
                        unsubcriptUrl,
                        { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")}` } }
                    ).then(
                        dispatch(sendNotificateSuccess())
                    )
                })
            )
        } else {
            dispatch(recieveNotificateFail())
        }
    }
}

export const recieveNotificate = (token) => {
    var empID = JSON.parse(localStorage.getItem('EMP'))
    var url = `${API_URL}/Notification/subscription?token=${token}&topic=pm${empID}`
    console.log(url)
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