<template>
  <div>
    <span>orginal: {{orginal.count}}</span>
    <br />
    <span>copy: {{copy.count}}</span>
    <br />
    <button @click="orginal.count++">orginalCount++</button>
    <br />
    <span>{{obj}},{{copyObj}}</span>
  </div>
</template>
<script setup>
  import { ref, reactive, readonly, watchEffect } from "vue"
  //接受一个对象（响应式或纯对象）或ref并返回原始对象的只读代理
  const orginal = reactive({count: 0});
  const copy = readonly(orginal);
  watchEffect(()=>{
    console.log(copy.count)
  })
  orginal.count++;
  copy.count++;
  //只读代理是深层的：任何被访问的嵌套 property 也是只读的。
  const obj = {name: "hyh", info: {age: 26}}
  let copyObj = readonly(obj);
  copyObj.name = "11";
  copyObj.info.age = 30;
  //与 reactive 一样，如果任何 property 使用了 ref，当它通过代理访问时，则被自动解包
  const raw = {
    count: ref(123)
  }
  const copyRaw = readonly(raw);
  console.log(raw.count.value); // 123
  console.log(copyRaw.count); // 123
</script>