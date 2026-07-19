import { Context } from "elysia";
import { HistoryRepository } from "./history.repository";
import { MenuRepository } from "../menu/menu.repository";
import { HistoryRow } from "./history.type";

export interface ConfirmBody {
  menuId: number;
}

export class HistoryController {
  static createHistory(body: ConfirmBody, set: Context["set"]) {
    const { menuId } = body;

    const item = MenuRepository.findById(menuId);
    if (!item) {
      set.status = 404;
      return { error: "Menu not found" };
    }

    HistoryRepository.createHistory(menuId);
    return { success: true, message: "History Recorded" };
  }

  static getHistory(): HistoryRow[] {
    return HistoryRepository.getHistory();
  }
}
