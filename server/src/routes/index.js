const { Router } = require("express");
const getAllCountries = require("../controllers/getAllCountries");
const getById = require("../controllers/getById");
const getAllActivities = require("../controllers/getAllActivities");
const postActivities = require("../controllers/postActivities");
const deleteAc = require("../controllers/delete");

const router = Router();

router.get("/countries", getAllCountries);
router.get("/countries/:id", getById);
router.get("/activities", getAllActivities);
router.post("/activities", postActivities);
router.delete("/activities/:id", deleteAc);

module.exports = router;
