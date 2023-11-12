import {
  ALL_COUNTRIES,
  GET_COUNTRY_NAME,
  GET_COUNTRY_ID,
  CREATE_ACTIVITY,
  ALL_ACTIVITY,
  FILTER_CONTINENT,
  FILTER_ACTIVITY,
  ORDER_ALPHABETS,
  ORDER_POPULATION,
  CLEAR,
} from "./actions-type";
import axios from "axios";

const API_URL = "http:localhost:3001";

export function allCountries() {
  return async (dispatch) => {
    try {
      await axios(`${API_URL}/countries`).then((result) => {
        return dispatch({
          type: ALL_COUNTRIES,
          payload: result.data,
        });
      });
    } catch (error) {
      throw Error(error.message);
    }
  };
}
export function countryByName(name) {
  return async (dispatch) => {
    try {
      await axios(`${API_URL}/countries?name= ${name}`).then((result) => {
        return dispatch({
          type: GET_COUNTRY_NAME,
          payload: result.data,
        });
      });
    } catch (error) {
      throw Error(error.message);
    }
  };
}
export function countryById(id) {
  return async (dispatch) => {
    try {
      await axios(`${API_URL}/countries/${id}`).then((result) => {
        return dispatch({
          type: GET_COUNTRY_ID,
          payload: result.data,
        });
      });
    } catch (error) {
      throw Error(error.message);
    }
  };
}
export function createActivity(activity) {
  return async (dispatch) => {
    try {
      await axios.post(`${API_URL}//activities`, activity).then((result) => {
        return dispatch({
          type: CREATE_ACTIVITY,
          payload: result,
        });
      });
    } catch (error) {
      throw Error(error.message);
    }
  };
}
export function allActivity() {
  return async (dispatch) => {
    try {
      await axios(`${API_URL}/activities`).then((result) => {
        return dispatch({
          type: ALL_ACTIVITY,
          payload: result.data,
        });
      });
    } catch (error) {
      throw Error(error.message);
    }
  };
}
export function orderAlphabets(order) {
  return {
    type: ORDER_ALPHABETS,
    payload: order,
  };
}
export function orderPopulation(orderNum) {
  return {
    type: ORDER_POPULATION,
    payload: orderNum,
  };
}
export function filterContinent(continent) {
  return {
    type: FILTER_CONTINENT,
    payload: continent,
  };
}
export function filterActivity(activity) {
  return {
    type: FILTER_ACTIVITY,
    payload: activity,
  };
}
export function clear() {
  return {
    type: CLEAR,
    payload: [],
  };
}
