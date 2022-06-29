<template>
  <div class="child-warp input-group">
    <input type="text" v-model="value" class="form-control" placeholder="请输入">
    <div class="input-group-append">
      <button class="btn btn-primary" type="button" @click="handleAdd">添加</button>
    </div>
  </div>
</template>
<script setup>
/**
 * setup组件默认是关闭的，也即通过模板ref获取到的组件的公开实例，不会暴露任何在**<script setup>**中声明的绑定。
 * 如果需要**公开需要通过****defineExpose**** API暴露
 */
  import { ref, defineExpose } from "vue"
  const list = ref(['JavaScript', 'HTML', 'CSS']);
  const value = ref('');
  const handleAdd = () => {
    list.value.push(value.value);
    value.value = ""
  }
  defineExpose({list})
</script>