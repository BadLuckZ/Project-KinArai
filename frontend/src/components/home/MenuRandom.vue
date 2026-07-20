<script setup lang="ts">
import { ref } from "vue";
import { getRandomMenu, type SuggestionMenu } from "../../api/menu";
import CategoryFilter from "../shared/CategoryFilter.vue";

const currentResult = ref<SuggestionMenu | null>(null);
const isLoading = ref<boolean>(false);
const selectedCategory = ref<string>("");

const emit = defineEmits(["update:category"]);

async function rollRandom() {
  isLoading.value = true;
  try {
    currentResult.value = await getRandomMenu(selectedCategory.value);
  } catch (error) {
    console.error("Failed to get random menu:", error);
  } finally {
    isLoading.value = false;
  }
}

function onCategoryChange(category: string) {
  selectedCategory.value = category;
}
</script>

<template>
  <div class="random-page">
    <h1 class="font-bold text-2xl text-red-500">วันนี้กินไร?</h1>

    <CategoryFilter @update:category="onCategoryChange" />

    <button class="random-btn" @click="rollRandom" :disabled="isLoading">
      {{ isLoading ? "กำลังสุ่ม..." : "สุ่มเมนู" }}
    </button>

    <div v-if="currentResult != null">
      <p>
        {{ currentResult.name }}
        <span v-if="currentResult.category"
          >({{ currentResult.category }})</span
        >
      </p>
      <p
        v-if="
          currentResult.daysSinceLastEaten == null ||
          typeof currentResult.daysSinceLastEaten === 'string'
        "
      >
        ยังไม่เคยกิน
      </p>
      <p v-else>ไม่ได้กิน {{ currentResult.daysSinceLastEaten }} วันแล้ว</p>
    </div>
  </div>
</template>
