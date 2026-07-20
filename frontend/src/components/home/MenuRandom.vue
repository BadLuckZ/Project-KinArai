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
  <div
    class="flex min-h-screen flex-col items-center gap-6 bg-linear-to-b from-orange-50 to-white px-4 py-12"
  >
    <h1 class="text-3xl font-extrabold tracking-tight text-red-500">
      วันนี้กินไร?
    </h1>

    <CategoryFilter @update:category="onCategoryChange" />

    <button
      class="rounded-full bg-red-500 px-10 py-3 text-lg font-semibold text-white shadow-md shadow-red-200 transition hover:bg-red-600 active:scale-95 disabled:cursor-not-allowed disabled:bg-red-300 disabled:shadow-none"
      @click="rollRandom"
      :disabled="isLoading"
    >
      {{ isLoading ? "กำลังสุ่ม..." : "สุ่มเมนู" }}
    </button>

    <div
      v-if="currentResult != null"
      class="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-lg ring-1 ring-black/5"
    >
      <p class="text-xl font-bold text-gray-800">
        {{ currentResult.name }}
        <span v-if="currentResult.category" class="font-normal text-gray-400"
          >({{ currentResult.category }})</span
        >
      </p>
      <p
        v-if="
          currentResult.daysSinceLastEaten == null ||
          typeof currentResult.daysSinceLastEaten === 'string'
        "
        class="mt-2 text-sm font-medium text-emerald-500"
      >
        ยังไม่เคยกิน
      </p>
      <p v-else class="mt-2 text-sm text-gray-500">
        ไม่ได้กิน {{ currentResult.daysSinceLastEaten }} วันแล้ว
      </p>
    </div>
  </div>
</template>
