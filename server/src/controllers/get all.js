const infoCountries = async () => {
  // console.log('Se solicita Info a restcountries')
  const CountriesApi = await axios.get("https://restcountries.com/v3/all");
  const arrCountriesDB = await CountriesApi.data.map((c) => {
    let country = {
      id: c.cca3,
      name: c.name.common, // en ingles, c.translations.spa.common nombres en español,
      flag: c.flags[1],
      continent: c.continents[0],
      capital: !c.capital ? "" : c.capital.join(),
      subregion: c.subregion,
      area: c.area,
      population: c.population,
      googleMaps: c.maps.googleMaps,
      languages,
      currency,
      currency_name,
      currency_symbol,
    };
    return country;
  });
  // console.log('Fin de info rescountries');
  // console.log('Ejemplo: ', arrCountriesDB[57]);
  return arrCountriesDB;
};

// Chequeo si esta completa la DB y sino la comleto:
const dbComplete = async () => {
  //consulta a la DB
  // console.log('Inicia consulta a DB')
  let countries = await Country.findAll();
  // console.log('Fin consulta a DB')

  //si la DB esta vacia cargo los datos
  if (countries.length === 0) {
    // solicitud a restcountries
    const arrCountries = await infoCountries();
    // console.log(' en /countries InfoCountries ejemplo 1: ', arrCountries[0])

    // Creating in bulk, creo los datos en masa.
    //https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#creating-in-bulk
    // console.log(' Inicia carga de DB con bulkCreate')
    await Country.bulkCreate(arrCountries);
    // console.log('Fin carga de DB con bulkCreate')
  }
};
// const dbComplete = async () => {
//   let countries = await Country.findAll();
//   if (countries.length === 0) {
//     const countriesAll = await infoCountries();
//     await Country.bulkCreate(countriesAll);
//   }
// };
