import { Type } from "../../constant/index"
import axios from "axios";
import { API_URL } from "../../util/util";
import { history } from "../../helper/History";
import { store } from "react-notifications-component";

export const addPositionRequire = (positionItem) => {
    return { type: Type.ADD_POSITION_REQUIRE, positionItem };
}

export const deletePositionRequire = positionFormIndex => {
    return { type: Type.DELETE_POSITION_REQUIRE, positionFormIndex }
}

export const updatePositionID = (positionID, positionFormIndex) => {
    var projectType = localStorage.getItem('projectType')
    var projectField = localStorage.getItem('projectField')
    var fetchHardSkill = `${API_URL}/Skill/type/${projectType}&&${positionID}`
    var fetchSoftSkill = `${API_URL}/Skill/field/${projectField}`
    var hardSkill = [], softSkill = []
    return (dispatch) => {
        axios.get(
            fetchSoftSkill,
            { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } }
        ).then(res => {
            softSkill = res.data.resultObj === null ? [] : res.data.resultObj
            axios.get(
                fetchHardSkill,
                { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } }
            ).then(res1 => {
                hardSkill = res1.data.resultObj === null ? [] : res1.data.resultObj
                dispatch(updatePositionIDSuccess(positionID, positionFormIndex, hardSkill, softSkill))
            })
        })
    }
}

export const updatePositionIDSuccess = (positionID, positionFormIndex, hardSkill, softSkill) => {
    return { type: Type.UPDATE_POSITION_ID, positionFormIndex, positionID, hardSkill, softSkill }
}

export const updateCandidateNeeds = (value, positionFormIndex) => {
    return { type: Type.SELECT_POS_LEVEL, positionFormIndex, value }
}

export const addLanguageRequire = (positionFormIndex, languageItem) => {
    return { type: Type.ADD_LANGUAGE_REQUIRE, positionFormIndex, languageItem };
}

export const deleteLanguageRequire = (languageIndex, positionFormIndex) => {
    return { type: Type.DELETE_LANGUAGE_REQUIRE, positionFormIndex, languageIndex }
}

export const updateLanguageID = (languageID, languageIndex, positionFormIndex) => {
    return { type: Type.UPDATE_LANGUAGE_ID, positionFormIndex, languageIndex, languageID }
}

export const updateLanguagePriority = (value, languageIndex, positionFormIndex) => {
    return { type: Type.UPDATE_LANGUAGE_PRIORITY, positionFormIndex, languageIndex, value }
}

export const addSoftSkillRequire = (positionFormIndex) => {
    return { type: Type.ADD_SOFT_SKILL_REQUIRE, positionFormIndex };
}

export const deleteSoftSkillRequire = (softSkillIndex, positionFormIndex) => {
    return { type: Type.DELETE_SOFT_SKILL_REQUIRE, positionFormIndex, softSkillIndex }
}

export const updateSoftSkillID = (value, positionFormIndex) => {
    return { type: Type.UPDATE_SOFT_SKILL, positionFormIndex, value }
}

export const addHardSkillRequire = (positionFormIndex, hardSkillItem) => {
    return { type: Type.ADD_HARD_SKILL_REQUIRE, positionFormIndex, hardSkillItem };
}

export const deleteHardSkillRequire = (hardSkillIndex, positionFormIndex) => {
    return { type: Type.DELETE_HARD_SKILL_REQUIRE, positionFormIndex, hardSkillIndex }
}

export const updateHardSkillLevel = (hardSkillIndex, positionFormIndex, value, isDelete) => {
    return { type: Type.UPDATE_HARD_SKILL_LEVEL, positionFormIndex, hardSkillIndex, value, isDelete }
}

export const updateHardSkillID = (value, hardSkillIndex, positionFormIndex) => {
    var certiUrl = `${API_URL}/Certification/getCertifications/${value}`
    return (dispatch) => {
        axios.get(
            certiUrl,
            { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } }
        ).then(res2 => {
            var certiList = res2.data.resultObj === null ? [] : res2.data.resultObj
            dispatch(updateHardSkillIDSuccess(value, hardSkillIndex, positionFormIndex, certiList))
        })
    }
}

export const updateHardSkillIDSuccess = (value, hardSkillIndex, positionFormIndex, certiList) => {
    return { type: Type.UPDATE_HARD_SKILL_ID, positionFormIndex, hardSkillIndex, value, certiList }
}

export const updateHardSkillPriority = (value, hardSkillIndex, positionFormIndex, isDelete) => {
    return { type: Type.UPDATE_HARD_SKILL_PRIORITY, positionFormIndex, hardSkillIndex, value, isDelete }
}

export const updateHardSkillCerti = (value, hardSkillIndex, positionFormIndex, isDelete) => {
    return { type: Type.UPDATE_HARD_SKILL_CERTI, positionFormIndex, hardSkillIndex, value, isDelete }
}

export const createPosition = (positionItem, isUpdate) => {
    var projectID = localStorage.getItem("projectId")
    var position = { requiredPositions: positionItem }
    var urlToAddRequire = `${API_URL}/Project/addRequirements/${projectID}`
    var urlCheckValidate = `${API_URL}/Project/checkStatus`
    return (dispatch) => {
        axios.post(
            urlToAddRequire,
            position,
            { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")} ` } }
        ).then(res => {
            if (res.data.isSuccessed) {
                dispatch(createPositionSuccess())
                localStorage.setItem('positionRequire', JSON.stringify(res.data.resultObj))
                history.push("/project/suggest-candidate", { isUpdate: isUpdate })
            }
        }).catch(err => {
            dispatch(createPositionFailed(err.response.data.errors))
        })
    }
}

export const createPositionSuccess = () => {
    return { type: Type.CREATE_POSITION }
}

export const createPositionFailed = (error) => {
    return { type: Type.CREATE_POSITION_FAIL, error }
}

export const refreshPage = () => {
    return { type: Type.REFRESH_REGISTER_PAGE }
}

export const addMoreCandidate = (posID) => {
    var projectType = localStorage.getItem('projectType')
    var projectField = localStorage.getItem('projectField')
    var fetchHardSkill = `${API_URL}/Skill/type/${projectType}&&${posID}`
    var fetchSoftSkill = `${API_URL}/Skill/field/${projectField}`
    return (dispatch) => {
        return axios.get(
            fetchHardSkill,
            { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } }
        ).then(res => {
            var hardSkill = res.data.resultObj === null ? [] : res.data.resultObj
            return axios.get(
                fetchSoftSkill,
                { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } }
            ).then(res => {
                var softSkill = res.data.resultObj === null ? [] : res.data.resultObj
                dispatch(addMoreCandidateSuccess(posID, hardSkill, softSkill))
            })
        })
    }
}

export const addMoreCandidateSuccess = (posID, hardSkill, softSkill) => {
    history.push("/project/create-position", { type: 'addMoreCandidate' })
    return { type: Type.ADD_MORE_CANDIDATE, posID, hardSkill, softSkill }
}

export const addMorePosition = (position) => {
    history.push("/project/create-position", { type: 'addMorePosition', position: position })
    return { type: Type.ADD_MORE_POSITION }
}

export const getPrevRequire = (projectId, posID) => {
    var url = `${API_URL}/Project/getRequiredPosByID/${projectId}&&${posID}`
    return (dispatch) => {
        return axios.get(
            url,
            { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } }
        ).then(res => {
            if (res.data.isSuccessed)
                dispatch(getPrevRequireSuccess(res.data.resultObj))
            else
                dispatch(getPrevRequireFailed())
        })
    }
}

export const getPrevRequireSuccess = prevRequire => {
    return { type: Type.GET_PREV_REQUIRE, prevRequire }
}

export const getPrevRequireFailed = () => {
    return { type: Type.GET_PREV_REQUIRE }
}

export const suggestAgain = () => {
    history.push('/project/suggest-candidate', { type: 'SuggestAgain' })
    return { type: Type.SUGGEST_AGAIN }
}