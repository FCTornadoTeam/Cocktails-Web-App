"use client";
import { Card } from "../Card/Card";
import styles from "./ResultPage.module.scss";
import { CocktailItem } from "@/types/CocktailItem";

type Cocktail = {
  cocktails: CocktailItem[];
};

export const ResultPage: React.FC<Cocktail> = ({ cocktails }) => {
  return (
    <div className={styles.resultPage_container}>
      <h2 className={styles.title}>
        Search results {" "}
        <span className={styles.itemsCount_text}>{cocktails.length} items</span>
      </h2>
      <div className={styles.cards_grid}>
        {cocktails.map((cocktail) => (
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
    </div>
  );
};
