import axios from "axios"
import { store } from "react-notifications-component"
import { ERROR, Type } from "../../constant/index"
import { history } from "../../helper/History"
import { API_URL, getEmail, getRole } from "../../util/util"

export const login = (username, password) => {
    var user = { email: username, password: password, rememberMe: true }
    return dispatch => {
        dispatch(request())
        axios.post(
            `${API_URL}/User/authenticate`,
            user
        ).then(res => {
            if (res.data.isSuccessed) {
                dispatch(success())
                localStorage.setItem('EMP', JSON.stringify(res.data.resultObj.empId));
                localStorage.setItem('token', JSON.stringify(res.data.resultObj.token));
                var role = getRole()
                if (role === 'PM' || role === 'Employee') {
                    history.push('/project');
                } else {
                    localStorage.clear()
                    store.addNotification({
                        message: "User role is not match",
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
            if (typeof err.response !== 'undefined') {
                var error = err.response.data
                if (error.errors !== null) {
                    dispatch(loginFailure(error.errors))
                } else {
                    dispatch(loginFailure({}))
                    store.addNotification({
                        message: error.message,
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
        })
    }
}

export const changePassword = (password) => {
    var id = JSON.parse(localStorage.getItem('EMP'))
    var email = getEmail()
    var url = `${API_URL}/User/ChangePassword/${id}`
    return dispatch => {
        axios.put(
            url,
            password,
            { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } })
            .then(res => {
                if (res.status === 200) {
                    dispatch(login(email, password.newPassword))
                }
            })
            .catch(err => {
                if (err.response.status === 400) {
                    dispatch(changePasswordFail(err.response.data.errors))
                } else {
                    dispatch(changePasswordFail(err.response.data.errors))
                }
            })
    }
}

export const request = () => {
    return { type: Type.LOGIN_REQUEST }
}

export const success = () => {
    return { type: Type.LOGIN_SUCCESS }
}

export const loginFailure = (error) => {
    return { type: ERROR.LOGIN_ERROR, error }
}

export const changePasswordFail = (error) => {
    return { type: Type.CHANGE_PASSWORD_FAIL, error }
}

export const refreshPage = () => {
    return { type: Type.REFRESH_REGISTER_PAGE }
}
