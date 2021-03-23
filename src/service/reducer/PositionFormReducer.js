import { Type } from "../constant/index";

var initState = [];

const positionReducer = (state = initState, action) => {

    var positionObj, softSkill, hardSkill, hardSkillObj, languageClone, languageDetail = null

    switch (action.type) {

        case Type.CREATE_PROJECT:
            state = []
            return [...state]

        case Type.ADD_MORE_CANDIDATE:
            state = []
            return [...state]
        //Position
        case Type.ADD_POSITION_REQUIRE:
            state.push(action.positionItem)
            localStorage.setItem("isNewPosition", false)
            return [...state]


        case Type.DELETE_POSITION_REQUIRE:
            state.splice(action.positionFormIndex, 1)
            return [...state]


        case Type.UPDATE_POSITION_ID:
            positionObj = { ...state[action.positionFormIndex] }
            positionObj.posID = action.positionID
            state.splice(action.positionFormIndex, 1, positionObj)
            return [...state]

        case Type.SELECT_POS_LEVEL:
            positionObj = { ...state[action.positionFormIndex] }
            positionObj.posLevel = action.value
            state.splice(action.positionFormIndex, 1, positionObj)
            return [...state]

        //Language
        case Type.ADD_LANGUAGE_REQUIRE:
            positionObj = { ...state[action.positionFormIndex] }
            languageClone = positionObj.language.slice()
            languageClone.push(action.languageItem)
            positionObj.language = languageClone
            state.splice(action.positionFormIndex, 1, positionObj)
            console.log(state)
            return [...state]

        case Type.DELETE_LANGUAGE_REQUIRE:
            positionObj = { ...state[action.positionFormIndex] }
            languageClone = positionObj.language.slice()
            languageClone.splice(action.languageIndex, 1)
            positionObj.language = languageClone
            state.splice(action.positionFormIndex, 1, positionObj)
            return [...state]

        case Type.UPDATE_LANGUAGE_ID:
            //Clone position obj (positionObj) at index in array
            positionObj = { ...state[action.positionFormIndex] }
            //Clone list hard skill in positionObj
            languageClone = positionObj.language.slice()
            //Clone hard skill detail Obj (hardSkillObj) at index in hard skill list 
            languageDetail = { ...languageClone[action.languageIndex] }
            //Change exp, proprity value in hardSkillObj
            languageDetail.langID = action.languageID
            //Replace hard skill detail Obj at index in clone of hard skill list by hardSkillObj
            languageClone.splice(action.languageIndex, 1, languageDetail)
            //Replace hard skill list in clone of position obj by clone of hard skill list
            positionObj.language = languageClone
            //Replace position obj in array at index by clone of position obj
            state.splice(action.positionFormIndex, 1, positionObj)
            return [...state]

        case Type.UPDATE_LANGUAGE_PRIORITY:
            //Clone position obj (positionObj) at index in array
            positionObj = { ...state[action.positionFormIndex] }
            //Clone list hard skill in positionObj
            languageClone = positionObj.language.slice()
            //Clone hard skill detail Obj (hardSkillObj) at index in hard skill list 
            languageDetail = { ...languageClone[action.languageIndex] }
            //Change exp, proprity value in hardSkillObj
            languageDetail.priority = action.value
            //Replace hard skill detail Obj at index in clone of hard skill list by hardSkillObj
            languageClone.splice(action.languageIndex, 1, languageDetail)
            //Replace hard skill list in clone of position obj by clone of hard skill list
            positionObj.language = languageClone
            //Replace position obj in array at index by clone of position obj
            state.splice(action.positionFormIndex, 1, positionObj)
            return [...state]

        //Soft Skill
        case Type.ADD_SOFT_SKILL_REQUIRE:
            positionObj = { ...state[action.positionFormIndex] }
            softSkill = positionObj.softSkillIDs.slice()
            softSkill.push(0)
            positionObj.softSkillIDs = softSkill
            state.splice(action.positionFormIndex, 1, positionObj)
            return [...state]


        case Type.DELETE_SOFT_SKILL_REQUIRE:
            positionObj = { ...state[action.positionFormIndex] }
            softSkill = positionObj.softSkillIDs.slice()
            softSkill.splice(action.softSkillIndex, 1)
            positionObj.softSkillIDs = softSkill
            state.splice(action.positionFormIndex, 1, positionObj)
            return [...state]


        case Type.UPDATE_SOFT_SKILL:
            positionObj = { ...state[action.positionFormIndex] }
            softSkill = positionObj.softSkillIDs.slice()
            softSkill.splice(action.softSkillIndex, 1, action.softSkillID)
            positionObj.softSkillIDs = softSkill
            state.splice(action.positionFormIndex, 1, positionObj)
            return [...state]

        //Hard Skill
        case Type.ADD_HARD_SKILL_REQUIRE:
            positionObj = { ...state[action.positionFormIndex] }
            hardSkill = positionObj.hardSkills.slice()
            hardSkill.push(action.hardSkillItem)
            positionObj.hardSkills = hardSkill
            state.splice(action.positionFormIndex, 1, positionObj)
            return [...state]


        case Type.DELETE_HARD_SKILL_REQUIRE:
            positionObj = { ...state[action.positionFormIndex] }
            hardSkill = positionObj.hardSkills.slice()
            hardSkill.splice(action.hardSkillIndex, 1)
            positionObj.hardSkills = hardSkill
            state.splice(action.positionFormIndex, 1, positionObj)
            return [...state]


        case Type.UPDATE_HARD_SKILL_LEVEL:
            //Clone position obj (positionObj) at index in array
            positionObj = { ...state[action.positionFormIndex] }
            //Clone list hard skill in positionObj
            hardSkill = positionObj.hardSkills.slice()
            //Clone hard skill detail Obj (hardSkillObj) at index in hard skill list 
            hardSkillObj = { ...hardSkill[action.hardSkillIndex] }
            //Change exp, proprity value in hardSkillObj
            hardSkillObj.skillLevel = action.value
            //Replace hard skill detail Obj at index in clone of hard skill list by hardSkillObj
            hardSkill.splice(action.hardSkillIndex, 1, hardSkillObj)
            //Replace hard skill list in clone of position obj by clone of hard skill list
            positionObj.hardSkills = hardSkill
            //Replace position obj in array at index by clone of position obj
            state.splice(action.positionFormIndex, 1, positionObj)
            return [...state]


        case Type.UPDATE_HARD_SKILL_ID:
            //Clone position obj (positionObj) at index in array
            positionObj = { ...state[action.positionFormIndex] }
            //Clone list hard skill in positionObj
            hardSkill = positionObj.hardSkills.slice()
            //Clone hard skill detail Obj (hardSkillObj) at index in hard skill list 
            hardSkillObj = { ...hardSkill[action.hardSkillIndex] }
            //Change exp, proprity value in hardSkillObj
            hardSkillObj.hardSkillID = action.value
            //Replace hard skill detail Obj at index in clone of hard skill list by hardSkillObj
            hardSkill.splice(action.hardSkillIndex, 1, hardSkillObj)
            //Replace hard skill list in clone of position obj by clone of hard skill list
            positionObj.hardSkills = hardSkill
            //Replace position obj in array at index by clone of position obj
            state.splice(action.positionFormIndex, 1, positionObj)
            return [...state]

        case Type.UPDATE_HARD_SKILL_PRIORITY:
            //Clone position obj (positionObj) at index in array
            positionObj = { ...state[action.positionFormIndex] }
            //Clone list hard skill in positionObj
            hardSkill = positionObj.hardSkills.slice()
            //Clone hard skill detail Obj (hardSkillObj) at index in hard skill list 
            hardSkillObj = { ...hardSkill[action.hardSkillIndex] }
            //Change exp, proprity value in hardSkillObj
            hardSkillObj.priority = action.value
            //Replace hard skill detail Obj at index in clone of hard skill list by hardSkillObj
            hardSkill.splice(action.hardSkillIndex, 1, hardSkillObj)
            //Replace hard skill list in clone of position obj by clone of hard skill list
            positionObj.hardSkills = hardSkill
            //Replace position obj in array at index by clone of position obj
            state.splice(action.positionFormIndex, 1, positionObj)
            return [...state]

        case Type.UPDATE_HARD_SKILL_CERTI:
            //Clone position obj (positionObj) at index in array
            positionObj = { ...state[action.positionFormIndex] }
            //Clone list hard skill in positionObj
            hardSkill = positionObj.hardSkills.slice()
            //Clone hard skill detail Obj (hardSkillObj) at index in hard skill list 
            hardSkillObj = { ...hardSkill[action.hardSkillIndex] }
            //Change exp, proprity value in hardSkillObj
            hardSkillObj.certificationLevel = action.value
            //Replace hard skill detail Obj at index in clone of hard skill list by hardSkillObj
            hardSkill.splice(action.hardSkillIndex, 1, hardSkillObj)
            //Replace hard skill list in clone of position obj by clone of hard skill list
            positionObj.hardSkills = hardSkill
            //Replace position obj in array at index by clone of position obj
            state.splice(action.positionFormIndex, 1, positionObj)
            return [...state]

        default:
            return [...state]
    }
}

export default positionReducer;