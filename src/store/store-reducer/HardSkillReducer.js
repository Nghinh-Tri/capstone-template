import { ADD_HARD_SKILL_REQUIRE, DELETE_HARD_SKILL_REQUIRE } from "../store-constant";

var initState = [];

const hardSkillReducer = (state = initState, action) => {
    switch (action.type) {
        case ADD_HARD_SKILL_REQUIRE:
            state = action.skill
            return [...state]
        case DELETE_HARD_SKILL_REQUIRE:
            state.splice(action.index, 1)
            return [...state]
        default:
            return [...state]
    }
}

export default hardSkillReducer;