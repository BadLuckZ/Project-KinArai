<script setup lang="ts">
import { CATEGORIES } from "../../lib/const";

const emit = defineEmits(["update:category"]);

function onChange(event: Event) {
  emit("update:category", (event.target as HTMLSelectElement).value);
}
</script>

<template>
  <div>
    <select
      class="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm focus:border-red-400 focus:outline-none"
      @change="onChange"
    >
      <option v-for="cat in CATEGORIES" :key="cat.value" :value="cat.value">
        {{ cat.label }}
      </option>
    </select>
  </div>
</template>
