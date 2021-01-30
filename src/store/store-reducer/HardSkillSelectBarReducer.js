import * as Type from "../store-constant/index";

var initState = []

const hardSkillSelectBarReducer = (state = initState, action) => {
    switch (action.type) {
        case Type.FETCH_HARD_SKILL_LIST:
            state = action.hardSkillList.slice()
            return [...state];
        default:
            return [...state];
    }
}

export default hardSkillSelectBarReducer;