<template>
  <span>emit:</span>
  <!-- 父组件 -->
  <ul class="parent list-group">
    <li class="list-group-item" v-for="i in list" :key="i">{{ i }}</li>
  </ul>
  <!-- 子组件 @add 是emit传值，v-model:list 是v-model传值 -->
  <child-components @add="handleAdd" v-model:list="list"></child-components>
</template>
<script setup>
import { ref } from "vue";
import ChildComponents from "@/components/correspondence/emitChild.vue";
const list = ref(['JavaScript', 'HTML', 'CSS']);
const handleAdd = value => {
  list.value.push(value)
}
</script>