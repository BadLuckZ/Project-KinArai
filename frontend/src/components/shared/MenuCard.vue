<script setup lang="ts">
defineProps({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  daysSince: {
    type: [Number, String],
    default: null,
  },
});
</script>

<template>
  <div>
    <p>
      {{ name }}
      <span v-if="category">({{ category }})</span>
    </p>
    <p v-if="daysSince == null || typeof daysSince === 'string'">
      ยังไม่เคยกิน
    </p>
    <p v-else>ไม่ได้กิน {{ daysSince }} วันแล้ว</p>
  </div>
</template>
