<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getFoodHistory, type HistoryRow } from "../../api/history";

const history = ref<HistoryRow[]>([]);
const isLoading = ref(true);

onMounted(async () => {
  try {
    history.value = await getFoodHistory();
  } catch (error) {
    console.error("Failed to fetch history:", error);
  } finally {
    isLoading.value = false;
  }
});

function formatDate(dateString: string) {
  const utcDate = new Date(dateString.replace(" ", "T") + "Z");
  return utcDate.toLocaleString("th-TH", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Bangkok",
  });
}
</script>

<template>
  <div>
    <h1>ประวัติการกิน</h1>
    <p v-if="isLoading">กำลังโหลด...</p>
    <p v-else-if="history.length === 0">ยังไม่มีประวัติ ไปสุ่มเมนูกันก่อน!</p>
    <ul v-else class="history-list">
      <li v-for="item in history" :key="item.id" class="history-item">
        <span class="item-name">{{ item.name }}</span>
        <span> เวลา </span>
        <span class="item-date">{{ formatDate(item.eaten_at) }}</span>
      </li>
    </ul>
  </div>
</template>
