const { Activity, Country } = require("../db");

const getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.findAll({
      include: [
        {
          model: Country,
          attributes: ["name"],
          through: { attributes: [] },
        },
      ],
    });

    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = getAllActivities;
