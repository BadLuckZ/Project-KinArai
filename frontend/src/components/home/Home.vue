<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getMenuList, type MenuType } from "../../api/menu";

const isLoading = ref<boolean>(false);
const menuList = ref<MenuType[]>([]);

onMounted(async () => {
  isLoading.value = true;
  menuList.value = await getMenuList();
  isLoading.value = false;
});
</script>

<template>
  <div>
    <h1>วันนี้กินไร?</h1>
    <p v-if="isLoading">Loading...</p>
    <ul v-else>
      <li v-for="menu in menuList" :key="menu.id">
        {{ menu.name }} ({{ menu.category }})
      </li>
    </ul>
  </div>
</template>
