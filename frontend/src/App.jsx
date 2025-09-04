import { useEffect, useState } from "react";
import { fetchRecipes, searchRecipes } from "./api";
import RecipeTable from "./components/RecipeTable";
import RecipeDrawer from "./components/RecipeDrawer";

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchRecipes(1, 15).then((res) => setRecipes(res.data.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🍲 Recipes</h1>
      <RecipeTable recipes={recipes} onSelect={setSelected} />
      {selected && (
        <RecipeDrawer recipe={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
