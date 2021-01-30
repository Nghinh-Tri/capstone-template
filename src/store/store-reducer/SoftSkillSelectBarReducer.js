import * as Type from "../store-constant/index";

var initState = []

const softSkillSelectBarReducer = (state = initState, action)=>{
    switch (action.type) {
        case Type.FETCH_SOFT_SKILL_LIST:            
            return action.softSkillList;    
        default:
            return [...state];
    }
}

export default softSkillSelectBarReducer;