import { combineReducers } from "redux";
// import SoftSkillReducer from "./SoftSkillReducer";
// import HardSkillReducer from "./HardSkillReducer";
import PositionFormReducer from "./PositionFormReducer";

const MainReducer = combineReducers({
    // SoftSkillReducer,
    // HardSkillReducer,
    PositionFormReducer
});

export default MainReducer;