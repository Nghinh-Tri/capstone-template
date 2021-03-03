import { combineReducers } from "redux";
import PositionFormReducer from "./PositionFormReducer";
import PositionSelectBarReducer from "./PositionSelectBarReducer";
import SoftSkillSelectBarReducer from "./SoftSkillSelectBarReducer";
import HardSkillSelectBarReducer from "./HardSkillSelectBarReducer";
import CertificationSelectBarReducer from "./CertificationSelectBarReducer";
import ProjectFormReducer from "./ProjectFormReducer";
import ProjectFetchReducer from "./ProjectFetchReducer";
import alert from "./AlertReducer";
import authentication from "./AuthReducer";


const MainReducer = combineReducers({
    PositionFormReducer,
    PositionSelectBarReducer,
    SoftSkillSelectBarReducer, 
    HardSkillSelectBarReducer,
    CertificationSelectBarReducer,
    ProjectFormReducer,
    ProjectFetchReducer,
    alert,
    authentication
});

export default MainReducer;