const axios = require("axios");
const URL = "http://localhost:5000/countries";
const { Country } = require("../db");

const getAllCountries = async (req, res) => {
  try {
    const { data } = await axios(URL);

    const allCountries = await data.map((country) => {
      return {
        id: country.cca3,
        name: country.name.common,
        image: country.flags.png,
        continents: country.continents ? country.continents[0] : "undefine",
        capital: country.capital ? country.capital[0] : "undefine",
        subregion: country.subregion,
        area: country.area,
        population: country.population,
      };
    });

    console.log("getCountries", allCountries);
    res.status(200).json(allCountries);
    await Country.bulkCreate(allCountries);
  } catch (error) {
    return { message: error.message };
  }
};

module.exports = getAllCountries;
