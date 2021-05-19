import { Type } from "../../constant";

var initState = {}

const projectFormReducer = (state = initState, action) => {
    switch (action.type) {
        case Type.GENERATE_PROJECT:
            state = action.project
            return state
        default:
            return state;
    }
}

export default projectFormReducer;