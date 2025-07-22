import CocktailDetailsClient from "../../../components/CocktailDetailsClient/CocktailDetailsClient";

interface Cocktail {
  idDrink: string;
}

interface CocktailApiResponse {
  drinks: Cocktail[] | null;
}

export async function generateStaticParams(): Promise<{ id: string }[]> {
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  const allDrinks: Cocktail[] = [];

  for (const letter of alphabet) {
    try {
      const res = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`
      );

      const data: CocktailApiResponse = await res.json();

      if (data.drinks) {
        allDrinks.push(...data.drinks);
      }
    } catch (error) {
      console.error(`Data loading error ${letter}:`, error);
    }
  }

  return allDrinks.map((drink) => ({
    id: drink.idDrink,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <CocktailDetailsClient id={id} />;
}
