import { ERROR } from "../../constant";

var initState = { message: '' }

const CreateProjectErrorReducer = (state = initState, action) => {
    switch (action.type) {
        case ERROR.PROJECT_CONSTRAINTS_ERROR:
            state.message = action.error
            return state
        default:
            return state;
    }
}

export default CreateProjectErrorReducer;