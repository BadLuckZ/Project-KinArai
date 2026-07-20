<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  addMenu,
  getMenuList,
  type CreateMenuBody,
  type MenuType,
} from "../../api/menu";

const isLoading = ref<boolean>(false);
const menuList = ref<MenuType[]>([]);
const newName = ref<string>("");
const newCategory = ref<string>("");

onMounted(async () => {
  isLoading.value = true;
  menuList.value = await getMenuList();
  isLoading.value = false;
});

async function handleSubmit() {
  if (!newName.value.trim() || !newCategory.value.trim()) return;
  try {
    await addMenu({
      name: newName.value.trim(),
      category: newCategory.value.trim(),
    } as CreateMenuBody);
    newName.value = "";
    newCategory.value = "";
    menuList.value = await getMenuList();
  } catch (error) {
    console.error("Failed to add menu:", error);
  }
}
</script>

<template>
  <div>
    <h1>รายการ Menu ที่มี</h1>
    <p v-if="isLoading">Loading...</p>
    <ul v-else>
      <li v-for="menu in menuList" :key="menu.id">
        {{ menu.name }} ({{ menu.category }})
      </li>
    </ul>
  </div>

  <div>
    <h1>จัดการร้านอาหาร</h1>
    <form @submit.prevent="handleSubmit">
      <input
        v-model="newName"
        type="text"
        placeholder="ชื่อร้าน เช่น ส้มตำป้าแดง"
      />
      <input
        v-model="newCategory"
        type="text"
        placeholder="หมวดหมู่ เช่น ส้มตำ"
      />
      <button type="submit">เพิ่ม</button>
    </form>

    <p v-if="isLoading">กำลังโหลด...</p>

    <ul v-else>
      <li v-for="item in menuList" :key="item.id">
        <span>{{ item.name }}</span>
      </li>
    </ul>
  </div>
</template>
