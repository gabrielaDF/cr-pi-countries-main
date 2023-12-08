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

    if (!created) {
      const hasCountries = await activity.hasCountries(countries);
      if (hasCountries) {
        res.status(409).json({
          error:
            "  server Activity with the same name and countries already exists",
        });
      }
    }

    await activity.setCountries(countries);

    return res.status(201).json(activity);
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({ message: error.message });
    }
  }
};
module.exports = postActivities;
