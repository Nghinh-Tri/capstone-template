import axios from "axios";
import { alertConstants, Type, ERROR } from "../../constant";
import { API_URL, getEmpID, getRole, getUserName } from "../../util/util";
import { history } from "../../helper/History";
import { store } from "react-notifications-component";
import { sendNotificate } from "../firebase/FirebaseAction";
import moment from "moment";

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
    var empID = getEmpID()
    var url = `${API_URL}/Project/${empID}`
    return (dispatch) => {
        dispatch(createProjectFailed({}))
        dispatch(createProjectConstraintsFailed(''))
        axios.post(
            url,
            project,
            { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } }
        ).then(res => {
            if (res.data.isSuccessed) {
                project.projectId = res.data.resultObj
                localStorage.setItem('projectId', res.data.resultObj)
                localStorage.setItem('projectType', project.projectTypeID)
                localStorage.setItem('projectField', project.projectFieldID)
                localStorage.setItem('dateCreate', project.dateBegin)
                localStorage.setItem('dateEnd', project.dateEstimatedEnd)
                localStorage.setItem('projectName', project.projectName)
                dispatch(createProjectSuccess(res.data.isSuccessed))
                var message = {
                    title: `Project Manager ${getUserName()} sent a notification`,
                    body: `Project '${project.projectName}' has been created`,
                    status: true,
                    topic: 'news',
                    dateCreate: moment.now()
                }
                dispatch(sendNotificate(message))
            } else {
                dispatch(createProjectConstraintsFailed(res.data.message))
            }
        }).catch(err => {
            if (typeof err.response !== 'undefined') {
                dispatch(createProjectFailed(err.response.data.errors))
            }
        })
    }
}

export const refreshPage = () => {
    return (dispatch) => {
        dispatch(createProjectFailed({}))
        dispatch(createProjectConstraintsFailed(''))
    }
}

export const createProjectSuccess = (isSuccessed) => {
    // history.push('/project/create-position')
    return { type: Type.CREATE_PROJECT, isSuccessed }
}

export const createProjectFailed = error => {
    return { type: ERROR.PROJECT_ERROR, error }
}

export const createProjectConstraintsFailed = error => {
    return { type: ERROR.PROJECT_CONSTRAINTS_ERROR, error }
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

export const fetchProject = (pageIndex, search, refresh) => {
    var empID = getEmpID()
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
            if (res.data.isSuccessed)
                dispatch(fetchProjectSuccess(res.data.resultObj, typeof refresh === 'undefined' ? false : refresh))
        }).catch(err => {

        })
    }
}

export const fetchProjectSuccess = (resultObj, refresh) => {
    return {
        type: Type.FETCH_PROJECT,
        resultObj, refresh
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

export const fetchCandidatesResult = requireID => {
    var url = `${API_URL}/Project/getEmpByRequiredID/${requireID}`
    return (dispatch) => {
        return axios.get(
            url,
            { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } }
        ).then(res => {
            if (res.data.isSuccessed)
                dispatch(fetchCandidatesResultSuccess(res.data.resultObj !== null ? res.data.resultObj : []))
        })
    }
}

export const fetchCandidatesResultSuccess = (result) => {
    return { type: Type.FETCH_CANDIDATES_RESULT, result }
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
            dispatch(updateProjectSuccess(res.data.isSuccessed))
        }).catch(err => {
            if (typeof err.response !== 'undefined') {
                dispatch(createProjectFailed(err.response.data.errors))
            }
        })
    }
}

export const updateProjectSuccess = (isSuccessed) => {
    return { type: Type.UPDATE_PROJECT, isSuccessed }
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