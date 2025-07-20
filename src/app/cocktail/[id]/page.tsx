import CocktailDetailsClient from "../../../components/CocktailDetailsClient/CocktailDetailsClient";

interface Cocktail {
  idDrink: string;
}

interface CocktailApiResponse {
  drinks: Cocktail[] | null;
}

export async function generateStaticParams() {
  const res = await fetch(
    "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a"
  );
  const data: CocktailApiResponse = await res.json();

  return (data.drinks || []).map((drink: Cocktail) => ({
    id: drink.idDrink,
  }));
}

interface CocktailPageProps {
  params: {
    id: string;
  };
}

export default function CocktailPage({ params }: CocktailPageProps) {
  return <CocktailDetailsClient id={params.id} />;
}
