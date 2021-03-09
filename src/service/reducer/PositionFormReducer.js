import {Type} from "../constant/index";

var initState = [];

const positionReducer = (state = initState, action) => {

    var positionObj, softSkill, hardSkill, hardSkillObj, languageClone = null

    switch (action.type) {

        case Type.CREATE_PROJECT:
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


        case Type.UPDATE_POSITION_NOC:
            positionObj = { ...state[action.positionFormIndex] }
            positionObj.numberOfCandidates = parseInt(action.nOC)
            state.splice(action.positionFormIndex, 1, positionObj)
            return [...state]

        //Language
        case Type.ADD_LANGUAGE_REQUIRE:
            positionObj = { ...state[action.positionFormIndex] }
            languageClone = positionObj.language.slice()
            languageClone.push("")
            positionObj.language = languageClone
            state.splice(action.positionFormIndex, 1, positionObj)
            return [...state]

        case Type.DELETE_LANGUAGE_REQUIRE:
            positionObj = { ...state[action.positionFormIndex] }
            languageClone = positionObj.language.slice() 
            languageClone.splice(action.languageIndex, 1) 
            positionObj.language = languageClone 
            state.splice(action.positionFormIndex, 1, positionObj)
            return [...state]

        case Type.UPDATE_LANGUAGE:
            positionObj = { ...state[action.positionFormIndex] }
            languageClone = positionObj.language.slice()
            languageClone.splice(action.languageIndex, 1, action.languageID)
            positionObj.language = languageClone
            state.splice(action.positionFormIndex, 1, positionObj)
            return [...state]

        //Soft Skill
        case Type.ADD_SOFT_SKILL_REQUIRE:
            positionObj = { ...state[action.positionFormIndex] }
            softSkill = positionObj.softSkillIDs.slice()
            softSkill.push("")
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


        case Type.UPDATE_HARD_SKILL_EXP_PRIORITY:
            //Clone position obj (positionObj) at index in array
            positionObj = { ...state[action.positionFormIndex] }
            //Clone list hard skill in positionObj
            hardSkill = positionObj.hardSkills.slice()
            //Clone hard skill detail Obj (hardSkillObj) at index in hard skill list 
            hardSkillObj = hardSkill[action.hardSkillIndex]
            //Change exp, proprity value in hardSkillObj
            if (action.name === 'exp')
                hardSkillObj.exp = parseInt(action.value)
            else if (action.name === 'priority')
                hardSkillObj.priority = parseInt(action.value)
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

        case Type.UPDATE_HARD_SKILL_CERTI:
            //Clone position obj (positionObj) at index in array
            positionObj = { ...state[action.positionFormIndex] }
            //Clone list hard skill in positionObj
            hardSkill = positionObj.hardSkills.slice()
            //Clone hard skill detail Obj (hardSkillObj) at index in hard skill list 
            hardSkillObj = { ...hardSkill[action.hardSkillIndex] }
            //Change exp, proprity value in hardSkillObj
            hardSkillObj.certificationID = action.value
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