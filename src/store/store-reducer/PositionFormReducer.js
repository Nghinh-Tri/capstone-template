import { ADD_POSITION_REQUIRE, ADD_SOFT_SKILL_REQUIRE, DELETE_POSITION_REQUIRE, DELETE_SOFT_SKILL_REQUIRE } from "../store-constant";

var initState = [];

const positionReducer = (state = initState, action) => {
    console.log(action.type)
    switch (action.type) {
        case ADD_POSITION_REQUIRE:
            state.push(action.positionItem)
            return [...state]
        case DELETE_POSITION_REQUIRE:
            state.splice(action.positionFormIndex, 1)
            return [...state]
        case ADD_SOFT_SKILL_REQUIRE:
            let position = { ...state[action.positionFormIndex] }
            let softSkill = position.softSkill.slice()
            softSkill.push("")
            position.softSkill = softSkill
            state.splice(action.positionFormIndex, 1, position)
            return [...state]
        case DELETE_SOFT_SKILL_REQUIRE:
            position = { ...state[action.positionFormIndex] }
            softSkill = position.softSkill.slice()
            softSkill.splice(action.softSkillIndex, 1)
            position.softSkill = softSkill
            state.splice(action.positionFormIndex, 1, position)
            return [...state]
        default:
            return [...state]
    }
}

export default positionReducer;