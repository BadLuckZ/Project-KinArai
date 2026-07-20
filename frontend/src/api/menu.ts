import { fetchAPI } from "../lib/client";

export interface SuggestionMenu {
  id: number;
  name: string;
  category: string;
  daysSinceLastEaten: number | "never";
}

export function getRandomMenu(category: string): Promise<SuggestionMenu> {
  const params = category ? `?category=${encodeURIComponent(category)}` : "";
  return fetchAPI<SuggestionMenu>(`/api/v1/menus/random${params}`);
}

// ==========================================

export type MenuType = {
  id: number;
  name: string;
  category: string;
};

export function getMenuList(): Promise<MenuType[]> {
  return fetchAPI<MenuType[]>("/api/v1/menus");
}

// ==========================================

export interface CreateMenuBody {
  name: string;
  category: string;
}

export function addMenu(
  body: CreateMenuBody,
): Promise<{ success: boolean; id: number }> {
  return fetchAPI<{ success: boolean; id: number }>("/api/v1/menus", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

// ==========================================

export interface UpdateMenuBody {
  name: string;
  category: string;
}

export function updateMenu(
  id: number,
  body: UpdateMenuBody,
): Promise<{ success: boolean; id: number; name: string; category: string }> {
  return fetchAPI<{
    success: boolean;
    id: number;
    name: string;
    category: string;
  }>(`/api/v1/menus/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}

// ==========================================

export function deleteMenu(
  id: number,
): Promise<{ success: boolean; message: string }> {
  return fetchAPI<{ success: boolean; message: string }>(
    `/api/v1/menus/${id}`,
    {
      method: "DELETE",
    },
  );
}
