import { SUGGEST_CANDIDATE } from "../../constant";
import { sortSuggestListByFieldMatch, sortSuggestListByHardSkillMatch, sortSuggestListByLanguageMatch, sortSuggestListByOverallMatch, sortSuggestListBySoftSkillMatch, sortSuggestListByTypeMatch } from "../../util/util";

const initState = {}

const PagingSuggestListReducer = (state = initState, action) => {
    switch (action.type) {
        case SUGGEST_CANDIDATE.PAGING_SUGGEST_LIST:
            state = action.result
            return state
        case SUGGEST_CANDIDATE.SORT_LIST:
            var clone = [...state.items]
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
            if (action.value === 'type') {
                sortSuggestListByTypeMatch(clone)
            }
            if (action.value === 'field') {
                sortSuggestListByFieldMatch(clone)
            }
            state.items = clone
            return state
        default:
            return state
    }
}

export default PagingSuggestListReducer