<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <div class="app">
    <nav>
      <RouterLink to="/">สุ่มเมนู</RouterLink>
      <RouterLink to="/history">ประวัติ</RouterLink>
      <RouterLink to="/menu">จัดการร้าน</RouterLink>
    </nav>
    <main class="content">
      <RouterView />
    </main>
  </div>
</template>
