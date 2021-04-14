import { Type } from "../../constant";

var initState = { message: '' }

const CreateProjectErrorReducer = (state = initState, action) => {
    switch (action.type) {
        case Type.PROJECT_ERROR:
            state.message = action.message
            return state
        default:
            return state;
    }
}

export default CreateProjectErrorReducer;