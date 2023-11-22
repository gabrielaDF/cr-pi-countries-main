import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { allCountries, createActivity } from "../../redux/action";
import styles from "./FormPage.module.css";
import { Link } from "react-router-dom";

import logo from "./logoHome.png";
import * as validations from "./Validations";

function FormPage() {
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [mostrarError, setMostrarError] = useState(false);
  const [state, setState] = useState({
    name: "",
    difficulty: 0,
    duration: "",
    season: "",
    countries: [],
  });

  const { countries } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navegate = useNavigate();
  useEffect(() => {
    dispatch(allCountries());
  }, [dispatch]);

  function handleSelect(e) {
    if (state.countries.includes(e.target.value)) {
      alert("You can not repeat the same country");
    } else {
      setState({
        ...state,
        countries: [...state.countries, e.target.value],
      });
    }
  }
  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: validations.validateField(e.target.name, e.target.value),
    });
  }

  function handleChoose(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: validations.validateField(e.target.name, e.target.value),
    });
  }
  function handleRemove(e) {
    setState({
      ...state,
      countries: state.countries.filter(
        (country) => country !== e.target.value
      ),
    });
  }
  async function handleSumit(e) {
    e.preventDefault();
    const durationAsFloat = parseFloat(state.duration);
    const nameError = validations.validateName(state.name);
    const difficultyError = validations.validateDifficulty(state.difficulty);
    const seasonError = validations.validateSeason(state.season);
    const countriesError = validations.validateCountries(state.countries);
    const allFieldsFilledError = validations.validateAllFieldsFilled(state);

    if (allFieldsFilledError) {
      setError(allFieldsFilledError);
      setMostrarError(true);
      return;
    }

    if (nameError || difficultyError || seasonError || countriesError) {
      setError(nameError || difficultyError || seasonError || countriesError);
      setMostrarError(true);
      return;
    }

    try {
      
      await Promise.all(
        state.countries.map(async (countryId) => {
          const activityData = {
            ...state,
            countries: countryId.toString(),
            duration: durationAsFloat,
          };

          const response = await dispatch(createActivity(activityData));

          if (response && response.message) {
            alert(response.message);
          } else {
            alert("Your activity was successfully created");
          }
        })
      );

      setState({
        name: "",
        difficulty: 0,
        duration: "",
        season: "",
        countries: [],
      });

      navegate("/countries");
    } catch (error) {
      alert(
        "Error creating activity. Check if the activity is already created"
      );
    }
  }

  {
    mostrarError && <div className={styles.error}>{error}</div>;
  }

  return (
    <>
      <header className={styles.header}>
        <Link to="/countries">
          <img className={styles.logo} src={logo} alt="logo" />
        </Link>
        <div>
          <h2>CREATE ACTIVITY</h2>
        </div>
      </header>
      <section className={styles.contenedorFormulario}>
        <div className={styles.formulario}>
          <form onSubmit={handleSumit}>
            {mostrarError && <p className={styles.error}>{error}</p>}
            <>
              <label className={styles.label} htmlFor="nombre">
                Name
              </label>
              <input
                className={styles.name}
                placeholder="Activity Name"
                type="text"
                id="name"
                name="name"
                value={state.name}
                onChange={handleChange}
              />
              {errors.name && <p className={styles.error}>{errors.name}</p>}
            </>

            <>
              <label className={styles.label} htmlFor="nombre">
                Duration
              </label>
              <input
                className={styles.duration}
                name="duration"
                value={state.duration}
                type="time"
                min="01:00"
                max="12:00"
                onChange={handleChange}
                required
              />
              {errors.duration && (
                <p className={styles.error}>{errors.duration}</p>
              )}
            </>
            <label className={styles.label}>Difficulty</label>
            <div className={styles.contenedor}>
              <label className={styles.label}>1</label>
              <input
                className={styles.input}
                type="radio"
                id="1"
                value="1"
                name="difficulty"
                onChange={handleChoose}
              />
              <label className={styles.label}>2</label>
              <input
                className={styles.input}
                type="radio"
                id="2"
                value="2"
                name="difficulty"
                onChange={handleChoose}
              />
              <label className={styles.label}>3</label>
              <input
                className={styles.input}
                type="radio"
                id="3"
                value="3"
                name="difficulty"
                onChange={handleChoose}
              />
              <label className={styles.label}>4</label>
              <input
                className={styles.input}
                type="radio"
                id="4"
                value="4"
                name="difficulty"
                onChange={handleChoose}
              />
              <label className={styles.label}>5</label>
              <input
                className={styles.input}
                type="radio"
                id="5"
                value="5"
                name="difficulty"
                onChange={handleChoose}
              />
              {errors.difficulty && (
                <p className={styles.error}>{errors.difficulty}</p>
              )}
            </div>
            <label className={styles.label}>Season</label>
            <div className={styles.contenedor}>
              <label className={styles.label}>Summer </label>
              <input
                className={styles.input}
                type="radio"
                id="Summer"
                value="Summer"
                name="season"
                onChange={handleChoose}
              />
              <label className={styles.label}>Autumn </label>
              <input
                className={styles.input}
                type="radio"
                id="Autumn"
                value="Autumn"
                name="season"
                onChange={handleChoose}
              />
              <label className={styles.label}>Winter </label>
              <input
                className={styles.input}
                type="radio"
                id="Winter"
                value="Winter"
                name="season"
                onChange={handleChoose}
              />
              <label className={styles.label}>Spring</label>
              <input
                className={styles.input}
                type="radio"
                id="Spring"
                value="Spring"
                name="season"
                onChange={handleChoose}
              />
              {errors.season && <p className={styles.error}>{errors.season}</p>}
            </div>
            <label className={styles.label}>Country</label>
            <select
              className={styles.country}
              placeholder="Selecciona el o los paises"
              name="countries"
              onChange={(e) => handleSelect(e)}
              required
            >
              <option className={styles.label}>Choose the countries</option>
              {countries?.map((element) => {
                return (
                  <option value={element.id} key={element.id}>
                    {element.name}
                  </option>
                );
              })}
              {errors.countries && (
                <p className={styles.error}>{errors.countries}</p>
              )}
            </select>
            <button className={styles.button} type="submit">
              CREATE
            </button>
            <div className={styles.contenedorC}>
              {state.countries?.map((country, index) => {
                return (
                  <div key={index}>
                    <div className={styles.contenedorCountry}>
                      <button
                        className={styles.buttonClose}
                        value={country}
                        type="button"
                        onClick={handleRemove}
                      >
                        X
                      </button>
                      <p className={styles.parrafo}>
                        {countries.find((c) => c.id === country).name}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default FormPage;
