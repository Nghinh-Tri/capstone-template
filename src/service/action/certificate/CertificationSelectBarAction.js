import { Type } from "../../constant/index"

export const fetchCertification = () => {
    return {
        type: Type.FETCH_CERTIFICATION_LIST
    };
}

export const fetchCertificationSuccess = (certiList) => {
    return {
        type: Type.FETCH_CERTIFICATION_LIST,
        certiList
    };
}