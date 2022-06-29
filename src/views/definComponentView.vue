<template>
  <div>{{name}}</div>
  <button @click="changeName">changeName</button>
</template>
<script>
/**
 * 这个函数不是必须的，除非你想完美的结合TypeScript
 * 这个函数仅仅提供了类型推断，方便在结合TypeScript的使用
 */
import { defineComponent, ref } from "vue"
export default defineComponent ({
  setup(){
    const name = ref("liao");
    const changeName = ()=>{
      name.value = "zhiwei"
    }
    return {
      name,
      changeName
    }
  }
})
</script>