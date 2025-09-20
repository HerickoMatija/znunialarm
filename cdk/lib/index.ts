export interface Meal {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  instructions: string[];
  ingredients: Ingredient[];
  prepTime: number; // in minutes
  tags: Tag[];
}

export interface Tag {
  id: string;
  name: string;
}

export interface Ingredient {
  id: string;
  name: string;
}

export interface WeeklyPlan {
  id: string;
  name: string;
  items: PlanItem[];
  isActive: boolean;
}

export interface PlanItem {
  id: string;
  meal: Meal;
  day: number;
}

export interface GroceryItem {
  id: string;
  ingredient: Ingredient;
  amount: number;
  name: string;
  isChecked: boolean;
}

export interface NotificationSettings {
  id: string;
  enabled: boolean;
  notificationType: 'today' | 'tomorrow';
  time: '06:30' | '07:00' | '07:30' | '16:30' | '17:00' | '17:30';
}