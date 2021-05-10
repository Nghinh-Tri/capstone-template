import { SUGGEST_CANDIDATE, Type } from "../../constant/index";

const initState = { message: '', list: [] }

const CheckRejectedCandidates = (state = initState, action) => {
    switch (action.type) {
        case SUGGEST_CANDIDATE.REJECTED_CANDIDATE:
            state.message = action.message
            state.list = [...action.list]
            return state
        case SUGGEST_CANDIDATE.FETCH_SUGGEST_LIST:
            state.message = ''
            state.list = []
            return state
        default:
            return state

    }
}

export default CheckRejectedCandidates;