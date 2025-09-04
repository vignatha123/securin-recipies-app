# securin-recipies-app
# Securin Assessment - Recipes App

## 🚀 Setup

### Backend
```bash
cd backend
npm install
psql -U postgres -d securin -f sql/schema.sql
node utils/parseRecipes.js   # import recipes.json into DB
npm run dev
