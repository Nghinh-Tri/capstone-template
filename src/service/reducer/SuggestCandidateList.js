import { SUGGEST_CANDIDATE } from "../constant/index";
import { sortSuggestListByHardSkillMatch, sortSuggestListByLanguageMatch, sortSuggestListByOverallMatch, sortSuggestListBySoftSkillMatch } from "../util/util";
const initState = []

const SuggestCandidateList = (state = initState, action) => {
    switch (action.type) {
        case SUGGEST_CANDIDATE.FETCH_SUGGEST_LIST:
            state = action.list
            if (state.length > 0) {
                state.forEach(element => {
                    var clone = [...element.matchDetail]
                    sortSuggestListByOverallMatch(clone)
                    element.matchDetail = clone
                });
            }
            return [...state]
        case SUGGEST_CANDIDATE.SORT_LIST:
            state.forEach(element => {
                var clone = [...element.matchDetail]
                if (action.value === 'language') {
                    sortSuggestListByLanguageMatch(clone)
                }
                if (action.value === 'softSkill') {
                    sortSuggestListBySoftSkillMatch(clone)
                }
                if (action.value === 'hardSkill') {
                    sortSuggestListByHardSkillMatch(clone)
                }
                if (action.value === 'overall') {
                    sortSuggestListByOverallMatch(clone)
                }
                element.matchDetail = clone
            });
            return [...state]
        default:
            return [...state]
    }
}

export default SuggestCandidateList