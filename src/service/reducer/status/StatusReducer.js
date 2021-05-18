import { SUGGEST_CANDIDATE, Type } from "../../constant"

const initState = false

const StatusReducer = (state = initState, action) => {
    switch (action.type) {
        case Type.CREATE_PROJECT:
            state = action.isSuccessed
            return state
        case Type.UPDATE_PROJECT:
            state = action.isSuccessed
            return state
        case Type.CREATE_POSITION:
            state = action.isSuccessed
            return state
        case SUGGEST_CANDIDATE.CONFIRM_SUGGEST:
            state = action.isSuccessed
            return state
        default:
            state = false
            return state;
    }
}

export default StatusReducer