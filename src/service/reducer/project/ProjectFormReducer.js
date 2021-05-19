import { Type } from "../../constant";

var initState = {}

const projectFormReducer = (state = initState, action) => {
    switch (action.type) {
        case Type.GENERATE_PROJECT:
            state = action.project
<<<<<<< Updated upstream
            return state
        // case Type.CREATE_PROJECT:
        //     state = action.project
        //     return state;
=======
            return state   
>>>>>>> Stashed changes
        default:
            return state;
    }
}

export default projectFormReducer;