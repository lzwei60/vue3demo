<template>
  <span>{{obj.name}}</span>
  <span>{{obj.sex}}</span>
  <button @click="changeNameSex">改变nameorsex</button>
  <br />
  <span>{{obj2.name}}</span>
  <span>{{obj2.sex}}</span>
  <button @click="changeNameSex2">改变nameorsex2</button>
</template>
<script setup>
  import { reactive, watch, watchEffect } from 'vue'
  /**
   watchEffect 也是一个侦听器，是一个副作用函数。
   它会监听引用数据类型的所有属性，不需要具体到某一个属性，一旦运行就会立刻被监听，
   组件卸载的时候会停止监听。
   watchEffect参数只有一个回调函数。此时刷新页面进入，watchEffect就会打印结果
   */
  let obj = reactive({name: "lzw", sex: "男"});
  watchEffect(()=>{
    console.log("name:", obj.name);
    console.log("sex:", obj.sex);
  })
  const changeNameSex = ()=>{
    obj.name = "zuishuai";
    obj.sex = "女";
  }
  /**
  watchEffect特点
  watchEffect副作用函数的特点分别为：
    非惰性：一旦运行就会立即执行。
    更加抽象：使用时不需要具体指定监听的谁，回调函数内直接使用就可以。相比watch比较难理解。
    不可访问之前的值：只能访问当前最新的值，访问不到修改之前的值。
  watch与watchEffect联系
    watch的前两个特点与watchEffect的两个特点刚好相反，watch通过配置项可以修改成带有watchEffect特点。
   */
  const obj2 = reactive({name: 'qq', sex: "女"});
  watch(()=>obj2, (cur, pre) => {
    console.log("cur", cur);
    console.log("pre", pre);
  }, {
    immediate: true,
    deep: true
  })
  const changeNameSex2 = ()=>{
    obj2.name = "zuishuai";
    obj2.sex = "女";
  }
</script>