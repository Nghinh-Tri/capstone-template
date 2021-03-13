import axios from "axios";

export const API_URL = "https://esms2020.azurewebsites.net/api"

export const callAPI = (endpoint, method = 'GET', body) => {
    return axios({
        method: method,
        url: `${API_URL}/${endpoint}`,
        data: body
    });
};

export const showStatus = status => {
    switch (status) {
        case 0:
            return "Pending "
        case 1:
            return "On Going"
        case 2:
            return "Finish"
        default:
            break;
    }
}

export const showSpan = status => {
    switch (status) {
        case 0:
            return "badge-secondary"
        case 1:
            return "badge-primary"
        case 2:
            return "badge-success"
        default:
            break;
    }
}

export const formatDate = date => {
    return date.split("/").reverse().join("-")
}

export const convertPositionList = (list) => {
    var result = []
    list.forEach(element => {
        result.push({
            label: element.name,
            value: element.posID,
            isSelect: typeof element.isSelect === 'undefined' ? false : element.isSelect
        })
    });
    return result;
}

export const convertSkillList = (list) => {
    var result = []
    list.forEach(element => {
        result.push({
            label: element.skillName,
            value: element.skillID,
            isSelect: typeof element.isSelect === 'undefined' ? false : element.isSelect
        })
    });
    return result;
}

export const convertCertificationList = (list) => {
    var result = []
    list.forEach(element => {
        result.push({ label: element.certificationLevel, value: element.certificationLevel })
    });
    return result;
}

export const convertLanguageList = (list) => {
    var result = []
    list.forEach(element => {
        result.push({
            label: element.langName,
            value: element.langID,
            isSelect: typeof element.isSelect === 'undefined' ? false : element.isSelect
        })
    });
    return result;
}

const converListCandidate = list => {
    var candidates = []
}