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
} from "./actions-types";
import axios from "axios";

const API_URL = "http://localhost:3001";

export function allCountries() {
  return async (dispatch) => {
    try {
      const result = await axios(`${API_URL}/countries`);
      dispatch({
        type: ALL_COUNTRIES,
        payload: result.data,
      });
    } catch (error) {
      throw Error(error.message);
    }
  };
}
export function countryByName(name) {
  return async (dispatch) => {
    try {
      const result = await axios(`${API_URL}/countries?name=${name}`);
      dispatch({
        type: GET_COUNTRY_NAME,
        payload: result.data,
      });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("No countries found");
      } else {
        throw Error(error.message);
      }
    }
  };
}
export function countryById(id) {
  return async (dispatch) => {
    try {
      const result = await axios(`${API_URL}/countries/${id}`);
      dispatch({
        type: GET_COUNTRY_ID,
        payload: result.data,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
export function createActivity(activity) {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${API_URL}/activities`, activity);
      const createdActivity = response.data;

      dispatch({
        type: CREATE_ACTIVITY,
        payload: createdActivity,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
export function allActivity() {
  return async (dispatch) => {
    try {
      const result = await axios.get(`${API_URL}/activities`);
      dispatch({
        type: ALL_ACTIVITY,
        payload: result.data,
      });
    } catch (error) {
      throw new Error(error.message);
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
