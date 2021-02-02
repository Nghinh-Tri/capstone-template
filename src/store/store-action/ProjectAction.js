import * as Type from "../store-constant";

export const generateProject = (project) => {
    return {
        type: Type.GENERATE_PROJECT,
        project
    }
}

export const createProject = (project) => {
    return {
        type: Type.CREATE_PROJECT,
        project
    }
}

export const updateProjectDetail = (name, value) => {
    return {
        type: Type.UPDATE_PROJECT_DETAIL,
        name, value
    }
}