import { Type } from "../constant/index"
import axios from "axios";
import { API_URL } from "../util/util";

export const fetchCertification = () => {
    var url = `${API_URL}/Certification/getCertifications`
    return (dispatch) => {
        axios.get(
            url,
            { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")}` } }
        ).then(res => {
            dispatch(fetchCertificationSuccess(res.data.resultObj))
        })
    }
}

export const fetchCertificationSuccess = (certiList) => {
    return {
        type: Type.FETCH_CERTIFICATION_LIST,
        certiList
    };
}