import axios from "axios";
import { Type } from "../../constant";
import { API_URL, getEmpID, getRole } from "../../util/util";


export const fetchDataStatistics = () => {
    var empID = getEmpID()
    var url = ''
    var role = getRole()
    if (role === 'PM') {
            url = `${API_URL}/Project/getStatistics/${empID}`
    }
    return (dispatch) => {
        axios.get(
            url,
            { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } }
        ).then(res => {
            dispatch(fetchDataStatisticsSuccess(res.data.resultObj))
        })
    }
}

export const fetchDataStatisticsSuccess = list => {
    return {
        type: Type.AWAITING_STATISTICS,
        list
        
    };
}
