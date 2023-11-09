const axios = require("axios");
const server = require("./src/server");
const { conn } = require("./src/db.js");
const getAllCountries = require("./src/controllers/getAllCountries.js");
const PORT = 3001;

conn
  .sync({ force: true })
  .then(() => {
    server.listen(PORT, () => {
      getAllCountries();
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => console.error(error));
