import { ADD_POSITION_REQUIRE, DELETE_POSITION_REQUIRE } from "../store-constant";

var initState = [];

const positionReducer = (state = initState, action) => {
    switch (action.type) {
        case ADD_POSITION_REQUIRE:
            state = action.skill
            return [...state]
        case DELETE_POSITION_REQUIRE:
            state.splice(action.index, 1)
            return [...state]
        default:
            return [...state]
    }
}

export default positionReducer;