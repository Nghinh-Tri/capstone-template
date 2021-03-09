import { Type } from "../constant/index"
import axios from "axios";
import { API_URL } from "../util/util";

export const fetchPostionList = () => {
    var url = `${API_URL}/Position/getPositions`
    return (dispatch) => {
        axios.get(
            url,
            { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")}` } }
        ).then(res => {
            dispatch(fetchPostionListSuccess(res.data.resultObj))
        })
    }
}

export const fetchPostionListSuccess = (positionList) => {
    return {
        type: Type.FETCH_POSITION_LIST,
        positionList
    }
}