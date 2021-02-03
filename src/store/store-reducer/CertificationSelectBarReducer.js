import * as Type from "../store-constant/index";

var initState = []

const certificationSelectBarReducer = (state = initState, action)=>{
    switch (action.type) {
        case Type.FETCH_CERTIFICATION_LIST:      
        console.log(action.certiList)      
            // return action.certiList;    
        default:
            return [...state];
    }
}

export default certificationSelectBarReducer;