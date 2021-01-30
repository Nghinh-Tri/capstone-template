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