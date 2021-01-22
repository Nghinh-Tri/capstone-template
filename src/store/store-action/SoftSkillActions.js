import * as Types from "../store-constant"

export const addSoftSkilRequire = (skill) => {
    return {
        type: Types.ADD_SOFT_SKILL_REQUIRE,
        skill
    };
}

export const deleteSoftSkillRequire = index => {
    return {
        type: Types.DELETE_SOFT_SKILL_REQUIRE,
        index
    }
}