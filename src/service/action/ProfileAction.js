import axios from "axios";
import { Type } from "../constant";
import { API_URL } from "../util/util";

export const fetchProfileDetail = (id) => {
    var url = `${API_URL}/User/${id}`
    return (dispatch) => {
        return axios.get(
            url,
            { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } }
        ).then(res => {
            dispatch(fetchProfileDetailSuccess(res.data.resultObj))
        })
    }
}

export const fetchPositionProfileDetail = (id) => {
    var url = `${API_URL}/User/getEmpInfo/${id}`
    return (dispatch) => {
        return axios.get(
            url,
            { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } }
        ).then(res => {
            dispatch(fetchPositionProfileDetailSuccess(res.data.resultObj))
        })
    }
}


export const fetchProfileDetailSuccess = (resultObj) => {
    return {
        type: Type.FETCH_PROFILE_DETAIL,
        resultObj
    }
}

export const fetchPositionProfileDetailSuccess = (resultObj) => {
    return {
        type: Type.FETCH_POSITION_PROFILE_DETAIL,
        resultObj
    }
}
