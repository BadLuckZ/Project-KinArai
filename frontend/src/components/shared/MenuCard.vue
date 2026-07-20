<script setup lang="ts">
defineProps({
  name: {
    type: String,
    required: true,
  },
  daysSince: {
    type: [Number, String],
    default: null,
  },
});
</script>

<template>
  <div>
    <p>{{ name }}</p>
    <p v-if="daysSince == null || typeof daysSince === 'string'">
      ยังไม่เคยกิน
    </p>
    <p v-else>ไม่ได้กิน {{ daysSince }} วันแล้ว</p>
  </div>
</template>
