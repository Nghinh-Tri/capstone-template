import { SUGGEST_CANDIDATE } from "../constant"

export const setPositionSelect = index => {
    return {
        type: SUGGEST_CANDIDATE.SET_SELECT_POSITION,
        index
    }
}

export const selectCandidate = (candidate, position) => {
    return {
        type: SUGGEST_CANDIDATE.SELECT_CANDIDATE,
        candidate, position
    }
}

export const unselectCandiate = (candidate, position) => {
    return {
        type: SUGGEST_CANDIDATE.UNSELECT_CANDIDATE,
        candidate, position
    }
}

export const fetchList = () => {
    return {
        type: SUGGEST_CANDIDATE.FETCH_LIST
    }
}