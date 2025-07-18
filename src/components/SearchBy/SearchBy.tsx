"use client";
import React from "react";
import { useState } from "react";
import styles from "./SearchBy.module.scss";

export const SearchBy = () => {
  const [searchType, setSearchType] = useState("ByName");
  const [searchText, setSearchText] = useState("");
  //   const [disabled, setDisabled] = useState(false);

  const handleClear = () => {
    setSearchType("ByName");
    setSearchText("");
  };

  return (
    <div className={styles.searchBy_container}>
      <h2 className={styles.title}>Search by</h2>
      <br />
      <label>
        <input
          type="radio"
          name="searchType"
          value="ByName"
          checked={searchType === "ByName"}
          className={styles.types}
          onChange={() => setSearchType("ByName")}
        />
        Title
      </label>
      <br />
      <input
        type="text"
        name="text"
        placeholder="Title"
        className={styles.text_input}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <br />
      <br />
      <label>
        <input
          type="radio"
          name="searchType"
          value="ByCategory"
          checked={searchType === "ByCategory"}
          className={styles.types}
          onChange={() => setSearchType("ByCategory")}
        />
        Category
      </label>
      <br />
      <select name="category" className={styles.select}>
        <option value="Alcohol">Alcohol</option>
        <option value="Coctail">Coctail</option>
        <option value="ColdDrink">Cold Drink</option>
      </select>
      <br />
      <br />
      <label>
        <input
          type="radio"
          name="searchType"
          value="ByIngredient"
          checked={searchType === "ByIngredient"}
          className={styles.types}
          onChange={() => setSearchType("ByIngredient")}
        />
        Ingredient
      </label>
      <br />
      <select name="ingredient" className={styles.select}>
        <option value="Lemon">Lemon</option>
        <option value="Lime">Lime</option>
        <option value="Watermelon">Watermelon</option>
      </select>
      <br />
      <br />
      <div className={styles.buttons_container}>
        <button className={styles.button_clear} onClick={handleClear}>
          Clear
        </button>
        <button className={styles.button_submit}>Submit</button>
      </div>
    </div>
  );
};
