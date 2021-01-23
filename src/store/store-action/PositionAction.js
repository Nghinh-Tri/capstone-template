import * as Types from "../store-constant"

export const addPositionRequire = (skill) => {
    return {
        type: Types.ADD_POSITION_REQUIRE,
        skill
    };
}

export const deletePositionRequire = index => {
    return {
        type: Types.DELETE_POSITION_REQUIRE,
        index
    }
}