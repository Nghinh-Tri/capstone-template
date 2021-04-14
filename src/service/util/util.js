import axios from "axios";
import jwtDecode from "jwt-decode";

export const API_URL = "https://esms2020.azurewebsites.net/api"

export const callAPI = (endpoint, method = 'GET', body) => {
    return axios({
        method: method,
        url: `${API_URL}/${endpoint}`,
        data: body
    });
};

export const showStatus = status => {
    switch (status) {
        case 0:
            return "Pending"
        case 1:
            return "No Employee"
        case 2:
            return "Confirmed"
        case 3:
            return "On Going"
        case 4:
            return "Finish"
        default:
            break;
    }
}

export const showBadge = status => {
    switch (status) {
        case 0:
            return "error"
        case 1:
            return "default"
        case 2:
            return "warning"
        case 3:
            return "processing"
        case 4:
            return "success"
        default:
            break;
    }
}

export const showRequestStatus = status => {
    switch (status) {
        case 0:
            return "New"
        case 1:
            return "Waiting"
        case 2:
            return "Suggest Again"
        case 3:
            return "Finish"
        default:
            break;
    }
}

export const showSpan = status => {
    switch (status) {
        case 0:
            return "badge-secondary"
        case 1:
            return "badge-dark"
        case 2:
            return "badge-warning"
        case 3:
            return "badge-primary"
        case 4:
            return "badge-success"
        default:
            break;
    }
}

export const formatDate = date => {
    return date.split("/").reverse().join("-")
}

export const convertPositionList = (list) => {
    var result = []
    list.forEach(element => {
        result.push({
            label: element.name,
            value: element.posID,
            isSelect: typeof element.isSelect === 'undefined' ? false : element.isSelect
        })
    });
    return result;
}

export const convertSkillList = (list) => {
    var result = []
    list.forEach(element => {
        result.push({
            label: element.skillName,
            value: element.skillID,
            isSelect: typeof element.isSelect === 'undefined' ? false : element.isSelect
        })
    });
    return result;
}

export const convertCertificationList = (list) => {
    var result = [], map = new Map()
    result.push({
        label: 'All',
        value: 0,
        name: ['All']
    })
    list.forEach(element => {
        if (map.has(element.certiLevel)) {
            var array = map.get(element.certiLevel)
            array.push(element.certificationName)
            map.set(element.certiLevel, array)

        } else {
            var array = []
            array.push(element.certificationName)
            map.set(element.certiLevel, array)
        }
    });
    map.forEach((value, key) => {
        var obj = { label: 'Level ' + key, value: key, name: value }
        result.push(obj)
    })
    return result;
}

export const convertLanguageList = (list) => {
    var result = []
    list.forEach(element => {
        result.push({
            label: element.langName,
            value: element.langID,
            isSelect: typeof element.isSelect === 'undefined' ? false : element.isSelect
        })
    });
    return result;
}

export const convertProjectTypeList = (list) => {
    var result = []
    list.forEach(element => {
        result.push({
            label: element.name,
            value: element.id,
        })
    });
    return result;
}

export const sortSuggestListByOverallMatch = list => {
    list.sort((a, b) => { return b.overallMatch - a.overallMatch })
}

export const sortSuggestListByLanguageMatch = list => {
    list.sort((a, b) => { return b.languageMatch - a.languageMatch })
}

export const sortSuggestListBySoftSkillMatch = list => {
    list.sort((a, b) => { return b.softSkillMatch - a.softSkillMatch })
}

export const sortSuggestListByHardSkillMatch = list => {
    list.sort((a, b) => { return b.hardSkillMatch - a.hardSkillMatch })
}

export const convertSuggestList = list => {
    var result = []
    if (list.length > 0) {
        list.forEach(element => {
            var positionObj = { posID: element.posId, empIDs: [] }
            if (positionObj.posID === element.posId) {
                var empID = []
                element.candidateSelect.forEach(e => {
                    empID.push(e.empID)
                });
                positionObj.empIDs = empID
            }
            result.push(positionObj)
        });
    }
    return result
}

export const getSuggestAgainList = list => {
    var result = []
    if (list.length > 0) {
        list.forEach(element => {
            var positionObj = { posID: element.posID, empIDs: [] }
            if (positionObj.posID === element.posID) {
                var empID = []
                element.employees.forEach(e => {
                    if (e.dateIn === null)
                        empID.push(e.empID)
                });
                positionObj.empIDs = empID
            }
            if (positionObj.empIDs.length > 0)
                result.push(positionObj)
        });
    }
    return result
}

export const getSuggestAgainButton = (list) => {
    var i = 0
    list.forEach(element => {
        element.employees.forEach(emp => {
            if (emp.dateIn === null)
                i++
        });
    });
    return i === 0
}

export const getUserName = () => {
    var result = ''
    var token = localStorage.getItem('token')
    var decode = jwtDecode(token)
    Object.keys(decode).forEach(key => {
        let res = key.split('/')
        if (res[res.length - 1] === 'givenname') {
            result = decode[key]
        }
    })
    return result
}

export const getRole = () => {
    var result = ''
    var token = localStorage.getItem('token')
    var decode = jwtDecode(token)
    Object.keys(decode).forEach(key => {
        let res = key.split('/')
        if (res[res.length - 1] === 'role') {
            result = decode[key]
        }
    })
    return result
}

export const showRole = role => {
    switch (role) {
        case 'admin':
            return "Administrator"
        case 'PM':
            return "Project Manager"
        case 'Employee':
            return "Employee"
        default:
            break;
    }
}

export const showPositionLevel = level => {
    switch (level) {
        case 1:
            return "Intern"
        case 2:
            return "Fresher"
        case 3:
            return "Junior"
        case 4:
            return "Senior"
        case 5:
            return "Master"
        default:
            break;
    }
}

export const showHardSkillLevel = level => {
    switch (level) {
        case 1:
            return "Basic Knowledge"
        case 2:
            return "Limited Experience"
        case 3:
            return "Practical"
        case 4:
            return "Applied Theory"
        case 5:
            return "Recognized Authority"
        default:
            break;
    }
}

export const checkSuggestList = (list) => {
    var noItem = 0
    list.forEach(element => {
        if (element.matchDetail.length === 0)
            noItem++
    });
    return noItem === list.length
}

export const getPositionName = (list, posID) => {
    var result = ''
    list.forEach(element => {
        if (element.posID === posID) {
            result = element.name.toString().trim()
        }
    });
    return result
}


export const convertPositionRequire = (items) => {
    var result = []
    items.forEach(element => {
        var obj = {
            posID: element.posID,
            candidateNeeded: element.candidateNeeded,//posLevel:0
            language: element.language,
            softSkillIDs: [],
            hardSkills: []
        }
        element.hardSkills.minium.forEach(hs => {
            var hardSkill = {
                hardSkillID: hs.hardSkillID,
                certificationLevel: hs.certificationLevel,
                priority: hs.priority,
                skillLevel: hs.skillLevel,
            }
            obj.hardSkills.push(hardSkill)
        });
        element.hardSkills.option.forEach(hs => {
            var hardSkill = {
                hardSkillID: hs.hardSkillID,
                certificationLevel: hs.certificationLevel,
                priority: hs.priority,
                skillLevel: hs.skillLevel,
            }
            obj.hardSkills.push(hardSkill)
        });
        element.softSkillIDs.minium.forEach(sk => {
            obj.softSkillIDs.push(sk)
        })
        element.softSkillIDs.option.forEach(sk => {
            obj.softSkillIDs.push(sk)
        })
        result.push(obj)
    });
    return result
}