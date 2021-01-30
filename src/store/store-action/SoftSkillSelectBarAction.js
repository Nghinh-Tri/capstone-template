import * as Types from "../store-constant"
import {callAPI} from "../../util/index";


export const fetchSoftSkill = () => {
    return (dispatch) => {
        return callAPI('Skill', 'GET', null).then(res => {
            dispatch(fetchSoftSkillSucess(res.data))
        })
    }
}

export const fetchSoftSkillSucess = (softSkillList) => {
    return {
        type: Types.FETCH_SOFT_SKILL_LIST,
        softSkillList
    };
}
