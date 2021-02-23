import axios from "axios";
import * as Config from "./Config";

export const convertList = (list) => {
    var result = []
    list.forEach(element => {
        result.push({ label: element.name, value: element.id })
    });
    return result;
}

export const callAPI = (endpoint, method = 'GET', body) => {
    try {
        return axios({
            method: method,
            url: `${Config.API_URL}/${endpoint}`,
            data: body
        });
    } catch (err) {
        console.log(err);
    }
};

export const showStatus = status => {
    switch (status) {
        case 0:
            return "Finish"
        default:
            break;
    }
}

export const showSpan = status => {
    switch (status) {
        case 0:
            return "badge-success"
        default:
            break;
    }
}

export const formatDate = date => {
    return date.split("-").reverse().join("-")
}