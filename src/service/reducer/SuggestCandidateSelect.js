import { SUGGEST_CANDIDATE } from "../constant";

const initState = 0

const SuggestCandidateSelect = (state = initState, action) => {
    switch (action.type) {
        case SUGGEST_CANDIDATE.SET_SELECT_POSITION:
            state = action.index
            return state

        case SUGGEST_CANDIDATE.CONFIRM_SUGGEST:
            state = 0
            return [...state]

        case SUGGEST_CANDIDATE.CONFIRM_SUGGEST_FAIL:
            state = 0
            return [...state]

        case SUGGEST_CANDIDATE.CANCEL_SUGGEST:
            state = 0
            return [...state]
        default:
            return state;
    }
}

export default SuggestCandidateSelect