import { combineReducers } from "redux";
import authentication from "./AuthenticateReducer";
import ProjectFetchReducer from "./ProjectFetchReducer";
import ProjectFormReducer from "./ProjectFormReducer";
import PositionFormReducer from "./PositionFormReducer";
import CertificationSelectBarReducer from "./CertificationSelectBarReducer";
import HardSkillSelectBarReducer from "./HardSkillSelectBarReducer";
import SoftSkillSelectBarReducer from "./SoftSkillSelectBarReducer";
import PositionSelectBarReducer from "./PositionSelectBarReducer";
import LanguageSelectBarReducer from "./LanguageSelectBarReducer";
import SuggestCandidateList from "./SuggestCandidateList";
import SuggestCandidateSelect from "./SuggestCandidateSelect"
import SuggestCandidateSelectedListReducer from "./SuggestCandidateSelectedListReducer";
import ListEmployeeReducer from "./ListEmployeeReducer";
import ProjectTypeReducer from "./ProjectTypeReducer";
import ProfileFetchReducer from "./ProfileFetchReducer";
import PositionReducer from "./PositionReducer"
import DataStatisticsReducer from "./DataStatisticsReducer";

const MainReducer = combineReducers({
    authentication,
    ProjectFetchReducer,
    ProjectFormReducer,
    PositionFormReducer,
    CertificationSelectBarReducer,
    HardSkillSelectBarReducer,
    SoftSkillSelectBarReducer,
    PositionSelectBarReducer,
    LanguageSelectBarReducer,
    SuggestCandidateList,
    SuggestCandidateSelect,
    SuggestCandidateSelectedListReducer,
    ListEmployeeReducer,
    ProjectTypeReducer,
    ProfileFetchReducer,
    PositionReducer,
    DataStatisticsReducer
})

export default MainReducer