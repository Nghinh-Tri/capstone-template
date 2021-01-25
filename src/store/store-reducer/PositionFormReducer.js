import * as Type from "../store-constant";

var initState = [];

const positionReducer = (state = initState, action) => {
    var position, softSkill, hardSkill = null
    switch (action.type) {
        case Type.ADD_POSITION_REQUIRE:
            state.push(action.positionItem)
            return [...state]
        case Type.DELETE_POSITION_REQUIRE:
            state.splice(action.positionFormIndex, 1)
            return [...state]
        case Type.ADD_SOFT_SKILL_REQUIRE:
            position = { ...state[action.positionFormIndex] }
            softSkill = position.softSkill.slice()
            softSkill.push("")
            position.softSkill = softSkill
            state.splice(action.positionFormIndex, 1, position)
            return [...state]
        case Type.DELETE_SOFT_SKILL_REQUIRE:
            position = { ...state[action.positionFormIndex] }
            softSkill = position.softSkill.slice()
            softSkill.splice(action.softSkillIndex, 1)
            console.log(softSkill)
            position.softSkill = softSkill
            state.splice(action.positionFormIndex, 1, position)
            return [...state]
        case Type.ADD_HARD_SKILL_REQUIRE:
            position = { ...state[action.positionFormIndex] }
            hardSkill = position.hardSkill.slice()
            hardSkill.push("")
            position.hardSkill = hardSkill
            state.splice(action.positionFormIndex, 1, position)
            return [...state]
        case Type.DELETE_HARD_SKILL_REQUIRE:
            position = { ...state[action.positionFormIndex] }
            hardSkill = position.hardSkill.slice()
            hardSkill.splice(action.hardSkillIndex, 1)
            position.hardSkill = hardSkill
            state.splice(action.positionFormIndex, 1, position)
            return [...state]
        default:
            return [...state]
    }
}

export default positionReducer;