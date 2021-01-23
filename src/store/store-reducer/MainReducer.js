import { combineReducers } from "redux";
import SoftSkillReducer from "./SoftSkillReducer";
import HardSkillReducer from "./HardSkillReducer";
import PositionReducer from "./PositionReducer";

const MainReducer = combineReducers({
    SoftSkillReducer,
    HardSkillReducer,
    PositionReducer
});

export default MainReducer;