<script setup lang="ts">
import { ref } from "vue";

defineProps<{
  msg: string;
  likes?: number;
}>();

let id = 0;

const newTodo = ref("");
const todos = ref([
  { id: id++, text: "Learn HTML" },
  { id: id++, text: "Learn JavaScript" },
  { id: id++, text: "Learn Vue" },
]);

const addTodo = () => {
  todos.value.push({
    id: id++,
    text: newTodo.value,
  });
  newTodo.value = "";
};

const removeTodo = (todo: { id: number; text: string }) => {
  todos.value = todos.value.filter((todos) => todos !== todo);
};
</script>

<template>
  <h1>{{ msg }}</h1>
  <form @submit.prevent="addTodo">
    <input v-model="newTodo" />
    <button>Add Todo</button>
  </form>
  <ul>
    <li v-for="todo in todos" :key="todo.id">
      {{ todo.text }}
      <button @click="removeTodo(todo)">X</button>
    </li>
  </ul>
</template>
