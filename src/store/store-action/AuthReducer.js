import { userConstants } from '../store-constant/index';

const initialState = {
    loggedIn: false,
    userLogin: {},
};

const authentication = (state = initialState, action)=> {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
            };
        case userConstants.LOGIN_SUCCESS:
            state = {
                loggedIn: true,
                userLogin: { ...action.user }
            } 
            return state
        case userConstants.LOGIN_FAILURE:
            return { ...state };
        case userConstants.LOGOUT:
            return {};
        default:
            return state;
    }
}
export default authentication;