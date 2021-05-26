import { Type } from "../../constant/index";

var initState = [];

const positionReducer = (state = initState, action) => {

    var positionObj, softSkill, hardSkill, hardSkillObj, languageClone, languageDetail = null

    switch (action.type) {

        case Type.CREATE_PROJECT:
            state = []
            return [...state]

        case Type.ADD_MORE_CANDIDATE:
            state = []
            var obj = {
                posID: parseInt(action.posID),
                candidateNeeded: 1,//posLevel:0
                language: [{
                    langID: 0,
                    priority: 10
                }],
                softSkillIDs: { minium: [], option: [] },
                hardSkills: { minium: [], option: [] }
            }

            if (action.hardSkill.length > 0) {
                action.hardSkill.forEach(element => {
                    var hardSkill = {
                        hardSkillID: parseInt(element.skillID),
                        skillLevel: 1,
                        certificationLevel: 0,
                        priority: 10,
                        certiList: element.certifications,
                        isDelete: false
                    }
                    obj.hardSkills.minium.push(hardSkill)
                });
            }
            if (action.softSkill.length > 0) {
                var array = []
                action.softSkill.forEach(element => {
                    array.push(parseInt(element))
                });
                obj.softSkillIDs.minium = array
            }
            state.push(obj)
            return [...state]

        case Type.COPY_REQUIREMENT:
            state = []
            var obj = {
                posID: parseInt(action.posID),
                candidateNeeded: 1,//posLevel:0
                language: [],
                softSkillIDs: { minium: [], option: [] },
                hardSkills: { minium: [], option: [] }
            }
            action.language.forEach(lan => {
                obj.language.push({
                    langID: lan.langID,
                    priority: lan.priority
                })
            })
            if (action.hardSkillList.length > 0) {
                action.hardSkillList.forEach(e => {
                    action.hardSkill.forEach(e1 => {
                        if (e1.hardSkillID === e.skillID) {
                            var hardSkill = {
                                hardSkillID: e1.hardSkillID,
                                skillLevel: e1.skillLevel,
                                certificationLevel: e1.certificationLevel,
                                priority: e1.priority,
                                certiList: e.certifications,
                                isDelete: false
                            }
                            obj.hardSkills.minium.push(hardSkill)
                        }
                    });
                });
            } else {
                action.hardSkill.map((e1, index) => {
                    action.certificateList.map((e, key) => {
                        if (e1.hardSkillID === e.hardSkillID) {
                            var hardSkill = {
                                hardSkillID: e1.hardSkillID,
                                skillLevel: e1.skillLevel,
                                certificationLevel: e1.certificationLevel,
                                priority: e1.priority,
                                certiList: e.certiList,
                                isDelete: true
                            }
                            obj.hardSkills.option.push(hardSkill)
                        }
                    });
                });
            }
            if (action.hardSkillList.length > 0) {
                var filter = action.hardSkill.filter(v => !(obj.hardSkills.minium.some(e => e.hardSkillID === v.hardSkillID)))
                filter.forEach(e1 => {
                    action.certificateList.forEach(e => {
                        if (e1.hardSkillID === e.hardSkillID) {
                            var hardSkill = {
                                hardSkillID: e1.hardSkillID,
                                skillLevel: e1.skillLevel,
                                certificationLevel: e1.certificationLevel,
                                priority: e1.priority,
                                certiList: e.certiList,
                                isDelete: true
                            }
                            obj.hardSkills.option.push(hardSkill)
                        }
                    });
                });
            }
            const sk = action.softskill
            if (action.softSkillList.length > 0) {
                var minium = []
                action.softSkillList.forEach(e => {
                    action.softskill.forEach(e1 => {
                        if (e === e1.softSkillID)
                            minium.push(e1.softSkillID)
                    });
                });
                obj.softSkillIDs.minium = minium
            }
            var filted = sk.filter(v => !(obj.softSkillIDs.minium).some(e => e === v.softSkillID))
            filted.forEach(element => {
                obj.softSkillIDs.option.push(element.softSkillID)
            });
            state.push(obj)
            return [...state]

        case Type.ADD_MORE_POSITION:
            state = []
            var obj = {
                posID: 0,
                candidateNeeded: 1,//posLevel:0
                language: [{
                    langID: 0,
                    priority: 10
                }],
                softSkillIDs: { minium: [], option: [] },
                hardSkills: { minium: [], option: [] }
            }
            state.push(obj)
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
            positionObj.hardSkills = { minium: [], option: [] }
            positionObj.softSkillIDs = { minium: [], option: [] }
            positionObj.language = []

            if (action.hardSkill.length > 0) {

                action.hardSkill.forEach(element => {
                    var hardSkill = {
                        hardSkillID: parseInt(element.skillID),
                        skillLevel: 1,
                        certificationLevel: 0,
                        priority: 10,
                        certiList: element.certifications,
                        isDelete: false
                    }
                    positionObj.hardSkills.minium.push(hardSkill)
                });
            }
            if (action.softSkill.length > 0) {
                var array = []
                action.softSkill.forEach(element => {
                    array.push(parseInt(element))
                });
                positionObj.softSkillIDs.minium = array
            }
            state.splice(action.positionFormIndex, 1, positionObj)
            return [...state]

        case Type.SELECT_POS_LEVEL:
            positionObj = { ...state[action.positionFormIndex] }
            positionObj.candidateNeeded = parseInt(action.value)
            state.splice(action.positionFormIndex, 1, positionObj)
            return [...state]

        //Language
        case Type.ADD_LANGUAGE_REQUIRE:
            positionObj = { ...state[action.positionFormIndex] }
            languageClone = positionObj.language.slice()
            languageClone.push(action.languageItem)
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
        case Type.UPDATE_SOFT_SKILL:
            positionObj = { ...state[action.positionFormIndex] }
            positionObj.softSkillIDs.option = action.value
            state.splice(action.positionFormIndex, 1, positionObj)
            return [...state]

        //Hard Skill
        case Type.ADD_HARD_SKILL_REQUIRE:
            positionObj = { ...state[action.positionFormIndex] }
            hardSkill = positionObj.hardSkills.option.slice()
            hardSkill.push(action.hardSkillItem)
            positionObj.hardSkills.option = hardSkill
            state.splice(action.positionFormIndex, 1, positionObj)
            return [...state]


        case Type.DELETE_HARD_SKILL_REQUIRE:
            positionObj = { ...state[action.positionFormIndex] }
            hardSkill = positionObj.hardSkills.option.slice()
            hardSkill.splice(action.hardSkillIndex, 1)
            positionObj.hardSkills.option = hardSkill
            state.splice(action.positionFormIndex, 1, positionObj)
            return [...state]


        case Type.UPDATE_HARD_SKILL_LEVEL:
            //Clone position obj (positionObj) at index in array
            positionObj = { ...state[action.positionFormIndex] }
            //Clone list hard skill in positionObj
            if (!action.isDelete) {
                hardSkill = positionObj.hardSkills.minium.slice()
                //Clone hard skill detail Obj (hardSkillObj) at index in hard skill list 
                hardSkillObj = { ...hardSkill[action.hardSkillIndex] }
                //Change exp, proprity value in hardSkillObj
                hardSkillObj.skillLevel = action.value
                //Replace hard skill detail Obj at index in clone of hard skill list by hardSkillObj
                hardSkill.splice(action.hardSkillIndex, 1, hardSkillObj)
                //Replace hard skill list in clone of position obj by clone of hard skill list
                positionObj.hardSkills.minium = hardSkill
            } else {
                hardSkill = positionObj.hardSkills.option.slice()
                //Clone hard skill detail Obj (hardSkillObj) at index in hard skill list 
                hardSkillObj = { ...hardSkill[action.hardSkillIndex] }
                //Change exp, proprity value in hardSkillObj
                hardSkillObj.skillLevel = action.value
                //Replace hard skill detail Obj at index in clone of hard skill list by hardSkillObj
                hardSkill.splice(action.hardSkillIndex, 1, hardSkillObj)
                //Replace hard skill list in clone of position obj by clone of hard skill list
                positionObj.hardSkills.option = hardSkill
            }
            //Replace position obj in array at index by clone of position obj
            state.splice(action.positionFormIndex, 1, positionObj)
            return [...state]


        case Type.UPDATE_HARD_SKILL_ID:
            //Clone position obj (positionObj) at index in array
            positionObj = { ...state[action.positionFormIndex] }
            //Clone list hard skill in positionObj
            hardSkill = positionObj.hardSkills.option.slice()
            //Clone hard skill detail Obj (hardSkillObj) at index in hard skill list 
            hardSkillObj = { ...hardSkill[action.hardSkillIndex] }
            //Change exp, proprity value in hardSkillObj
            hardSkillObj.hardSkillID = action.value
            hardSkillObj.certiList = action.certiList
            //Replace hard skill detail Obj at index in clone of hard skill list by hardSkillObj
            hardSkill.splice(action.hardSkillIndex, 1, hardSkillObj)
            //Replace hard skill list in clone of position obj by clone of hard skill list
            positionObj.hardSkills.option = hardSkill
            //Replace position obj in array at index by clone of position obj
            state.splice(action.positionFormIndex, 1, positionObj)
            return [...state]

        case Type.UPDATE_HARD_SKILL_PRIORITY:
            //Clone position obj (positionObj) at index in array
            positionObj = { ...state[action.positionFormIndex] }
            if (!action.isDelete) {
                //Clone list hard skill in positionObj
                hardSkill = positionObj.hardSkills.minium.slice()
                //Clone hard skill detail Obj (hardSkillObj) at index in hard skill list 
                hardSkillObj = { ...hardSkill[action.hardSkillIndex] }
                //Change exp, proprity value in hardSkillObj
                hardSkillObj.priority = action.value
                //Replace hard skill detail Obj at index in clone of hard skill list by hardSkillObj
                hardSkill.splice(action.hardSkillIndex, 1, hardSkillObj)
                //Replace hard skill list in clone of position obj by clone of hard skill list
                positionObj.hardSkills.minium = hardSkill
            } else {
                //Clone list hard skill in positionObj
                hardSkill = positionObj.hardSkills.option.slice()
                //Clone hard skill detail Obj (hardSkillObj) at index in hard skill list 
                hardSkillObj = { ...hardSkill[action.hardSkillIndex] }
                //Change exp, proprity value in hardSkillObj
                hardSkillObj.priority = action.value
                //Replace hard skill detail Obj at index in clone of hard skill list by hardSkillObj
                hardSkill.splice(action.hardSkillIndex, 1, hardSkillObj)
                //Replace hard skill list in clone of position obj by clone of hard skill list
                positionObj.hardSkills.option = hardSkill
            }
            //Replace position obj in array at index by clone of position obj
            state.splice(action.positionFormIndex, 1, positionObj)
            return [...state]

        case Type.UPDATE_HARD_SKILL_CERTI:
            //Clone position obj (positionObj) at index in array
            positionObj = { ...state[action.positionFormIndex] }
            if (!action.isDelete) {
                //Clone list hard skill in positionObj
                hardSkill = positionObj.hardSkills.minium.slice()
                //Clone hard skill detail Obj (hardSkillObj) at index in hard skill list 
                hardSkillObj = { ...hardSkill[action.hardSkillIndex] }
                //Change exp, proprity value in hardSkillObj
                hardSkillObj.certificationLevel = action.value
                //Replace hard skill detail Obj at index in clone of hard skill list by hardSkillObj
                hardSkill.splice(action.hardSkillIndex, 1, hardSkillObj)
                //Replace hard skill list in clone of position obj by clone of hard skill list
                positionObj.hardSkills.minium = hardSkill
            } else {
                //Clone list hard skill in positionObj
                hardSkill = positionObj.hardSkills.option.slice()
                //Clone hard skill detail Obj (hardSkillObj) at index in hard skill list 
                hardSkillObj = { ...hardSkill[action.hardSkillIndex] }
                //Change exp, proprity value in hardSkillObj
                hardSkillObj.certificationLevel = action.value
                //Replace hard skill detail Obj at index in clone of hard skill list by hardSkillObj
                hardSkill.splice(action.hardSkillIndex, 1, hardSkillObj)
                //Replace hard skill list in clone of position obj by clone of hard skill list
                positionObj.hardSkills.option = hardSkill
            }
            //Replace position obj in array at index by clone of position obj
            state.splice(action.positionFormIndex, 1, positionObj)
            return [...state]

        case Type.REFRESH_REGISTER_PAGE:
            state = []
            return state

        default:
            if (state.length === 0)
                state.push({
                    posID: 0,
                    candidateNeeded: 1,//posLevel:0
                    language: [{
                        langID: 0,
                        priority: 10
                    }],
                    softSkillIDs: { minium: [], option: [] },
                    hardSkills: { minium: [], option: [] }
                })
            return [...state]
    }
}

export default positionReducer;