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
  <div>
    <h1>จัดการร้านอาหาร</h1>
    <form @submit.prevent="handleSubmit">
      <input
        v-model="newName"
        type="text"
        placeholder="ชื่อร้าน เช่น ส้มตำป้าแดง"
      />
      <select v-model="newCategory" placeholder="หมวดหมู่ เช่น ส้มตำ">
        <option v-for="cat in CATEGORIES" :key="cat.value" :value="cat.value">
          {{ cat.label }}
        </option>
      </select>
      <button type="submit">เพิ่ม</button>
    </form>

    <p v-if="isLoading">กำลังโหลด...</p>
    <ul v-else>
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
