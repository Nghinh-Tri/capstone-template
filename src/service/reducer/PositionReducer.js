import { Type } from "../constant"

const initState = {}

const PositionReducer = (state = initState, action) => {
    switch (action.type) {
        case Type.FETCH_POSITION_PROFILE_DETAIL:
            state = action.resultObj
            return state
        default:
            return state
    }
}

export default PositionReducer