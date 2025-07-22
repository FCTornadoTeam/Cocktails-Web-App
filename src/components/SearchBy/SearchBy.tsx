"use client";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import styles from "./SearchBy.module.scss";
import { ResultPage } from "../ResultPage/ResultPage";

type Cocktail = {
  idDrink: string;
  [key: string]: unknown;
  strDrink: string;
  strDrinkThumb: string;
  strCategory: string;
  strTags?: string | null;
  strInstructions?: string | null;
  strAlcoholic?: string | null;
  strGlass?: string | null;
  strIngredient1?: string | null;
  strIngredient2?: string | null;
  strIngredient3?: string | null;
  strIngredient4?: string | null;
  strIngredient5?: string | null;
  strIngredient6?: string | null;
  strIngredient7?: string | null;
  strIngredient8?: string | null;
  strIngredient9?: string | null;
  strIngredient10?: string | null;
  strIngredient11?: string | null;
  strIngredient12?: string | null;
  strIngredient13?: string | null;
  strIngredient14?: string | null;
  strIngredient15?: string | null;
  strMeasure1?: string | null;
  strMeasure2?: string | null;
  strMeasure3?: string | null;
  strMeasure4?: string | null;
  strMeasure5?: string | null;
  strMeasure6?: string | null;
  strMeasure7?: string | null;
  strMeasure8?: string | null;
  strMeasure9?: string | null;
  strMeasure10?: string | null;
  strMeasure11?: string | null;
  strMeasure12?: string | null;
  strMeasure13?: string | null;
  strMeasure14?: string | null;
  strMeasure15?: string | null;
  strCreativeCommonsConfirmed?: string | null;
  dateModified?: string | null;
  strImageSource?: string | null;
  strImageAttribution?: string | null;
};

export const SearchBy = () => {
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);

  const [searchType, setSearchType] = useState("ByName");
  const [searchText, setSearchText] = useState("");

  const handleClear = () => {
    setSearchType("ByName");
    setSearchText("");
  };

  const cachedCocktails = useRef<Cocktail[] | null>(null);

  useEffect(() => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    const allCocktails: Cocktail[] = [];

    const fetchAllCocktails = async () => {
      for (const letter of alphabet) {
        try {
          const res = await fetch(
            `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`
          );
          const data = await res.json();
          if (data.drinks) {
            allCocktails.push(...data.drinks);
          }
        } catch (error) {
          console.error(`Data loading error - ${letter}:`, error);
        }
      }

      cachedCocktails.current = allCocktails;
      setCocktails(allCocktails);
    };

    fetchAllCocktails();
  }, []);

  // const filteredCocktails = cocktails.filter();

  if (cocktails.length === 0) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <>
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
      <ResultPage cocktails={cocktails} />
    </>
  );
};
