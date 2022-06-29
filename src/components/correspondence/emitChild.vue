<template>
  <div class="child-warp input-group">
    <input type="text" v-model="value" class="form-control" placeholder="请输入">
    <div class="input-group-append">
      <button class="btn btn-primary" type="button" @click="handleAdd">添加</button>
    </div>
  </div>
</template>
<script setup>
  import { ref, defineEmits, defineProps } from "vue";
  let value = ref("");
  const props = defineProps({
    list: {
      type: Array,
      default: ()=>[]
    }
  })
  const emits = defineEmits(['add','update:list']);  // 定义了多个emits传值 update:*是Vue中的固定写法，*表示props中的某个属性名。
  const handleAdd = () =>{
    emits('add', value.value);
    const arr = props.list;
    arr.push(value.value);
    emits('update:list', arr);
     value.value = "";
  }
</script>