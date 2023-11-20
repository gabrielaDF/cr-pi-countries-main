import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { countryById } from "../../redux/action";
import styles from "./Detail.module.css";
import loading from "./logoapp1-01.png";
import { Link } from "react-router-dom";

import logo from "./logoHome.png";

function Detail() {
  const { detail } = useSelector((state) => state);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(countryById(id));
  }, [dispatch, id]);
  console.log("Detail:", detail);
  console.log("Activities:", detail.Activities);
  return (
    <div>
      <header className={styles.header}>
        <Link to="/countries">
          <img className={styles.logo} src={logo} alt="logo" />
        </Link>

        <h2>DESCRIPTION OF THE COUNTRIES</h2>
      </header>
      {detail.name ? (
        <div className={styles.container}>
          <section className={styles.contenedor}>
            <img src={detail.image} className={styles.imagen} alt="flags" />
            <div className={styles.detalles}>
              <h1>{detail.name}</h1>
              <p>ID: {detail.id}</p>
              <p>CAPITAL: {detail.capital}</p>
              <p>POPULATION: {detail.population}</p>
              <p>AREA: {detail.area}</p>
              <p>SUB-REGION: {detail.subregion}</p>
            </div>
            <div className={styles.activity}>
              {detail.Activities?.map((actividad) => {
                return (
                  <article key={actividad.id}>
                    <div className={styles.boxActivity}>
                      <h3>Activity</h3>
                      <p>Name: {actividad.name}</p>
                      <p>Difficulty: {actividad.difficulty}</p>
                      <p>Season: {actividad.season}</p>
                      <p>Duration: {actividad.duration}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </div>
      ) : (
        <div className={styles.loading}>
          <img src={loading} className={styles.imagenLoading} />
        </div>
      )}
    </div>
  );
}

export default Detail;
