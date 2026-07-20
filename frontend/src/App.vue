<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <div class="app min-h-screen bg-white">
    <nav
      class="sticky top-0 z-10 flex justify-center gap-2 border-b border-gray-100 bg-white/80 px-4 py-3 backdrop-blur"
    >
      <RouterLink
        to="/"
        class="rounded-full px-4 py-2 text-sm font-medium text-gray-500 transition hover:text-red-500 [&.router-link-exact-active]:bg-red-50 [&.router-link-exact-active]:text-red-500"
        >สุ่มเมนู</RouterLink
      >
      <RouterLink
        to="/history"
        class="rounded-full px-4 py-2 text-sm font-medium text-gray-500 transition hover:text-red-500 [&.router-link-exact-active]:bg-red-50 [&.router-link-exact-active]:text-red-500"
        >ประวัติ</RouterLink
      >
      <RouterLink
        to="/menu"
        class="rounded-full px-4 py-2 text-sm font-medium text-gray-500 transition hover:text-red-500 [&.router-link-exact-active]:bg-red-50 [&.router-link-exact-active]:text-red-500"
        >จัดการร้าน</RouterLink
      >
    </nav>
    <main class="content">
      <RouterView />
    </main>
  </div>
</template>
