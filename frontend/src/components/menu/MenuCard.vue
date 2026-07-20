<script setup lang="ts">
import { ref } from "vue";
import { deleteMenu, updateMenu, type MenuType } from "../../api/menu";

const props = defineProps<{ menu: MenuType }>();
const emit = defineEmits<{ changed: [] }>();

const isEditing = ref(false);
const editName = ref("");
const editCategory = ref("");

function startEdit() {
  isEditing.value = true;
  editName.value = props.menu.name;
  editCategory.value = props.menu.category;
}

function cancelEdit() {
  isEditing.value = false;
  editName.value = "";
  editCategory.value = "";
}

async function handleUpdate() {
  if (!editName.value.trim() || !editCategory.value.trim()) return;
  try {
    await updateMenu(props.menu.id, {
      name: editName.value.trim(),
      category: editCategory.value.trim(),
    });
    isEditing.value = false;

    // Send "changed" message
    emit("changed");
  } catch (error) {
    console.error("Failed to update menu:", error);
  }
}

async function handleDelete() {
  try {
    await deleteMenu(props.menu.id);

    // Send "changed" message
    emit("changed");
  } catch (error) {
    console.error("Failed to delete menu:", error);
  }
}
</script>

<template>
  <li
    class="flex items-center justify-between gap-3 rounded-xl bg-white p-4 shadow-sm ring-1 ring-black/5"
  >
    <template v-if="isEditing">
      <div class="flex flex-1 gap-2">
        <input
          v-model="editName"
          type="text"
          class="w-1/2 rounded-lg border border-gray-200 px-2 py-1 text-sm focus:border-red-400 focus:outline-none"
        />
        <input
          v-model="editCategory"
          type="text"
          class="w-1/2 rounded-lg border border-gray-200 px-2 py-1 text-sm focus:border-red-400 focus:outline-none"
        />
      </div>
      <div class="flex shrink-0 gap-2">
        <button
          type="button"
          @click="handleUpdate"
          class="rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white transition hover:bg-emerald-600"
        >
          บันทึก
        </button>
        <button
          type="button"
          @click="cancelEdit"
          class="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-500 transition hover:bg-gray-200"
        >
          ยกเลิก
        </button>
      </div>
    </template>
    <template v-else>
      <span class="font-medium text-gray-800"
        >{{ menu.name }}
        <span class="font-normal text-gray-400">({{ menu.category }})</span>
      </span>
      <div class="flex shrink-0 gap-2">
        <button
          type="button"
          @click="startEdit"
          class="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-500 transition hover:bg-gray-200"
        >
          แก้ไข
        </button>
        <button
          type="button"
          @click="handleDelete"
          class="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-500 transition hover:bg-red-100"
        >
          ลบ
        </button>
      </div>
    </template>
  </li>
</template>
