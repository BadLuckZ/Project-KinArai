import { fetchAPI } from "../lib/client";

export interface HistoryRow {
  id: number;
  name: string;
  category: string;
  eaten_at: string;
}

export async function getFoodHistory(): Promise<HistoryRow[]> {
  return fetchAPI<HistoryRow[]>("/api/v1/history");
}

export interface ConfirmBody {
  menuId: number;
}

export async function addFoodHistory(body: ConfirmBody): Promise<{
  success: boolean;
  message: string;
}> {
  return fetchAPI<{
    success: boolean;
    message: string;
  }>("/api/v1/history", {
    method: "POST",
    body: JSON.stringify(body),
  });
}
