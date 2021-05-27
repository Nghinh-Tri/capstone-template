import { Type } from "../../constant/index";

var initState = []

const positionSelectBarReducer = (state = initState, action) => {
    switch (action.type) {
        case Type.FETCH_POSITION_LIST:
            state = []
            state = [...action.positionList]
            return [...state];
        default:
            return [...state];
    }
}

export default positionSelectBarReducer;