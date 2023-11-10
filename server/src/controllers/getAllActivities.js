const { Activity } = require("../db");

const getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.findAll();

    return res.status(200).json(activities);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
module.exports = getAllActivities;
