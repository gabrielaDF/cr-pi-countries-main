const axios = require("axios");
const URL = "http://localhost:5000/countries";

const getAllCountries = async (req, res) => {
  try {
    const { data } = await axios(URL);

    if (data.length) {
      const allCountries = await Promise.all(
        data.map(async (country) => ({
          where: {
            id: country.cca3,
            name: country.name.common,
            image: country.flags.png,
            continents: country.continents ? country.continents[0] : "unknow",
            capital: country.capital ? country.capital[0] : "unknow",
            subregion: country.subregion,
            area: country.area,
            population: country.population,
          },
        }))
      );

      res.status(200).json(allCountries);
    }
  } catch (error) {
    return { message: error.message };
  }
};
module.exports = getAllCountries;
