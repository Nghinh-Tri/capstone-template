import axios from "axios";
import { alertConstants, Type } from "../constant";
import { API_URL } from "../util/util";
import { history } from "../helper/History";
import { store } from "react-notifications-component";
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

export const createProject = (project, match) => {
    var empID = JSON.parse(localStorage.getItem('EMP'))
    var url = `${API_URL}/Project/${empID}`
    return (dispatch) => {
        var date = moment(project.dateEndEst, "DD/MM/YYYY").diff(moment(project.dateBegin, "DD/MM/YYYY"))

        return axios.post(
            url,
            project,
            { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } }
        ).then(res => {
            if (res.status === 200) {
                if (res.data.isSuccessed) {
                    project.projectId = res.data.resultObj
                    localStorage.setItem('projectId', res.data.resultObj)
                    dispatch(createProjectSuccess(project))
                    if (typeof match === 'undefined') {
                        history.push('/project/create-position')
                    }
                    else {
                        history.push(`/project/detail/${match.params.id}`)
                    }
                } else {
                    store.addNotification({
                        message: res.data.message,
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
        }).catch(err => {
            if (err.response.status === 401) {
                history.push('/login')
            }
        })
    }
}

export const createProjectSuccess = project => {
    return {
        type: Type.CREATE_PROJECT,
        project
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

export const fetchProject = (pageIndex) => {
    var empID = JSON.parse(localStorage.getItem('EMP'))
    var url = `${API_URL}/Project/getProjects/${empID}?PageIndex=${pageIndex}&PageSize=5`
    return (dispatch) => {
        axios.get(
            url,
            { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } }
        ).then(res => {
            dispatch(fetchProjectSuccess(res.data.resultObj))
        }).catch(err => {
            if (err.response.status === 401) {
                history.push('/login')
            }
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
        return axios.get(url, { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } }).then(res => {
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
    var url = `${API_URL}/Project/${id}`
    return (dispatch) => {
        return axios.put(
            url,
            project,
            { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } }).then(res => {
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
            if (err.response.status === 401) {
                history.push('/login')
            }
        })
    }
}

export const fetchProjectTypeSuccess = projectType => {
    return { type: Type.FETCH_PROJECT_TYPE, projectType }
}