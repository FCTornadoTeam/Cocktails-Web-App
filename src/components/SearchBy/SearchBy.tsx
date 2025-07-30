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
  const [isLoading, setIsLoading] = useState(true);

  const [searchType, setSearchType] = useState("ByName");
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedIngredient, setSelectedIngredient] = useState("");

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
      setIsLoading(false);
    };

    fetchAllCocktails();
  }, []);

  const getUniqueCategories = (data: Cocktail[]) => {
    const categories = data.map((drink) => drink.strCategory).filter(Boolean);
    return Array.from(new Set(categories));
  };

  const getUniqueIngredients = (data: Cocktail[]) => {
    const ingredients: string[] = [];
    data.forEach((drink) => {
      for (let i = 1; i <= 15; i++) {
        const key = `strIngredient${i}`;
        const ingredient = drink[key as keyof Cocktail];
        if (ingredient) ingredients.push(ingredient as string);
      }
    });
    return Array.from(new Set(ingredients));
  };

  const categories = getUniqueCategories(cocktails);
  const ingredients = getUniqueIngredients(cocktails);

  const handleSubmit = () => {
    if (!cachedCocktails.current) return;

    let filtered = cachedCocktails.current;

    if (searchType === "ByName" && searchText) {
      filtered = filtered.filter((drink) =>
        drink.strDrink.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (searchType === "ByCategory" && selectedCategory) {
      filtered = filtered.filter(
        (drink) => drink.strCategory === selectedCategory
      );
    }

    if (searchType === "ByIngredient" && selectedIngredient) {
      filtered = filtered.filter((drink) =>
        Object.keys(drink).some(
          (key) =>
            key.startsWith("strIngredient") &&
            drink[key as keyof Cocktail]?.toString().toLowerCase() ===
              selectedIngredient.toLowerCase()
        )
      );
    }

    if (filtered.length === 0) {
      setCocktails(filtered);
      return;
    }

    setCocktails(filtered);
  };

  const handleClear = () => {
    setSearchType("ByName");
    setSearchText("");
    setSelectedCategory("");
    setSelectedIngredient("");
    setCocktails(cachedCocktails.current || []);
  };

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
        {searchType === "ByCategory" && (
          <select
            name="category"
            className={styles.select}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="" disabled>
              Select category
            </option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        )}
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
        {searchType === "ByIngredient" && (
          <select
            name="ingredient"
            className={styles.select}
            value={selectedIngredient}
            onChange={(e) => setSelectedIngredient(e.target.value)}
          >
            <option value="" disabled>
              Select ingredient
            </option>
            {ingredients.map((ing) => (
              <option key={ing} value={ing}>
                {ing}
              </option>
            ))}
          </select>
        )}

        <br />
        <br />

        <div className={styles.buttons_container}>
          <button className={styles.button_clear} onClick={handleClear}>
            Clear
          </button>
          <button className={styles.button_submit} onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
      {isLoading ? (
        <div className={styles.loading}>Loading...</div>
      ) : cocktails.length === 0 ? (
        <div className={styles.not_found}>No cocktails found.</div>
      ) : (
        <ResultPage cocktails={cocktails} />
      )}
    </>
  );
};
