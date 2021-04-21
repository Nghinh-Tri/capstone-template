export const Type = {
    LOGIN_REQUEST: "USERS_LOGIN_REQUEST",
    LOGIN_SUCCESS: "USERS_LOGIN_SUCCESS",
    LOGIN_FAILURE: "USERS_LOGIN_FAILURE",

    REGISTER_REQUEST: "USERS_REGISTER_REQUEST",
    REGISTER_SUCCESS: "USERS_REGISTER_SUCCESS",
    REGISTER_FAILURE: "USERS_REGISTER_FAILURE",

    ADD_MORE_CANDIDATE: "ADD_MORE_CANDIDATE",

    LOGOUT: "USERS_LOGOUT",

    GETALL_REQUEST: "USERS_GETALL_REQUEST",
    GETALL_SUCCESS: "USERS_GETALL_SUCCESS",
    GETALL_FAILURE: "USERS_GETALL_FAILURE",

    ADD_POSITION_REQUIRE: "ADD_POSITION_REQUIRE",
    DELETE_POSITION_REQUIRE: "DELETE_POSITION_REQUIRE",
    UPDATE_POSITION_ID: "UPDATE_POSITION_ID",
    SELECT_POS_LEVEL: "SELECT_POS_LEVEL",

    ADD_LANGUAGE_REQUIRE: "ADD_LANGUAGE_REQUIRE",
    DELETE_LANGUAGE_REQUIRE: "DELETE_LANGUAGE_REQUIRE",
    UPDATE_LANGUAGE_ID: "UPDATE_LANGUAGE_ID",
    UPDATE_LANGUAGE_PRIORITY: "UPDATE_LANGUAGE_PRIORITY",

    ADD_SOFT_SKILL_REQUIRE: "ADD_SOFT_SKILL_REQUIRE",
    DELETE_SOFT_SKILL_REQUIRE: "DELETE_SOFT_SKILL_REQUIRE",
    UPDATE_SOFT_SKILL: "UPDATE_SOFT_SKILL",

    ADD_HARD_SKILL_REQUIRE: "ADD_HARD_SKILL_REQUIRE",
    DELETE_HARD_SKILL_REQUIRE: "DELETE_HARD_SKILL_REQUIRE",
    UPDATE_HARD_SKILL_LEVEL: "UPDATE_HARD_SKILL_LEVEL",
    UPDATE_HARD_SKILL_PRIORITY: "UPDATE_HARD_SKILL_PRIORITY",
    UPDATE_HARD_SKILL_ID: "UPDATE_HARD_SKILL_ID",
    UPDATE_HARD_SKILL_CERTI: "UPDATE_HARD_SKILL_CERTI",

    FETCH_POSITION_LIST: "FETCH_POSITION_LIST",
    FETCH_SOFT_SKILL_LIST: "FETCH_SOFT_SKILL_LIST",
    FETCH_HARD_SKILL_LIST: "FETCH_HARD_SKILL_LIST",
    FETCH_CERTIFICATION_LIST: "FETCH_CERTIFICATION_LIST",
    FETCH_LANGUAGE_LIST: "FETCH_LANGUAGE_LIST",

    ADD_MORE_CANDIDATES: 'ADD_MORE_CANDIDATES',
    ADD_MORE_POSITION: 'ADD_MORE_POSITION',

    GENERATE_PROJECT: "GENERATE_PROJECT",
    CREATE_PROJECT: "CREATE_PROJECT",
    UPDATE_PROJECT_DETAIL: "UPDATE_PROJECT_DETAIL",
    UPDATE_PROJECT: "UPDATE_PROJECT",
    FETCH_PROJECT: "FETCH_PROJECT",
    FETCH_PROJECT_TYPE: "FETCH_PROJECT_TYPE",
    FETCH_PROJECT_FIELD: "FETCH_PROJECT_FIELD",
    FETCH_PROJECT_DETAIL: "FETCH_PROJECT_DETAIL",
    FETCH_POSITION_REQUIRE: "FETCH_POSITION_REQUIRE",
    FETCH_LIST_EMPLOYEE: "FETCH_LIST_EMPLOYEE",

    CREATE_POSITION: "CREATE_POSITION",
    CHECK_VALIDATE_POSITION: "CHECK_VALIDATE_POSITION",
    CREATE_POSITION_FAIL: "CREATE_POSITION_FAIL",

    FETCH_PROFILE_DETAIL: "FETCH_PROFILE_DETAIL",
    PROFILE_PAGE: "PROFILE_PAGE",
    FETCH_POSITION_PROFILE_DETAIL: "FETCH_POSITION_PROFILE_DETAIL",
    FETCH_PROFILE: "FETCH_PROFILE",

    AWAITING_STATISTICS: "AWAITING_STATISTICS",

    GET_PREV_REQUIRE: 'GET_PREV_REQUIRE',
    SUGGEST_AGAIN: 'SUGGEST_AGAIN',
};

export const alertConstants = {
    SUCCESS: 'ALERT_SUCCESS',
    ERROR: 'ALERT_ERROR',
    CLEAR: 'ALERT_CLEAR'
};

export const SUGGEST_CANDIDATE = {
    SET_SELECT_POSITION: 'SET_SELECT_POSITION',
    SELECT_CANDIDATE: 'SELECT_CANDIDATE',
    SELECT_ALL_CANDIDATE: 'SELECT_ALL_CANDIDATE',
    UNSELECT_CANDIDATE: 'UNSELECT_CANDIDATE',
    UNSELECT_ALL_CANDIDATE: 'UNSELECT_ALL_CANDIDATE',
    FETCH_SELECTED_LIST: 'FETCH_SELECTED_LIST',
    FETCH_SUGGEST_LIST: 'FETCH_SUGGEST_LIST',
    SORT_LIST: 'SORT_LIST',
    CONFIRM_SUGGEST: 'CONFIRM_SUGGEST',
    CONFIRM_SUGGEST_FAIL: 'CONFIRM_SUGGEST_FAIL'
}


export const SESSION = {
    SESSION_TIME_OUT: 'SESSION_TIME_OUT',
    SESSION_ALLOW: 'SESSION_ALLOW'
}

export const ROLE = {
    PROJECT_MANAGER: 'PROJECT_MANAGER',
    EMPLOYEE: 'EMPLOYEE'
}

export const FIREBASE = {
    RECIEVE_MESSAGE: 'RECIEVE_MESSAGE'
}

export const ERROR = {
    PROJECT_ERROR: 'PROJECT_ERROR',
    LOGIN_ERROR: 'LOGIN_ERROR'
}