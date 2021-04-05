import { Type } from "../constant/index"
import axios from "axios";
import { API_URL } from "../util/util";
import { history } from "../helper/History";
import { store } from "react-notifications-component";

export const addPositionRequire = (positionItem) => {
    return {
        type: Type.ADD_POSITION_REQUIRE,
        positionItem
    };
}

export const deletePositionRequire = positionFormIndex => {
    return {
        type: Type.DELETE_POSITION_REQUIRE,
        positionFormIndex
    }
}

export const updatePositionID = (positionID, positionFormIndex) => {
    return {
        type: Type.UPDATE_POSITION_ID,
        positionFormIndex,
        positionID
    }
}

export const selectPosLevel = (value, positionFormIndex) => {
    return {
        type: Type.SELECT_POS_LEVEL,
        positionFormIndex,
        value
    }
}

export const addLanguageRequire = (positionFormIndex, languageItem) => {
    return {
        type: Type.ADD_LANGUAGE_REQUIRE,
        positionFormIndex, languageItem
    };
}

export const deleteLanguageRequire = (languageIndex, positionFormIndex) => {
    return {
        type: Type.DELETE_LANGUAGE_REQUIRE,
        positionFormIndex,
        languageIndex
    }
}

export const updateLanguageID = (languageID, languageIndex, positionFormIndex) => {
    return {
        type: Type.UPDATE_LANGUAGE_ID,
        positionFormIndex,
        languageIndex,
        languageID
    }
}

export const updateLanguagePriority = (value, languageIndex, positionFormIndex) => {
    return {
        type: Type.UPDATE_LANGUAGE_PRIORITY,
        positionFormIndex,
        languageIndex,
        value
    }
}

export const addSoftSkillRequire = (positionFormIndex) => {
    return {
        type: Type.ADD_SOFT_SKILL_REQUIRE,
        positionFormIndex
    };
}

export const deleteSoftSkillRequire = (softSkillIndex, positionFormIndex) => {
    return {
        type: Type.DELETE_SOFT_SKILL_REQUIRE,
        positionFormIndex,
        softSkillIndex
    }
}

export const updateSoftSkillID = (softSkillID, softSkillIndex, positionFormIndex) => {
    return {
        type: Type.UPDATE_SOFT_SKILL,
        positionFormIndex,
        softSkillIndex,
        softSkillID
    }
}

export const addHardSkillRequire = (positionFormIndex, hardSkillItem) => {
    return {
        type: Type.ADD_HARD_SKILL_REQUIRE,
        positionFormIndex,
        hardSkillItem
    };
}

export const deleteHardSkillRequire = (hardSkillIndex, positionFormIndex) => {
    return {
        type: Type.DELETE_HARD_SKILL_REQUIRE,
        positionFormIndex,
        hardSkillIndex
    }
}

export const updateHardSkillLevel = (hardSkillIndex, positionFormIndex, value) => {
    return {
        type: Type.UPDATE_HARD_SKILL_LEVEL,
        positionFormIndex,
        hardSkillIndex,
        value
    }
}

export const updateHardSkillID = (value, hardSkillIndex, positionFormIndex) => {
    return {
        type: Type.UPDATE_HARD_SKILL_ID,
        positionFormIndex,
        hardSkillIndex,
        value
    }
}

export const updateHardSkillPriority = (value, hardSkillIndex, positionFormIndex) => {
    return {
        type: Type.UPDATE_HARD_SKILL_PRIORITY,
        positionFormIndex,
        hardSkillIndex,
        value
    }
}

export const updateHardSkillCerti = (value, hardSkillIndex, positionFormIndex) => {
    return {
        type: Type.UPDATE_HARD_SKILL_CERTI,
        positionFormIndex,
        hardSkillIndex,
        value
    }
}

export const createPosition = (positionItem, isUpdate) => {
    var projectID = localStorage.getItem("projectId")
    var position = { requiredPositions: positionItem }
    var urlToAddRequire = `${API_URL}/Project/addRequirements/${projectID} `
    return (dispatch) => {
        //not create position requirement
        if (positionItem.length === 0) {
            dispatch(createPositionFailed())
            store.addNotification({
                message: "Please create position requirement",
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
        }//not select position id 
        else if (typeof positionItem.find(opt => opt.posID === 0) !== 'undefined') {
            dispatch(createPositionFailed())
            store.addNotification({
                message: "Please select position",
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
        }//not select position level
        else if (typeof positionItem.find(opt => opt.posLevel.length === 0) !== 'undefined') {
            dispatch(createPositionFailed())
            store.addNotification({
                message: "Please select position level",
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
        }// not create language requirement
        else if (typeof positionItem.find(opt => opt.language.length === 0) !== 'undefined') {
            dispatch(createPositionFailed())
            store.addNotification({
                message: "Please create language requirement",
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
        }// not select language
        else if (typeof positionItem.find(opt => opt.language.find(lang => lang.langID === 0)) !== 'undefined') {
            dispatch(createPositionFailed())
            store.addNotification({
                message: "Please select language",
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
        }// not select language priority
        else if (typeof positionItem.find(opt => opt.language.find(lang => lang.priority === 0)) !== 'undefined') {
            dispatch(createPositionFailed())
            store.addNotification({
                message: "Please select language priority",
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
        }// not create hard skill requirement
        else if (typeof positionItem.find(opt => opt.hardSkills.length === 0) !== 'undefined') {
            dispatch(createPositionFailed())
            store.addNotification({
                message: "Please create hard skill requirement",
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
        }// not select hard skill
        else if (typeof positionItem.find(opt => opt.hardSkills.find(skill => skill.hardSkillID === 0)) !== 'undefined') {
            dispatch(createPositionFailed())
            store.addNotification({
                message: "Please select hard skill",
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
        }// not select hard skill level
        else if (typeof positionItem.find(opt => opt.hardSkills.find(skill => skill.skillLevel === 0)) !== 'undefined') {
            dispatch(createPositionFailed())
            store.addNotification({
                message: "Please select hard skill level",
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
        }// not select Certification Level
        else if (typeof positionItem.find(opt => opt.hardSkills.find(skill => skill.certificationLevel === -1)) !== 'undefined') {
            dispatch(createPositionFailed())
            store.addNotification({
                message: "Please select certification Level",
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
        }// not select hard skill priority
        else if (typeof positionItem.find(opt => opt.hardSkills.find(skill => skill.priority === 0)) !== 'undefined') {
            dispatch(createPositionFailed())
            store.addNotification({
                message: "Please select hard skill priority",
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
        //validated
        else {
            axios.post(
                urlToAddRequire,
                position,
                { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")} ` } }
            ).then(res => {
                if (res.status === 200) {
                    dispatch(createPositionSuccess())
                    localStorage.setItem('positionRequire', JSON.stringify(positionItem))
                    history.push("/project/suggest-candidate", { isUpdate: isUpdate })
                }
            })
        }
    }
}

export const createPositionSuccess = () => {
    return {
        type: Type.CREATE_POSITION
    }
}

export const createPositionFailed = () => {
    return {
        type: Type.CREATE_POSITION_FAIL
    }
}

export const addMoreCandidate = () => {
    history.push("/project/create-position", { isUpdate: true })
    return { type: Type.ADD_MORE_CANDIDATE }
}