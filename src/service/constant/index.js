export const Type = {
    LOGIN_REQUEST: 'USERS_LOGIN_REQUEST',
    LOGIN_SUCCESS: 'USERS_LOGIN_SUCCESS',
    LOGIN_FAILURE: 'USERS_LOGIN_FAILURE',

    REGISTER_REQUEST: 'USERS_REGISTER_REQUEST',
    REGISTER_SUCCESS: 'USERS_REGISTER_SUCCESS',
    REGISTER_FAILURE: 'USERS_REGISTER_FAILURE',


    LOGOUT: 'USERS_LOGOUT',

    GETALL_REQUEST: 'USERS_GETALL_REQUEST',
    GETALL_SUCCESS: 'USERS_GETALL_SUCCESS',
    GETALL_FAILURE: 'USERS_GETALL_FAILURE',

    ADD_POSITION_REQUIRE: "ADD_POSITION_REQUIRE",
    DELETE_POSITION_REQUIRE: "DELETE_POSITION_REQUIRE",
    UPDATE_POSITION_ID: "UPDATE_POSITION_ID",
    UPDATE_POSITION_NOC: "UPDATE_POSITION_NOC",

    ADD_LANGUAGE_REQUIRE: "ADD_LANGUAGE_REQUIRE",
    DELETE_LANGUAGE_REQUIRE: "DELETE_LANGUAGE_REQUIRE",
    UPDATE_LANGUAGE_ID: "UPDATE_LANGUAGE_ID",
    UPDATE_LANGUAGE_PRIORITY: "UPDATE_LANGUAGE_PRIORITY",

    ADD_SOFT_SKILL_REQUIRE: "ADD_SOFT_SKILL_REQUIRE",
    DELETE_SOFT_SKILL_REQUIRE: "DELETE_SOFT_SKILL_REQUIRE",
    UPDATE_SOFT_SKILL: "UPDATE_SOFT_SKILL",

    ADD_HARD_SKILL_REQUIRE: "ADD_HARD_SKILL_REQUIRE",
    DELETE_HARD_SKILL_REQUIRE: "DELETE_HARD_SKILL_REQUIRE",
    UPDATE_HARD_SKILL_EXP: "UPDATE_HARD_SKILL_EXP",
    UPDATE_HARD_SKILL_PRIORITY: "UPDATE_HARD_SKILL_PRIORITY",
    UPDATE_HARD_SKILL_ID: "UPDATE_HARD_SKILL_ID",
    UPDATE_HARD_SKILL_CERTI: "UPDATE_HARD_SKILL_CERTI",


    FETCH_POSITION_LIST: "FETCH_POSITION_LIST",
    FETCH_SOFT_SKILL_LIST: "FETCH_SOFT_SKILL_LIST",
    FETCH_HARD_SKILL_LIST: "FETCH_HARD_SKILL_LIST",
    FETCH_CERTIFICATION_LIST: "FETCH_CERTIFICATION_LIST",
    FETCH_LANGUAGE_LIST: "FETCH_LANGUAGE_LIST",

    GENERATE_PROJECT: "GENERATE_PROJECT",
    CREATE_PROJECT: "CREATE_PROJECT",
    UPDATE_PROJECT_DETAIL: "UPDATE_PROJECT_DETAIL",
    UPDATE_PROJECT: "UPDATE_PROJECT",
    FETCH_PROJECT: "FETCH_PROJECT",
    FETCH_PROJECT_DETAIL: "FETCH_PROJECT_DETAIL",

    CREATE_POSITION: "CREATE_POSITION",

};

export const alertConstants = {
    SUCCESS: 'ALERT_SUCCESS',
    ERROR: 'ALERT_ERROR',
    CLEAR: 'ALERT_CLEAR'
};

export const SUGGEST_CANDIDATE = {
    SET_SELECT_POSITION: 'SET_SELECT_POSITION',
    SELECT_CANDIDATE: 'SELECT_CANDIDATE',
    UNSELECT_CANDIDATE: 'UNSELECT_CANDIDATE',
    FETCH_SELECTED_LIST: 'FETCH_SELECTED_LIST',
    FETCH_SUGGEST_LIST: 'FETCH_SUGGEST_LIST'
}
