import { FETCH_POSITION_LIST } from "../store-constant"
import {callAPI} from "../../util/index";

export const fetchPostionList = () => {
    return (dispatch) => {
        return callAPI('Position', 'GET', null).then(res => {
            dispatch(fetchPostionListSuccess(res.data))
        })
    }
}

export const fetchPostionListSuccess = (positionList) => {
    return {
        type: FETCH_POSITION_LIST,
        positionList
    }
}