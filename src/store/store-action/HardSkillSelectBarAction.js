import * as Types from "../store-constant"
import {callAPI} from "../../util/index";

export const fetchHardSkill = () => {
    return (dispatch) => {
        return callAPI('Skill', 'GET', null).then(res => {
            dispatch(fetchHardSkillSuccess(res.data))
        })
    }
}

export const fetchHardSkillSuccess = (hardSkillList) => {
    return {
        type: Types.FETCH_HARD_SKILL_LIST,
        hardSkillList
    };
}