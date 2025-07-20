"use client";

import { useEffect, useState } from "react";

interface Props {
  id: string;
}

interface Cocktail {
  idDrink: string;
  strDrink: string;
  // ... другие поля, если нужно
}

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

  return (
    <div>
      <h1>{cocktail.strDrink}</h1>
    </div>
  );
}
