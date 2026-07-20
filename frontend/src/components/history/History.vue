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
  <div
    class="flex min-h-screen flex-col items-center gap-6 bg-linear-to-b from-orange-50 to-white px-4 py-12"
  >
    <h1 class="text-2xl font-extrabold tracking-tight text-red-500">
      ประวัติการกิน
    </h1>

    <p v-if="isLoading" class="text-gray-400">กำลังโหลด...</p>
    <p v-else-if="history.length === 0" class="text-gray-400">
      ยังไม่มีประวัติ ไปสุ่มเมนูกันก่อน!
    </p>
    <ul v-else class="flex w-full max-w-md flex-col gap-3">
      <li
        v-for="item in history"
        :key="item.id"
        class="flex items-center justify-between gap-3 rounded-xl bg-white p-4 shadow-sm ring-1 ring-black/5"
      >
        <span class="font-semibold text-gray-800">{{ item.name }}</span>
        <span class="text-xs text-gray-400">{{
          formatDate(item.eaten_at)
        }}</span>
      </li>
    </ul>
  </div>
</template>
