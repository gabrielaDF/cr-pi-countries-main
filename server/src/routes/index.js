const { Router } = require("express");
const getAllCountries = require("../controllers/getAllCountries");
const getById = require("../controllers/getById");
// const getByName = require("../controllers/getByName");
// const getAllActivities = require("../controllers/getAllActivities");
// const postActivities = require("../controllers/postActivities");

const router = Router();
router.get("/", getAllCountries);
router.get("/:id", getById);
// router.get("/countries/name:", getByName);
// router.get("/activities", getAllActivities);
// router.post("/activities", postActivities);

module.exports = router;
