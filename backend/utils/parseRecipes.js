import fs from "fs";
import pool from "../db.js";

export async function importRecipes() {
  const data = JSON.parse(fs.readFileSync("recipes.json", "utf-8"));

  for (const recipe of data) {
    const rating = isNaN(recipe.rating) ? null : recipe.rating;
    const prep = isNaN(recipe.prep_time) ? null : recipe.prep_time;
    const cook = isNaN(recipe.cook_time) ? null : recipe.cook_time;
    const total = isNaN(recipe.total_time) ? null : recipe.total_time;

    await pool.query(
      `INSERT INTO recipes (cuisine, title, rating, prep_time, cook_time, total_time, description, nutrients, serves) 
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
      [
        recipe.cuisine,
        recipe.title,
        rating,
        prep,
        cook,
        total,
        recipe.description,
        recipe.nutrients,
        recipe.serves,
      ]
    );
  }
  console.log("Recipes imported successfully!");
}
