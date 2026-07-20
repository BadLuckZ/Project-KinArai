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
  <li>
    <template v-if="isEditing">
      <input v-model="editName" type="text" />
      <input v-model="editCategory" type="text" />
      <button type="button" @click="handleUpdate">บันทึก</button>
      <button type="button" @click="cancelEdit">ยกเลิก</button>
    </template>
    <template v-else>
      <span>{{ menu.name }} ({{ menu.category }})</span>
      <button type="button" @click="startEdit">แก้ไข</button>
      <button type="button" @click="handleDelete">ลบ</button>
    </template>
  </li>
</template>
