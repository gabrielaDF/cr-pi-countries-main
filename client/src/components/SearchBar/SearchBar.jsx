import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { countryByName } from "../../redux/action";
import style from "./SearchBar.module.css";
import useWindowDimensions from "../Hook/useWindowsDimensions";
import Lupa from "./lupa.png";

function SearchBar({ setInput, setPag }) {
  const { width } = useWindowDimensions();
  const movil = 460;
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  function handleChange(event) {
    setName(event.target.value);
  }
  function handleSumit(event) {
    event.preventDefault();
    dispatch(countryByName(name));
    setName("");
    setInput(1);
    setPag(1);
  }
  if (width > movil) {
    return (
      <div className={style.contenedor}>
        <input
          className={style.input}
          type="search"
          name="search"
          value={name}
          onChange={handleChange}
          placeholder="Search country"
        />
        <button className={style.button} onClick={handleSumit}></button>
      </div>
    );
  } else {
    return (
      <div className={style.contenedor_movil}>
        <input
          className={style.input_movil}
          type="search"
          name="search"
          value={name}
          onChange={handleChange}
          placeholder="Search Country"
        />
        <button className={style.button_movil} onClick={handleSumit}>
          <img
            src={Lupa}
            className={style.button_movil_img}
            alt="img_button_search"
          />
        </button>
      </div>
    );
  }
}
export default SearchBar;
