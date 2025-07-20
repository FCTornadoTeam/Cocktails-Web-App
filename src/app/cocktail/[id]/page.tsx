import CocktailDetailsClient from "../../../components/CocktailDetailsClient/CocktailDetailsClient";

interface Cocktail {
  idDrink: string;
}

interface CocktailApiResponse {
  drinks: Cocktail[] | null;
}

export async function generateStaticParams(): Promise<{ id: string }[]> {
  const res = await fetch(
    "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a"
  );
  const data: CocktailApiResponse = await res.json();

  return (data.drinks || []).map((drink: Cocktail) => ({
    id: drink.idDrink,
  }));
}

export default function Page({ params }: { params: { id: string } }) {
  return <CocktailDetailsClient id={params.id} />;
}
