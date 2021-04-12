import { Type } from "../constant";

const initState = []

var ProjectFieldReducer = (state = initState, action) => {
    switch (action.type) {
        case Type.FETCH_PROJECT_FIELD:
            state = action.projectField
            return [...state]
        default:
            return [...state]
    }
}

export default ProjectFieldReducer