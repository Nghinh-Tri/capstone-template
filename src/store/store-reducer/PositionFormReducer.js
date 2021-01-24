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
            var index = action.positionFormIndex
            console.log(index)
            // console.log(state[index])
            var clone = {...state[index].softSkill}
            console.log(typeof(clone) === 'object')
            if (typeof(clone) === 'object'){
                clone = []
            }
            clone.push("")
            // console.log(clone)

            // state[index].softSkill = clone
            console.log(state[index].softSkill)
            // state[action.positionFormIndex].softSkill.push("")
            // console.log(action.positionFormIndex,state[action.positionFormIndex].softSkill)
            return [...state]
        case DELETE_SOFT_SKILL_REQUIRE:
            state[action.positionFormIndex].softSkill.splice(action.softSkillIndex, 1)
            return [...state]
        default:
            return [...state]
    }
}

export default positionReducer;