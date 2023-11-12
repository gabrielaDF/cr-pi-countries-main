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
const initialState = {
  countries: [],
  detail: [],
  copyCountries: [],
  allActivities: [],
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        copyCountries: action.payload,
        allActivities: action.payload,
      };
    case GET_COUNTRY_NAME:
      return {
        ...state,
        countries: action.payload,
        countrieName: action.payload,
      };
    case GET_COUNTRY_ID:
      return {
        ...state,
        detail: action.payload,
      };
    case CREATE_ACTIVITY:
      return {
        ...state,
      };
    case ALL_ACTIVITY:
      return {
        ...state,
        allActivities: action.payload,
      };
    case ORDER_ALPHABETS:
      if (action.payload === "asc") {
        let countriesAsc = state.countries.sort((a, b) =>
          a.name > b.name ? 1 : a.name < b.name ? -1 : 0
        );
        return {
          ...state,
          countries: countriesAsc,
        };
      } else {
        let countriesDes = state.countries.sort((b, a) =>
          a.name > b.name ? 1 : a.name < b.name ? -1 : 0
        );
        return {
          ...state,
          countries: countriesDes,
        };
      }
    case ORDER_POPULATION:
      if (action.payload === "asc") {
        let countriesMaMe = state.countries.sort((a, b) =>
          a.population > b.population ? 1 : a.population < b.population ? -1 : 0
        );
        return {
          ...state,
          countries: countriesMaMe,
        };
      } else {
        let countriesMeMa = state.countries.sort((b, a) =>
          a.population > b.population ? 1 : a.population < b.population ? -1 : 0
        );
        return {
          ...state,
          countries: countriesMeMa,
        };
      }
    case FILTER_CONTINENT:
      if (action.payload) {
        let continent =
          action.payload === "todos"
            ? state.copyCountries
            : state.cop4.filter((c) => c.continents === action.payload);
        return {
          ...state,
          countries: continent,
        };
      }
      return {
        ...state,
      };
    case FILTER_ACTIVITY:
      let mapCountries =
        action.payload === "todos"
          ? state.copyCountries
          : state.copyCountries.filter((c) => {
              let mapeo = c.activities?.map((d) => d.name);
              if (mapeo.includes(action.payload)) {
                return c;
              }
            });
      return {
        ...state,
        countries: mapCountries,
      };
    case CLEAR:
      return {
        ...state,
        detail: action.payload,
      };
    default:
      return { ...state };
  }
};
export default rootReducer;
