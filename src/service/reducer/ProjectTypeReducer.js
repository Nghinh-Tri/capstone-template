import { Type } from "../constant";

const initState = []

var ProjectTypeReducer = (state = initState, action) => {
    switch (action.type) {
        case Type.FETCH_PROJECT_TYPE:
            state = action.projectType
            return [...state]
        default:
            return [...state]
    }
}

export default ProjectTypeReducer