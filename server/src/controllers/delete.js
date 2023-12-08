const { Activity } = require("../db");

const deleteAc = async (req, res) => {
  try {
    const id = req.params.id;
    const activity = await Activity.findByPK(id);
    await activity.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).json({ message: "la actividad a sido eliminada" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = deleteAc;
