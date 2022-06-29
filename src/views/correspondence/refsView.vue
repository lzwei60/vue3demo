<template>
  <span>refs:</span>
  <!-- 父组件 -->
  <ul class="parent list-group">
    <li class="list-group-item" v-for="i in childRefs?.list" :key="i">{{ i }}</li>
  </ul>
  <!-- 子组件 -->
  <child-components ref="childRefs"></child-components>
</template>
<script setup>
import { ref } from "vue";
import ChildComponents from "@/components/correspondence/refsChild.vue";
const childRefs = ref(null);
</script>