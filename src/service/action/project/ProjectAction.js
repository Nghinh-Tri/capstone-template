import axios from "axios";
import { alertConstants, Type } from "../../constant";
import { API_URL, getRole } from "../../util/util";
import { history } from "../../helper/History";
import { store } from "react-notifications-component";

export const generateProject = (project, isCreateNew) => {
    return (dispatch) => {
        if (isCreateNew)
            dispatch(generateProjectSuccess(project))
        else {
            dispatch(generateProjectFail())
            store.addNotification({
                message: "Cannot create new project",
                type: "danger",
                insert: "top",
                container: "top-center",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 2000,
                    onScreen: false
                }
            })
        }
    }
}

export const generateProjectSuccess = (project) => {
    history.push('/project/create-project', { isUpdate: false })
    return {
        type: Type.GENERATE_PROJECT,
        project
    }
}

export const generateProjectFail = () => {
    return { type: alertConstants.ERROR }
}

export const createProject = (project) => {
    var empID = JSON.parse(localStorage.getItem('EMP'))
    var url = `${API_URL}/Project/${empID}`
    return (dispatch) => {
        if (project.projectName.length === 0) {
            dispatch(createProjectFailed('projectName : Please input project name'))
        } else if (project.dateBegin.length === 0) {
            dispatch(createProjectFailed('dateBegin : Please input start date'))
        } else if (project.dateEstimatedEnd.length === 0) {
            dispatch(createProjectFailed('dateEstimatedEnd : Please input esitmate end date'))
        } else if (project.description.length === 0) {
            dispatch(createProjectFailed('description : Please input description'))
        }
        else {
            dispatch(createProjectFailed(''))
            axios.post(
                url,
                project,
                { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } }
            ).then(res => {
                console.log(res)
                if (res.status === 200) {
                    if (res.data.isSuccessed) {
                        project.projectId = res.data.resultObj
                        localStorage.setItem('projectId', res.data.resultObj)
                        localStorage.setItem('projectType', project.projectTypeID)
                        localStorage.setItem('projectField', project.projectFieldID)
                        localStorage.setItem('projectName', project.projectName)
                        dispatch(createProjectSuccess(project))
                    } else {
                        dispatch(createProjectFailed(res.data.message))
                    }
                }
            })
        }

    }
}

export const createProjectSuccess = project => {
    history.push('/project/create-position')
    return {
        type: Type.CREATE_PROJECT,
        project
    }
}

export const createProjectFailed = message => {
    console.log('message', message)
    return {
        type: Type.PROJECT_ERROR,
        message
    }
}

export const createProjectFail = () => {
    return {
        type: alertConstants.ERROR
    }
}

export const updateProjectDetail = (name, value) => {
    return {
        type: Type.UPDATE_PROJECT_DETAIL,
        name, value
    }
}

export const fetchProject = (pageIndex, search) => {
    var empID = JSON.parse(localStorage.getItem('EMP'))
    var url = ''
    var role = getRole()
    if (role === 'PM') {
        if (search.length > 0)
            url = `${API_URL}/Project/getProjects/${empID}?Keyword=${search}&PageIndex=${pageIndex}&PageSize=10`
        else
            url = `${API_URL}/Project/getProjects/${empID}?PageIndex=${pageIndex}&PageSize=10`
    }
    if (role === 'Employee') {
        if (search.length > 0)
            url = `${API_URL}/Project/getEmployeeProjects/${empID}?Keyword=${search}&PageIndex=${pageIndex}&PageSize=10`
        else
            url = `${API_URL}/Project/getEmployeeProjects/${empID}?PageIndex=${pageIndex}&PageSize=10`
    }
    return (dispatch) => {
        axios.get(
            url,
            { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } }
        ).then(res => {
            dispatch(fetchProjectSuccess(res.data.resultObj))
        }).catch(err => {

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
    var url = `${API_URL}/Project/${projectID}`
    return (dispatch) => {
        return axios.get(
            url,
            { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } }
        ).then(res => {
            dispatch(fetchProjectDetailSuccess(res.data.resultObj))
        })
    }
}

export const fetchPositionRequire = (projectID) => {
    var url = `${API_URL}/Project/getRequiredPositions/${projectID}`
    return (dispatch) => {
        return axios.get(
            url,
            { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } }
        ).then(res => {
            dispatch(fetchPositionRequireSuccess(res.data.resultObj !== null ? res.data.resultObj : []))
        })
    }
}

export const fetchPositionRequireSuccess = (resultObj) => {
    return {
        type: Type.FETCH_POSITION_REQUIRE,
        resultObj
    }
}

export const fetchProjectDetailSuccess = (resultObj) => {
    return {
        type: Type.FETCH_PROJECT_DETAIL,
        resultObj
    }
}

export const updateProject = (project, id) => {
    var url = `${API_URL}/Project/${id}`
    return (dispatch) => {
        return axios.put(
            url,
            project,
            { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } }
        ).then(res => {
            dispatch(updateProjectSuccess(id))
        })
    }
}

export const updateProjectSuccess = (id) => {
    history.push(`/project/detail/${id}`)
    return {
        type: Type.UPDATE_PROJECT
    }
}

export const changeStatusToFinish = projectID => {
    var url = `${API_URL}/Project/changeStatus/${projectID}`
    return dispatch => {
        return axios.put(
            url,
            null,
            { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } }).then(res => {
                dispatch(fetchProjectDetail(projectID))
            })
    }
}

export const fetchProjectType = () => {
    var url = `${API_URL}/Project/getProjectTypes`
    return (dispatch) => {
        axios.get(
            url,
            { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } }
        ).then(res => {
            dispatch(fetchProjectTypeSuccess(res.data.resultObj))
        }).catch(err => {

        })
    }
}

export const fetchProjectField = () => {
    var url = `${API_URL}/Project/getProjectFields`
    return (dispatch) => {
        axios.get(
            url,
            { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } }
        ).then(res => {
            dispatch(fetchProjectFieldSuccess(res.data.resultObj))
        }).catch(err => {

        })
    }
}

export const fetchProjectTypeSuccess = projectType => {
    return { type: Type.FETCH_PROJECT_TYPE, projectType }
}


export const fetchProjectFieldSuccess = projectField => {
    return { type: Type.FETCH_PROJECT_FIELD, projectField }
}