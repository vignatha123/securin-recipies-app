import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import recipeRoutes from "./routes/recipeRoutes.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/recipes", recipeRoutes);

app.listen(5000, () => console.log("Backend running on port 5000"));
