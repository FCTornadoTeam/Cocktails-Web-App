"use client";
import Image from "next/image";

import styles from "./CocktailDetailsClient.module.scss";
import pencil from "../../public/icons/pencil.svg";
import deleteIcon from "../../public/icons/delete.svg";
import rating from "../../public/icons/rating.svg";
import timer from "../../public/icons/Icon-Timer.svg";

import { useEffect, useState } from "react";
import { Header } from "../Header/Header";

interface Props {
  id: string;
}

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

interface CocktailApiResponse {
  drinks: Cocktail[] | null;
}

export default function CocktailDetailsClient({ id }: Props) {
  const [cocktail, setCocktail] = useState<Cocktail | null>(null);

  useEffect(() => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => res.json())
      .then((data: CocktailApiResponse) =>
        setCocktail(data.drinks ? data.drinks[0] : null)
      );
  }, [id]);

  if (!cocktail) return <div>Loading...</div>;

  const cocktailData = cocktail as Record<string, string | null>;

  return (
    <>
      <Header />
      <div className={styles.cocktail_details_container}>
        <div className={styles.cocktail_details_header}>
          <h1>{cocktail.strDrink}</h1>
          <div className={styles.cocktail_details_actions}>
            <button>
              <Image src={pencil} alt="Edit" width={24} height={24} />
            </button>
            <button>
              <Image src={deleteIcon} alt="Delete" width={24} height={24} />
            </button>
          </div>
        </div>
        <Image
          src={cocktail.strDrinkThumb}
          alt={cocktail.strDrink}
          width={1220}
          height={486}
          className={styles.cocktail_image}
          style={{
            objectFit: "contain",
          }}
          priority
        />
        <div className={styles.cocktail_details_body}>
          <div className={styles.cocktail_tags}>
            {typeof cocktail.strTags === "string" && cocktail.strTags
              ? cocktail.strTags.split(",").map((tag, index) => (
                  <div key={index} className={styles.tag}>
                    {tag.trim()}
                  </div>
                ))
              : null}
          </div>
          <div className={styles.cocktail_rating}>
            <Image src={rating} width={150} height={24} alt="rating" />
            <span>4/5</span>
          </div>
        </div>
        <div className={styles.cocktail_timer}>
          <h3>{cocktail.strCategory}</h3>
          <div className={styles.cocktail_timer_details}>
            <Image src={timer} alt="timer" width={24} height={24} />
            <span>3h</span>
          </div>
        </div>
        <div>
          <h3>Ingredients:</h3>
          <ul>
            {Object.keys(cocktail)
              .filter((key) => key.startsWith("strIngredient") && cocktail[key])
              .map((key, index) => (
                <li key={index}>
                  {cocktailData[key]}{" "}
                  {cocktailData[`strMeasure${index + 1}`]
                    ? `- ${cocktailData[`strMeasure${index + 1}`]}`
                    : ""}
                </li>
              ))}
          </ul>
        </div>
        <div className={styles.border}></div>
        <p>{cocktail.strInstructions}</p>
      </div>
    </>
  );
}
