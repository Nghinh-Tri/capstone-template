import { Type } from "../../constant/index";

const initState = []

const  dataStatisticsReducer = (state = initState, action) => {
    switch (action.type) {
        case Type.AWAITING_STATISTICS:
            state = action.list
            return [...state]
        default:
            return [...state];
    
    }
}

export default dataStatisticsReducer;