<template>
 <div>
   <div>this is a provide:</div>
    <button @click="changeProvide">changeProvide</button>
   <injectView></injectView>
  </div>
</template>
<script setup>
  import { provide, ref, readonly } from 'vue';
  import injectView from "@/components/injectView.vue"
  let ThemeSymbol = ref(0);
  let changeProvide = ()=>{
    ThemeSymbol.value++
  }
  // 通过provide 函数向子级组件共享数据（不限层级）
  // provide（'要共享的数据名称',被共享的数据）
  provide("ThemeSymbol", readonly(ThemeSymbol))
  
</script>