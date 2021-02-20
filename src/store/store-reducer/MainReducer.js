import { combineReducers } from "redux";
import PositionFormReducer from "./PositionFormReducer";
import PositionSelectBarReducer from "./PositionSelectBarReducer";
import SoftSkillSelectBarReducer from "./SoftSkillSelectBarReducer";
import HardSkillSelectBarReducer from "./HardSkillSelectBarReducer";
import CertificationSelectBarReducer from "./CertificationSelectBarReducer";
import ProjectFormReducer from "./ProjectFormReducer";
import ProjectFetchReducer from "./ProjectFetchReducer";

const MainReducer = combineReducers({
    PositionFormReducer,
    PositionSelectBarReducer,
    SoftSkillSelectBarReducer, 
    HardSkillSelectBarReducer,
    CertificationSelectBarReducer,
    ProjectFormReducer,
    ProjectFetchReducer
});

export default MainReducer;