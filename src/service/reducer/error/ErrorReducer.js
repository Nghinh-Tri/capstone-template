import { ERROR, Type } from "../../constant";

var initState = {}

const ErrorReducer = (state = initState, action) => {
    switch (action.type) {
        case ERROR.PROJECT_ERROR:
            state = action.error
            return state
        case ERROR.LOGIN_ERROR:
            state = action.error
            return state
        case Type.CHANGE_PASSWORD_FAIL:
            state = action.error
            return state
        case Type.REFRESH_REGISTER_PAGE:
            state = {}
            return state
        case Type.CREATE_POSITION_FAIL:
            state = action.error
            return state
        default:
            return state;
    }
}

export default ErrorReducer;