import { combineReducers } from "redux";
import authentication from "./AuthenticateReducer";
import ProjectFetchReducer from "./project/ProjectFetchReducer";
import ProjectFormReducer from "./project/ProjectFormReducer";
import ProjectTypeReducer from "./project/ProjectTypeReducer";
import ProjectFieldReducer from "./project/ProjectFieldReducer";
import ProjectDetailFetchReducer from "./project/ProjectDetailFetchReducer";
import CreateProjectErrorReducer from "./project/CreateProjectErrorReducer";

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
import ProfileFetchReducer from "./ProfileFetchReducer";
import PositionReducer from "./PositionReducer"
import DataStatisticsReducer from "./DataStatisticsReducer";
import PositionRequireReducer from "./PositionRequireReducer";
import PreviosRequrieReducer from "./PreviosRequrieReducer";

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
    CreateProjectErrorReducer
})

export default MainReducer