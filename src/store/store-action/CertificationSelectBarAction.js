import * as Types from "../store-constant"
import {callAPI} from "../../util/index";

export const fetchCertification = () => {
    return (dispatch) => {
        return callAPI('Certification', 'GET', null).then(res => {
            dispatch(fetchCertificationSuccess(res.data))
        })
    }
}

export const fetchCertificationSuccess = (certiList) => {
    return {
        type: Types.FETCH_CERTIFICATION_LIST,
        certiList
    };
}