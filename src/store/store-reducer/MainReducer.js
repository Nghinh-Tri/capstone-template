import { combineReducers } from "redux";
import SoftSkillReducer from "./SoftSkillReducer";
import HardSkillReducer from "./HardSkillReducer";

const MainReducer = combineReducers({
    SoftSkillReducer,
    HardSkillReducer
});

export default MainReducer;