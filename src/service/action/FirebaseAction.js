import axios from "axios"
import { FIREBASE } from "../constant"
import { API_URL } from "../util/util"
import { fetchProject } from "./ProjectAction";

export const sendNotificate = (pmName, projectName) => {
    var url = `${API_URL}/Notification?topic=news`
    console.log('noti', projectName)
    var message = {
        title: `Project Manager ${pmName} send you a request`,
        body: `Project ${projectName} has been create`
    }
    return (dispatch) => {
        axios.post(
            url,
            message,
            { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")}` } }
        ).then(res => {
            dispatch(sendNotificateSuccess())
        })
    }
}

export const recieveNotificate = (token) => {
    var empID = JSON.parse(localStorage.getItem('EMP'))
    var url = `${API_URL}/Notification/subscription?token=${token}&topic=${empID}`
    return (dispatch) => {
        axios.post(
            url,
            { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")}` } }
        ).then(res => {
            dispatch(fetchProject(1, ''))
        })
    }
}

export const sendNotificateSuccess = () => {
    return { type: FIREBASE.RECIEVE_MESSAGE }
}