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
const initialState = {
  countries: [],
  detail: [],
  copyCountries: [],
  allActivity: [],
  originalCountries: [],
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        copyCountries: action.payload,
        originalCountries: action.payload,
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
        allActivity: [...state.allActivity, action.payload],
      };

    case ALL_ACTIVITY:
      return {
        ...state,
        allActivity: action.payload,
      };
    case ORDER_ALPHABETS:
      if (action.payload === "Disorderly") {
        return {
          ...state,
          countries: [...state.originalCountries],
          orderAlphabets: null,
        };
      } else {
        const sortOrder = action.payload === "asc" ? "asc" : "des";
        const sortedCountries = state.countries
          .slice()
          .sort((a, b) =>
            sortOrder === "asc"
              ? a.name.localeCompare(b.name)
              : b.name.localeCompare(a.name)
          );

        return {
          ...state,
          countries: sortedCountries,
          orderAlphabets: sortOrder,
        };
      }
    case ORDER_POPULATION:
      if (action.payload === "Disorderly") {
        return {
          ...state,
          countries: [...state.originalCountries],
          orderPopulation: null,
        };
      } else {
        const sortOrder = action.payload === "asc" ? "asc" : "des";
        const sortedCountries = state.countries
          .slice()
          .sort((a, b) =>
            sortOrder === "asc"
              ? a.population - b.population
              : b.population - a.population
          );

        return {
          ...state,
          countries: sortedCountries,
          orderPopulation: sortOrder,
        };
      }

    case FILTER_CONTINENT:
      if (action.payload) {
        let continent =
          action.payload === "todos"
            ? state.copyCountries
            : state.copyCountries.filter(
                (c) => c.continents === action.payload
              );
        return {
          ...state,
          countries: continent,
        };
      }
      return {
        ...state,
      };

    case FILTER_ACTIVITY:
      let filteredCountries;

      if (action.payload === "Unfiltered") {
        // Obtener todos los países que tienen actividades registradas
        filteredCountries = state.copyCountries;
      } else if (action.payload === "AllActivities") {
        // Obtener todos los países que tienen actividades registradas
        const countryNamesWithActivities = state.allActivity.map((item) =>
          item.Countries[0] ? item.Countries[0].name : null
        );

        // Filtrar state.copyCountries según la lista de countryNamesWithActivities
        filteredCountries = state.copyCountries.filter((country) =>
          countryNamesWithActivities.includes(country.name)
        );
      } else {
        // Obtener los países según el nombre de la actividad
        const matchingItems = state.allActivity.filter(
          (item) => item.name === action.payload
        );
        const countryNames = matchingItems.map((item) =>
          item.Countries[0] ? item.Countries[0].name : null
        );

        // Filtrar state.copyCountries según la lista de countryNames
        filteredCountries = state.copyCountries.filter((country) =>
          countryNames.includes(country.name)
        );
      }

      return {
        ...state,
        countries: filteredCountries,
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
