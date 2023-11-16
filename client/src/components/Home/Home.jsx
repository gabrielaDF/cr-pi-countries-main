import React, { useEffect, useState } from "react";
import Nav from "../Nav/Nav";
import Card from "../Card/Card";
import loading from "./logoapp1-01.png";
import { useDispatch, useSelector } from "react-redux";
import {
  allCountries,
  clear,
  orderAlphabets,
  orderPopulation,
  filterContinent,
  filterActivity,
  allActivity,
} from "../../redux/action";
import style from "./Home.module.css";
import Paginacion from "../Paginacion/Paginacion";
import useWindowDimensions from "../Hook/useWindowsDimensions";

function Home() {
  const { countries } = useSelector((state) => state);

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(allCountries());
        await dispatch(clear());
        await dispatch(allActivity());
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [dispatch]);

  const allActivityData = useSelector((state) => state.allActivity) || [];
  let filterActivities = allActivityData || [];
  console.log(allActivityData);
  // Obtén un array plano de todas las actividades
  let allActivities = filterActivities.flatMap((c) => c.name || []);

  // Filtra actividades duplicadas basándote en la propiedad 'name'
  let uniqueActivitiesSet = new Set(allActivities);

  // Convierte el conjunto a un array
  let uniqueActivities = Array.from(uniqueActivitiesSet);

  // Filtra valores indefinidos
  let arrayActivity1 = uniqueActivities.filter(
    (activity) => activity !== undefined
  );
  console.log("arrayActivity1:", arrayActivity1);

  const [pag, setPag] = useState(1);
  const { width } = useWindowDimensions();
  const movil = 460;
  const [countriesPag] = useState(width > movil ? 10 : 3);
  let [input, setInput] = useState(1);
  let datos = countries === "The country was not found" ? "0" : countries;
  const max = Math.ceil(
    datos?.length ? datos.length / countriesPag : datos.length / countriesPag
  );

  function handleSelectAlphabets(event) {
    event.preventDefault();
    dispatch(orderAlphabets(event.target.value));
    setInput((input = 1));
    setPag(1);
  }
  function handleSelectPopulation(event) {
    event.preventDefault();
    dispatch(orderPopulation(event.target.value));
    setInput((input = 1));
    setPag(1);
  }
  function handleSelectContinent(event) {
    dispatch(filterContinent(event.target.value));
    setInput((input = 1));
    setPag(1);
  }
  function handleSelectActivity(event) {
    dispatch(filterActivity(event.target.value));
    setInput((input = 1));
    setPag(1);
  }
  return (
    <div className={style.imagen}>
      <Nav setInput={setInput} setPag={setPag} />
      <nav className={style.options}>
        <select
          className={style.orden}
          name="orderName"
          id="orderName"
          onChange={(event) => handleSelectAlphabets(event)}
        >
          <option> Order Alphabets</option>
          <option value="asc">Ascendent</option>
          <option value="des">Descendent</option>
        </select>
        <select
          className={style.population}
          name="orderPopulation"
          id="orderPopulation"
          onChange={(event) => handleSelectPopulation(event)}
        >
          <option>Order Population</option>
          <option value="asc">Ascendent</option>
          <option value="des">Descendent</option>
        </select>
        <select
          className={style.continent}
          name="filterContinent"
          id="filterContinent"
          onChange={(event) => handleSelectContinent(event)}
        >
          <option value="todos">All Continents</option>
          <option value="Africa">Africa</option>
          <option value="South America">South America</option>
          <option value="Antarctica">Antarctica</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="North America">North America</option>
          <option value="Oceania">Oceania</option>
        </select>
        <select
          className={style.activity}
          name="filterActivity"
          id="filterActivity"
          onChange={(event) => handleSelectActivity(event)}
        >
          <option> Activity</option>
          <option value="Unfiltered">Unfiltered</option>
          <option value="AllActivities">All Activities</option>
          {arrayActivity1?.map((item) => {
            return (
              <option value={item} key={Math.random()}>
                {item}
              </option>
            );
          })}
        </select>
      </nav>
      <Paginacion
        pag={pag}
        setPag={setPag}
        max={max}
        input={input}
        setInput={setInput}
      />
      <div className={style.cardContent}>
        {!countries.length ? (
          <div className={style.loading}>
            <img
              src={loading}
              alt="Loading..."
              className={style.imagenLoading}
            />
          </div>
        ) : countries === "The country was not found" ? (
          <h2 className={style.search}>
            Ups we did not find the country!
            <br />
            Please try again
          </h2>
        ) : (
          countries
            .slice(
              (pag - 1) * countriesPag,
              (pag - 1) * countriesPag + countriesPag
            )
            .map((country) => {
              return (
                <div key={country.id}>
                  <Card
                    flags={country.flags}
                    name={country.name}
                    continents={country.continents}
                    // key={country.id}
                    id={country.id}
                    activities={country.activities}
                  />
                </div>
              );
            })
        )}
      </div>
    </div>
  );
}
export default Home;
