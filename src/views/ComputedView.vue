<template>
  <div class="about">
    <span>{{num1}} + {{num2}} = {{sum}}</span>
    <button @click="num1++">num1自加</button>
    <button @click="num2++">num2自加</button>
  </div>
  <div v-for="(item, index) in arr" :key="index" @click="sltEle(index)">
    {{item}}
  </div>
  {{num1}} * 10 = {{mul}}
  <button @click="mul=100">改值</button>  
</template>
<script setup>
  import { ref, computed, reactive } from 'vue';
  let num1 = ref(1);
  let num2 = ref(1);
  let sum = computed(()=>{
    return num1.value + num2.value
  })
  const arr = reactive([
     "数组1", "数组2"
  ]);
  const sltEle = computed(() => {
    return (index)=>{
      console.log("index", index)
    }
  })
  let mul = computed({
    get: ()=>{
      return num1.value * 10
    },
    set: (value) => {
      return num1.value = value/10
    }
  })
</script>
