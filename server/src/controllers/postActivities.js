const { Activity } = require("../db");

const postActivities = async (req, res) => {
  try {
    const { name, difficulty, duration, season, countries } = req.body;

    if (!name || !difficulty || !duration || !season || !countries) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const [activity, created] = await Activity.findOrCreate({
      where: {
        name,
        difficulty,
        duration,
        season,
      },
    });

    // Si ya existe una actividad con el mismo nombre, verifica la asociación con los países
    if (!created) {
      const hasCountries = await activity.hasCountries(countries);
      if (hasCountries) {
        res.status(409).json({
          error: "Activity with the same name and countries already exists",
        });
      }
    }
    // Si no existe la actividad o si existe pero no tiene la misma asociación de países, actualiza la asociación
    await activity.setCountries(countries);

    return res.status(201).json(activity);
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({ message: error.message });
    }
  }
};
module.exports = postActivities;
