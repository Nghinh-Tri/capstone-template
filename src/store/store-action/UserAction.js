import { userConstants } from '../store-constant/index';
import { history } from '../helper/history';
// import { alertActions } from './';
import { store } from 'react-notifications-component';
import { callAPI } from '../../util';

export const userActions = {
    login,
    logout,
};

function login(email, password) {
    if (email && password !== null) {
        var account = {
            userName: email,
            password: password
        }
        console.log(account)
        return (dispatch) => {
            dispatch(request)
            return callAPI('User/authenticate', 'POST', account).then(res => {
                const user = res.data;
                dispatch(success(user));
                localStorage.setItem('jwt', user.resultObj)
                //    localStorage.setItem('username', user.userName)
                 history.push('/');
            })
        }
        // dispatch(request());
        // callAPI('User/authenticate', 'POST',{email,password
        // }).then(res => {
        //     const user = res.data;
        //     dispatch(success(user));
        //     localStorage.setItem('jwt', user.token)
        //     localStorage.setItem('username', user.userName)
        //     history.push('/');
        // })

        //     .catch(err => {
        //         dispatch(failure(err.toString()));
        //         if (err.response.status === 404) {
        //             store.addNotification({
        //                 message: "Incorrect email or password",
        //                 type: "danger",
        //                 insert: "top",
        //                 container: "top-center",
        //                 animationIn: ["animated", "fadeIn"],
        //                 animationOut: ["animated", "fadeOut"],
        //                 dismiss: {
        //                     duration: 2000,
        //                     onScreen: false
        //                 }
        //             })
        //         } else {
        //             store.addNotification({
        //                 message: err.toString(),
        //                 type: "danger",
        //                 insert: "top",
        //                 container: "top-center",
        //                 animationIn: ["animated", "fadeIn"],
        //                 animationOut: ["animated", "fadeOut"],
        //                 dismiss: {
        //                     duration: 2000,
        //                     onScreen: false
        //                 }
        //             })
        //         }
        //     })
    }

    function request(user) {
        return {
            type: userConstants.LOGIN_REQUEST,
            user
        }
    }

    function success(user) {
        return {
            type: userConstants.LOGIN_SUCCESS,
            user
        }
    }

    function failure(error) {
        return {
            type: userConstants.LOGIN_FAILURE,
            error
        }
    }
}

function logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('jwt');
    return { type: userConstants.LOGOUT };
}



