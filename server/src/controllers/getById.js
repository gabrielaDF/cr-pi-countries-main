const { Country, Activity } = require("../db");

const getById = async (req, res) => {
  try {
    const id = req.params.id;

    const country = await Country.findOne({
      where: { id: id },
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

    if (!country) {
      res.status(404).json({ message: "Countries not found" });
    }
    res.status(200).json(country);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = getById;
