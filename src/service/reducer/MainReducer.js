import { combineReducers } from "redux";
import authentication from "./user/AuthenticateReducer";
import ProjectFetchReducer from "./project/ProjectFetchReducer";
import ProjectFormReducer from "./project/ProjectFormReducer";
import ProjectTypeReducer from "./project/ProjectTypeReducer";
import ProjectFieldReducer from "./project/ProjectFieldReducer";
import ProjectDetailFetchReducer from "./project/ProjectDetailFetchReducer";
import ErrorReducer from "./error/ErrorReducer";

import PositionFormReducer from "./position/PositionFormReducer";
import CertificationSelectBarReducer from "./certificate/CertificationSelectBarReducer";
import HardSkillSelectBarReducer from "./skill/HardSkillSelectBarReducer";
import SoftSkillSelectBarReducer from "./skill/SoftSkillSelectBarReducer";
import PositionSelectBarReducer from "./position/PositionSelectBarReducer";
import LanguageSelectBarReducer from "./language/LanguageSelectBarReducer";
import SuggestCandidateList from "./suggest/SuggestCandidateList";
import SuggestCandidateSelect from "./suggest/SuggestCandidateSelect"
import SuggestCandidateSelectedListReducer from "./suggest/SuggestCandidateSelectedListReducer";
import ListEmployeeReducer from "./project/ListEmployeeReducer";
import ProfileFetchReducer from "./user/ProfileFetchReducer";
import PositionReducer from "./position/PositionReducer"
import DataStatisticsReducer from "./statistics/DataStatisticsReducer";
import PositionRequireReducer from "./position/PositionRequireReducer";
import PreviosRequrieReducer from "./project/PreviosRequrieReducer";
import CreateProjectErrorReducer from "./error/CreateProjectErrorReducer";
import CandidateResultReducer from "./suggest/CandidateResultReducer";
import CheckRejectedCandidates from "./suggest/CheckRejectedCandidates";
import PagingSuggestListReducer from "./suggest/PagingSuggestListReducer";

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
    DataStatisticsReducer,
    ProjectFieldReducer,
    PositionRequireReducer,
    ProjectDetailFetchReducer,
    PreviosRequrieReducer,
    ErrorReducer,
    CreateProjectErrorReducer,
    CandidateResultReducer,
    CheckRejectedCandidates,
    PagingSuggestListReducer
})

export default MainReducer