"use client";
import { useEffect, useState } from "react";
import { Card } from "../Card/Card";
import styles from "./ResultPage.module.scss";
import { CocktailItem } from "@/types/CocktailItem";

type Cocktail = {
  cocktails: CocktailItem[];
};

export const ResultPage: React.FC<Cocktail> = ({ cocktails }) => {
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    setVisibleCount(6);
  }, [cocktails]);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const visibleCocktails = cocktails.slice(0, visibleCount);

  return (
    <div className={styles.resultPage_container}>
      <h2 className={styles.title}>
        Search results{" "}
        <span className={styles.itemsCount_text}>
          {visibleCocktails.length} items
        </span>
      </h2>
      <div className={styles.cards_grid}>
        {visibleCocktails.map((cocktail) => (
          <Card
            id={cocktail.idDrink}
            key={cocktail.idDrink}
            title={cocktail.strDrink}
            image={cocktail.strDrinkThumb}
            category={cocktail.strCategory}
            tags={cocktail.strTags}
          />
        ))}
      </div>

      {visibleCocktails.length < cocktails.length && (
        <div className={styles.showMore_container}>
          <button className={styles.showMore_button} onClick={handleShowMore}>
            <span className={styles.showMore_button_text}>Show more</span>
          </button>
        </div>
      )}
    </div>
  );
};
