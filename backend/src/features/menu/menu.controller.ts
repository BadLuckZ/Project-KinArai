import { Context } from "elysia";
import { MenuRepository } from "./menu.repository";

export interface SuggestionResponse {
  id: number;
  name: string;
  category: string;
  daysSinceLastEaten: number | "never";
  note?: string;
}

export interface ErrorResponse {
  error: string;
}

export class MenuController {
  static getRandom(set: Context["set"]): SuggestionResponse | ErrorResponse {
    const items = MenuRepository.getRandomSuggest();

    if (!items) {
      const fallback = MenuRepository.getFallbackSuggest();
      if (!fallback) {
        set.status = 404;
        return { error: "No menu items found" };
      }
      return {
        id: fallback.id,
        name: fallback.name,
        category: fallback.category,
        daysSinceLastEaten: 0,
        note: "All items eaten recently, picking randomly",
      };
    }

    return {
      id: items.id,
      name: items.name,
      category: items.category,
      daysSinceLastEaten: items.days_since ?? "never",
    };
  }
}
