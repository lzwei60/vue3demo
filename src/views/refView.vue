<template>
  <p>{{refObj}}</p>
  <button @click="changeCount">点击增加count</button>
</template>
<script setup>
import { ref } from "vue"
let msg = ref("Welcome to Your Vue.js App");
    let refObj = ref({});
    refObj.value.count = 0;
    let changeCount = ()=>{
      msg.value = "Welcome to Your Vue.js App";
      refObj.value.count++
    }
</script>