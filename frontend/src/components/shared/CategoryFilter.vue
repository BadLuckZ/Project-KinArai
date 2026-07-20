<script setup lang="ts">
import { CATEGORIES } from "../../lib/const";

const emit = defineEmits(["update:category"]);

function onChange(event: Event) {
  emit("update:category", (event.target as HTMLSelectElement).value);
}
</script>

<template>
  <div>
    <select @change="onChange">
      <option v-for="cat in CATEGORIES" :key="cat.value" :value="cat.value">
        {{ cat.label }}
      </option>
    </select>
  </div>
</template>
