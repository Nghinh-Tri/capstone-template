import { Type } from "../constant/index"
import axios from "axios";
import { API_URL } from "../util/util";
import { history } from "../helper/History";

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

export const createPosition = (positionItem) => {
    var projectID = localStorage.getItem("projectId")
    var position = { requiredPositions: positionItem }
    var urlToAddRequire = `${API_URL}/Project/addRequirements/${projectID} `
    return (dispatch) => {
        axios.post(
            urlToAddRequire,
            position,
            { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")} ` } }
        ).then(res => {
            console.log(res)
            if (res.status === 200) {
                dispatch(createPositionSuccess())
                localStorage.setItem('positionRequire', JSON.stringify(positionItem))
                history.push("/project/suggest-candidate")
            }
        })
    }
}

export const createPositionSuccess = () => {
    return {
        type: Type.CREATE_POSITION
    }
}