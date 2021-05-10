import { ERROR } from "../../constant";

var initState = {}

const ErrorReducer = (state = initState, action) => {
    switch (action.type) {
        case ERROR.PROJECT_ERROR:
            state = action.error
            return state
        case ERROR.LOGIN_ERROR:
            state = action.error
            return state
        default:
            return state;
    }
}

export default ErrorReducer;