<template>
  <div ref="root">ref使用实例</div>
  <div>this is a dom: {{root}}</div>
</template>
<script setup>
  /**
   * 通过使用ref来操作dom，如vue2的this.$refs.root
   */
  import { ref, onMounted } from "vue";
  // 创建一个DOM引用
  const root = ref(null);
  // 在DOM 首次加载完成之后，才能获取到元素的引用
  onMounted(()=>{
    // root.value是原生DOM对象
    console.log(root.value)
  })
</script>