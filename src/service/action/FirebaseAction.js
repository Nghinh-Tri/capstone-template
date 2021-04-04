import axios from "axios"
import { FIREBASE } from "../constant"
import { API_URL } from "../util/util"

export const sendNotificate = () => {
    var url = `${API_URL}/Notification?topic=news`
    var message = {
        title: "string",
        body: "string"
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

export const sendNotificateSuccess = () => {
    return { type: FIREBASE.RECIEVE_MESSAGE }
}