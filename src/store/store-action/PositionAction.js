import { callAPI } from "../../util";
import * as Types from "../store-constant"

export const addPositionRequire = (positionItem) => {
    return {
        type: Types.ADD_POSITION_REQUIRE,
        positionItem
    };
}

export const deletePositionRequire = positionFormIndex => {
    return {
        type: Types.DELETE_POSITION_REQUIRE,
        positionFormIndex
    }
}

export const updatePositionID = (positionID, positionFormIndex) => {
    return {
        type: Types.UPDATE_POSITION_ID,
        positionFormIndex,
        positionID
    }
}

export const updateNOC = (nOC, positionFormIndex) => {
    return {
        type: Types.UPDATE_POSITION_NOC,
        positionFormIndex,
        nOC
    }
}

export const addLanguageRequire = (positionFormIndex) => {
    return {
        type: Types.ADD_LANGUAGE_REQUIRE,
        positionFormIndex
    };
}

export const deleteLanguageRequire = (languageIndex, positionFormIndex) => {
    return {
        type: Types.DELETE_LANGUAGE_REQUIRE,
        positionFormIndex,
        languageIndex
    }
}

export const updateLanguageID = (languageID, languageIndex, positionFormIndex) => {
    return {
        type: Types.UPDATE_LANGUAGE,
        positionFormIndex,
        languageIndex,
        languageID
    }
}

export const addSoftSkillRequire = (positionFormIndex) => {
    return {
        type: Types.ADD_SOFT_SKILL_REQUIRE,
        positionFormIndex
    };
}

export const deleteSoftSkillRequire = (softSkillIndex, positionFormIndex) => {
    return {
        type: Types.DELETE_SOFT_SKILL_REQUIRE,
        positionFormIndex,
        softSkillIndex
    }
}

export const updateSoftSkillID = (softSkillID, softSkillIndex, positionFormIndex) => {
    return {
        type: Types.UPDATE_SOFT_SKILL,
        positionFormIndex,
        softSkillIndex,
        softSkillID
    }
}

export const addHardSkillRequire = (positionFormIndex, hardSkillItem) => {
    return {
        type: Types.ADD_HARD_SKILL_REQUIRE,
        positionFormIndex,
        hardSkillItem
    };
}

export const deleteHardSkillRequire = (hardSkillIndex, positionFormIndex) => {
    return {
        type: Types.DELETE_HARD_SKILL_REQUIRE,
        positionFormIndex,
        hardSkillIndex
    }
}

export const updateHardSkillExpPriority = (hardSkillIndex, positionFormIndex, value, name) => {
    return {
        type: Types.UPDATE_HARD_SKILL_EXP_PRIORITY,
        positionFormIndex,
        hardSkillIndex,
        value, name
    }
}

export const updateHardSkillID = (value, hardSkillIndex, positionFormIndex) => {
    return {
        type: Types.UPDATE_HARD_SKILL_ID,
        positionFormIndex,
        hardSkillIndex,
        value
    }
}

export const updateHardSkillCerti = (value, hardSkillIndex, positionFormIndex) => {
    return {
        type: Types.UPDATE_HARD_SKILL_CERTI,
        positionFormIndex,
        hardSkillIndex,
        value
    }
}

export const createPosition = (positionItem) => {
    var projectID = localStorage.getItem("projectId")
    var position = {requiredPositions: positionItem}
    return (dispatch) => {
        return callAPI(`Position/${projectID}`, 'POST', position).then(res => {
            dispatch(createPositionSuccess(res.data.isSuccessed))
        })
    }
}

export const createPositionSuccess = (result) => {
    return {
        type: Types.CREATE_POSITION,
        result
    }
}