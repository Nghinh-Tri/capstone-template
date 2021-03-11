import { Type } from "../constant/index";

var initState = [
    {certificationLevel:0},
    {certificationLevel:1},
    {certificationLevel:2},
    {certificationLevel:3},
    {certificationLevel:4},
    {certificationLevel:5},
    {certificationLevel:6},
    {certificationLevel:7},
    {certificationLevel:8},
    {certificationLevel:9},
    {certificationLevel:10},
]

const certificationSelectBarReducer = (state = initState, action) => {
    switch (action.type) {
        case Type.FETCH_CERTIFICATION_LIST:
            // if (state.length === 0)
            //     state = action.certiList.slice()
            return [...state];
        default:
            return [...state];
    }
}

export default certificationSelectBarReducer;