<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  addMenu,
  getMenuList,
  type CreateMenuBody,
  type MenuType,
} from "../../api/menu";
import MenuCard from "./MenuCard.vue";
import { CATEGORIES } from "../../lib/const.ts";

const isLoading = ref<boolean>(false);
const menuList = ref<MenuType[]>([]);
const newName = ref<string>("");
const newCategory = ref<string>("");

onMounted(async () => {
  isLoading.value = true;
  menuList.value = await getMenuList();
  isLoading.value = false;
});

async function refreshList() {
  menuList.value = await getMenuList();
}

async function handleSubmit() {
  if (!newName.value.trim() || !newCategory.value.trim()) return;
  try {
    await addMenu({
      name: newName.value.trim(),
      category: newCategory.value.trim(),
    } as CreateMenuBody);
    newName.value = "";
    newCategory.value = "";
    await refreshList();
  } catch (error) {
    console.error("Failed to add menu:", error);
  }
}
</script>

<template>
  <div
    class="flex min-h-screen flex-col items-center gap-6 bg-linear-to-b from-orange-50 to-white px-4 py-12"
  >
    <h1 class="text-2xl font-extrabold tracking-tight text-red-500">
      จัดการร้านอาหาร
    </h1>

    <form
      @submit.prevent="handleSubmit"
      class="flex w-full max-w-md flex-col gap-3 rounded-2xl bg-white p-6 shadow-lg ring-1 ring-black/5"
    >
      <input
        v-model="newName"
        type="text"
        placeholder="ชื่อร้าน เช่น ส้มตำป้าแดง"
        class="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:border-red-400 focus:outline-none"
      />
      <select
        v-model="newCategory"
        placeholder="หมวดหมู่ เช่น ส้มตำ"
        class="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:border-red-400 focus:outline-none"
      >
        <option v-for="cat in CATEGORIES" :key="cat.value" :value="cat.value">
          {{ cat.label }}
        </option>
      </select>
      <button
        type="submit"
        class="rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-red-200 transition hover:bg-red-600 active:scale-95"
      >
        เพิ่ม
      </button>
    </form>

    <p v-if="isLoading" class="text-gray-400">กำลังโหลด...</p>
    <ul v-else class="flex w-full max-w-md flex-col gap-3">
      <MenuCard
        v-for="menu in menuList"
        :key="menu.id"
        :menu="menu"
        @changed="refreshList"
      />
      <!-- @changed means when there's "changed" message, do this -->
    </ul>
  </div>
</template>
