import { SUGGEST_CANDIDATE, Type } from "../constant/index";
const initState = []

const SuggestCandidateList = (state = initState, action) => {
    switch (action.type) {
        case Type.CREATE_POSITION:
            state = action.result
            return [...state]
        case SUGGEST_CANDIDATE.FETCH_SUGGEST_LIST:
            return [...state]
        default:
            return [...state];
    }
}

export default SuggestCandidateList