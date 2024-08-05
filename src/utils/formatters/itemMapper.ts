import { RecipeItem } from "../interfaces/providers/apiResponse";

export function convertRecipeItem(hits: { recipe: RecipeItem }[]): RecipeItem[] {
  return hits.map((item) => {    
    return {
      ...item.recipe,
      image: item.recipe.images.REGULAR.url,
    };
  });
}
