import { SUGGEST_CANDIDATE, Type } from "../../constant/index";
import { sortSuggestListByOverallMatch } from "../../util/util";
const initState = []

const SuggestCandidateList = (state = initState, action) => {
    switch (action.type) {
        case SUGGEST_CANDIDATE.FETCH_SUGGEST_LIST:
            if (Array.isArray(action.list)) {
                state = action.list
                if (state.length > 0) {
                    state.forEach(element => {
                        var clone = [...element.matchDetail]
                        sortSuggestListByOverallMatch(clone)
                        element.matchDetail = clone
                    });
                }
            }
            return [...state]        
        // case SUGGEST_CANDIDATE.CONFIRM_SUGGEST:
        //     state = []
        //     return [...state]

        case SUGGEST_CANDIDATE.CONFIRM_SUGGEST_FAIL:
            state = []
            return [...state]

        case SUGGEST_CANDIDATE.CANCEL_SUGGEST:
            state = []
            return [...state]

        case Type.FETCH_PROJECT:
            state = []
            return [...state]

        case Type.GENERATE_PROJECT:
            state = []
            return [...state]
        default:
            return [...state]
    }
}

export default SuggestCandidateList