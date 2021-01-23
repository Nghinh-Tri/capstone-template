import * as Types from "../store-constant"

export const addHardSkilRequire = (skill) => {
    return {
        type: Types.ADD_HARD_SKILL_REQUIRE,
        skill
    };
}

export const deleteHardSkillRequire = index => {
    return {
        type: Types.DELETE_HARD_SKILL_REQUIRE,
        index
    }
}