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

  const [pag, setPag] = useState(1);
  const { width } = useWindowDimensions();
  const movil = 460;
  const [countriesPag] = useState(width > movil ? 10 : 3);
  let [input, setInput] = useState(1);
  let datos = countries === "The country was not found" ? "0" : countries;
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(allCountries());
        await dispatch(clear());
        await dispatch(allActivity());
        setDataLoaded(true);
      } catch (error) {
        throw Error(error.message);
      }
    };
    fetchData();
  }, [dispatch]);

  const max = dataLoaded
    ? Math.ceil(
        datos?.length
          ? datos.length / countriesPag
          : datos.length / countriesPag
      )
    : 0;

  const allActivityData = useSelector((state) => state.allActivity) || [];
  let filterActivities = allActivityData || [];

  let allActivities = [];
  if (Array.isArray(filterActivities)) {
    allActivities = filterActivities.flatMap((c) => c.name || []);
  }

  let uniqueActivitiesSet = new Set(allActivities);

  let uniqueActivities = Array.from(uniqueActivitiesSet);

  let arrayActivity1 = uniqueActivities.filter(
    (activity) => activity !== undefined
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
  const handleResetFilters = () => {
    dispatch(orderAlphabets("Disorderly"));
    dispatch(orderPopulation("Disorderly"));
    dispatch(filterContinent("todos"));
    dispatch(filterActivity("Unfiltered"));

    setPag(1);
    setInput(1);
  };

  return (
    <div className={style.imagen}>
      <Nav setInput={setInput} setPag={setPag} />
      <nav className={style.options}>
        <select
          className={style.orden}
          name="orderName"
          id="orderName"
          onChange={handleSelectAlphabets}
        >
          <option value="Disorderly"> Order Alphabets</option>
          <option value="asc">Ascendent</option>
          <option value="des">Descendent</option>
        </select>
        <select
          className={style.population}
          name="orderPopulation"
          id="orderPopulation"
          onChange={handleSelectPopulation}
        >
          <option value="Disorderly">Order Population</option>
          <option value="asc">Ascendent</option>
          <option value="des">Descendent</option>
        </select>
        <select
          className={style.continent}
          name="filterContinent"
          id="filterContinent"
          onChange={handleSelectContinent}
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
          onChange={handleSelectActivity}
        >
          <option value="Unfiltered"> Activity</option>
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
        <a href="#" onClick={handleResetFilters} className={style.resetLink}>
          Reset Filters
        </a>
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
                    flags={country.image}
                    name={country.name}
                    continents={country.continents}
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
