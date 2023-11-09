const { Country, Activity } = require("../db");

const getByID = async (req, res) => {
  try {
    const id = req.params.id;

    const country = await Country.findOne({
      where: { id: id },
      include: [
        {
          model: Activity,
          as: "Activities",
        },
      ],
    });

    if (!country) {
      return res.status(404).json({ message: "Countries not found" });
    }
    res.status(200).json(country);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = getByID;
