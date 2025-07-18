"use client";
import { useEffect, useState } from "react";
import { Card } from "../Card/Card";
import styles from "./ResultPage.module.scss";

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

export const ResultPage = () => {
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);

  useEffect(() => {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a")
      .then((res) => res.json())
      .then((data) => setCocktails(data.drinks || []));
  }, []);
  return (
    <div className={styles.resultPage_container}>
      <h2 className={styles.title}>
        Search results{" "}
        <span className={styles.itemsCount_text}>{cocktails.length} items</span>
      </h2>
      <div className={styles.cards_grid}>
        {cocktails.map((cocktail) => (
          <Card
            key={cocktail.idDrink}
            title={cocktail.strDrink}
            image={cocktail.strDrinkThumb}
            category={cocktail.strCategory}
            tags={cocktail.strTags}
          />
        ))}
      </div>
    </div>
  );
};
