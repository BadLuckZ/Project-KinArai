<script setup lang="ts">
import { ref } from "vue";
import { getRandomMenu, type SuggestionMenu } from "../../api/menu";

const currentResult = ref<SuggestionMenu | null>(null);
const isLoading = ref<boolean>(false);

async function rollRandom() {
  isLoading.value = true;
  try {
    currentResult.value = await getRandomMenu();
  } catch (error) {
    console.error("Failed to get random menu:", error);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="random-page">
    <h1 class="title">วันนี้กินไร?</h1>

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
