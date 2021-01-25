import { combineReducers } from "redux";
import PositionFormReducer from "./PositionFormReducer";
import PositionSelectBarReducer from "./PositionSelectBarReducer";
import SoftSkillSelectBarReducer from "./SoftSkillSelectBarReducer";

const MainReducer = combineReducers({
    PositionFormReducer,
    PositionSelectBarReducer,
    SoftSkillSelectBarReducer
});

export default MainReducer;