interface Nutrient {
    label: string;
    quantity: number;
    unit: string;
  }
  
  interface Digest {
    label: string;
    tag: string;
    schemaOrgTag: string | null;
    total: number;
    hasRDI: boolean;
    daily: number;
    unit: string;
  }
  
  interface Ingredient {
    text: string;
    quantity: number;
    measure: string;
    food: string;
    weight: number;
    foodId: string;
    image?: string;
    foodCategory?: string;
  }
  
  interface Image {
    url: string;
    width: number;
    height: number;
  }
  
  interface Images {
    REGULAR: Image;
    SMALL: Image;
    THUMBNAIL: Image;
  }
  
  interface RecipeItem {
    calories: number;
    cautions: string[];
    co2EmissionsClass: string;
    cuisineType: string[];
    dietLabels: string[];
    digest: Digest[];
    dishType: string[];
    healthLabels: string[];
    image: string;
    images: Images;
    ingredientLines: string[];
    ingredients: Ingredient[];
    label: string;
    mealType: string[];
    shareAs: string;
    source: string;
    totalCO2Emissions: number;
    totalDaily: { [key: string]: Nutrient };
    totalNutrients: { [key: string]: Nutrient };
    totalTime: number;
    totalWeight: number;
    uri: string;
    url: string;
    yield: number;
  }
  
  interface Link {
    href: string;
  }
  
  interface Links {
    next: Link;
  }
  
  interface ApiResponse {
    count: number;
    from: number;
    hits: { recipe: RecipeItem }[];
    to: number;
    _links: Links;
  }

    export type { RecipeItem, ApiResponse };