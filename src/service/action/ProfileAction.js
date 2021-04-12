import axios from "axios";
import { Type } from "../constant";
import { history } from "../helper/History";
import { API_URL } from "../util/util";

export const fetchProfileDetail = (id) => {
    var url = `${API_URL}/User/${id}`
    return (dispatch) => {
        return axios.get(
            url,
            { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } }
        ).then(res => {
            dispatch(fetchProfileDetailSuccess(res.data.resultObj))
        })
    }
}

export const fetchPositionProfileDetail = (id) => {
    var url = `${API_URL}/User/getEmpInfo/${id}`
    return (dispatch) => {
        return axios.get(
            url,
            { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } }
        ).then(res => {
            dispatch(fetchPositionProfileDetailSuccess(res.data.resultObj))
        })
    }
}


export const fetchProfileDetailSuccess = (resultObj) => {
    return {
        type: Type.FETCH_PROFILE_DETAIL,
        resultObj
    }
}

export const fetchPositionProfileDetailSuccess = (resultObj) => {
    return {
        type: Type.FETCH_POSITION_PROFILE_DETAIL,
        resultObj
    }
}


export const pushToProfilePage = () => {
    history.push('/profile')
    return { type: Type.PROFILE_PAGE }
}

//Get list employees
export const fetchProfile = (pageIndex, pageSize ,search) => {
  var url = "";
  if (search.length > 0) {
    url = `${API_URL}/User/paging?Keyword=${search}&PageIndex=${pageIndex}&PageSize=${pageSize}`;
  } else url = `${API_URL}/User/paging?PageIndex=${pageIndex}&PageSize=${pageSize}`;
  return (dispatch) => {
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      })
      .then((res) => {
        dispatch(fetchProfileSuccess(res.data.resultObj));
      });
  };
};

export const fetchProfileSuccess = (resultObj) => {
  return {
    type: Type.FETCH_PROFILE,
    resultObj,
  };
};