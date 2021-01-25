import * as Types from "../store-constant"

export const addPositionRequire = (positionItem) => {
    return {
        type: Types.ADD_POSITION_REQUIRE,
        positionItem
    };
}

export const deletePositionRequire = positionFormIndex => {
    return {
        type: Types.DELETE_POSITION_REQUIRE,
        positionFormIndex
    }
}

export const addSoftSkillRequire = (positionFormIndex) => {
    return {
        type: Types.ADD_SOFT_SKILL_REQUIRE,
        positionFormIndex
    };
}

export const deleteSoftSkillRequire = (softSkillIndex, positionFormIndex) => {
    return {
        type: Types.DELETE_SOFT_SKILL_REQUIRE,
        positionFormIndex,
        softSkillIndex
    }
}