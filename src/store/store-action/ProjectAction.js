import { callAPI } from "../../util";
import * as Type from "../store-constant";

export const generateProject = (project) => {
    return {
        type: Type.GENERATE_PROJECT,
        project
    }
}

export const createProject = (project) => {
    var empID = "147c0f78-6871-41f3-b0e0-8b34842073bc";
    return (dispatch) => {
        return callAPI(`Project/${empID}`, 'POST', project).then(res => {
            project.projectId = res.data.resultObj
            dispatch(createProjectSuccess(project))
        })
    }
}

export const createProjectSuccess = project => {
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

export const fetchProject = (pageIndex) => {
    var empID = "147c0f78-6871-41f3-b0e0-8b34842073bc";
    return (dispatch) => {
        return callAPI(`Project/getProjects/${empID}?PageIndex=${pageIndex}&PageSize=5`, 'GET', null).then(res => {
            dispatch(fetchProjectSuccess(res.data.resultObj))
        })
    }
}

export const fetchProjectSuccess = (resultObj) => {
    return {
        type: Type.FETCH_PROJECT,
        resultObj
    }
}

export const fetchProjectDetail = (projectID) => {
    return (dispatch) => {
        return callAPI(`Project/${projectID}`, 'GET', null).then(res => {
            dispatch(fetchProjectDetailSuccess(res.data.resultObj))
        })
    }
}

export const fetchProjectDetailSuccess = (resultObj) => {
    return {
        type: Type.FETCH_PROJECT_DETAIL,
        resultObj
    }
}

export const updateProject = (project, id) => {
    return (dispatch) => {
        return callAPI(`Project/${id}`, 'PUT', project).then(res => {
            dispatch(updateProjectSuccess(res.data.resultObj))
        })
    }
}

export const updateProjectSuccess = (resultObj) => {
    return {
        type: Type.UPDATE_PROJECT,
        resultObj
    }
}