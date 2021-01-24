import { ADD_SOFT_SKILL_REQUIRE, DELETE_SOFT_SKILL_REQUIRE } from "../store-constant";

var initState = [];

const softSkillReducer = (state = initState, action) => {
    switch (action.type) {
        case ADD_SOFT_SKILL_REQUIRE:
            state = action.skill
            return [...state]
        case DELETE_SOFT_SKILL_REQUIRE:
            state.splice(action.index, 1)
            return [...state]
        default:
            return [...state]
    }
}

export default softSkillReducer;