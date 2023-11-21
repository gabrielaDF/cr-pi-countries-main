const axios = require("axios");
const URL = "http://localhost:5000/countries";
const { Country, Activity } = require("../db");
const { Op } = require("sequelize");

const getAllCountries = async (req, res) => {
  try {
    const { data } = await axios(URL);

    const allCountries = await data.map((country) => {
      return {
        id: country.cca3,
        name: country.name.common,
        image: country.flags.svg,
        continents: country.continents ? country.continents[0] : "undefine",
        capital: country.capital ? country.capital[0] : "undefine",
        subregion: country.subregion,
        area: country.area,
        population: country.population,
      };
    });

    await Country.bulkCreate(allCountries, {
      updateOnDuplicate: [
        "name",
        "image",
        "continents",
        "capital",
        "subregion",
        "area",
        "population",
      ],
    });
    const name = req.query.name;
    if (!name) {
      res.status(200).json(allCountries);
    } else {
      let countries = await Country.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
        include: [
          {
            model: Activity,
            attributes: ["name", "difficulty", "duration", "season"],
            through: {
              attributes: [],
            },
          },
        ],
      });
      if (countries.length === 0) {
        return res.status(404).json({ message: "No countries found" });
      }
      res.status(200).json(countries);
    }
  } catch (error) {
    return { message: error.message };
  }
};

module.exports = getAllCountries;
