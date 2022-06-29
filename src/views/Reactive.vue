<template>
  <h1>无法响应的reactive数据</h1>
  <p>{{reactiveBaseType}}</p>
  <p>{{reactiveObjType}}</p>
  <button @click="setBaseType">setBaseType</button>
  <button @click="setObjType">setObjType</button>
  <h1>第一种正确响应的reactive数据</h1>
  <p>{{firstboolRef}}</p>
  <p>{{firstarrRef}}</p>
  <p>{{firstobjRef}}</p>
  <button @click="firstChange">firstChange</button>
  <h1>第一种正确响应的reactive数据</h1>
  <p>{{boolRef}}</p>
  <p>{{arrRef}}</p>
  <p>{{objRef}}</p>
  <button @click="secondChange">secondChange</button>
</template>
<script setup>
  import { reactive, ref, toRefs } from "vue"
  // reactive 无法定义基本数据类型的Proxy，且设置值无响应数据
  let reactiveBaseType = reactive(null);
  let setBaseType = ()=>{
    reactiveBaseType.value = "change base type"
  }
  // console.log("reactiveBaseType", reactiveBaseType) //null
  // 如果reactive使用的是引用类型
  let reactiveObjType = reactive({count: 1});
  let setObjType = ()=>{
    // 这样设置会去proxy
    //proxy 没了，所以reactive申明的无法直接替换整个对象，如果有这个需求请使用ref
    reactiveObjType.value = {count: 2};
  }
  // console.log("reactiveObjType", reactiveObjType) // {count: 1}
  // 写法
  /**
   * ref和reactive都可以做响应式
   * ref：一般用在定义基本类型和引用裂隙，如果是引用类型底层会借助reactive形成proxy代理对象，直接复制整个对象，如table的数据请求回来，需要将数据整体赋值给响应对象，这时，如果用的是reactive就无法进行响应。
   * reactive：一般用在引用类型，如{}，[]等，不能一次性修改整个对象，如后台请求table的数据时，如果想一次性赋值的整个数组的话，就不行，此时建议使用ref来定义数组
   */
  //第一种写法：除了对象都用ref来定义
  let firstboolRef = ref(false);
  let firstarrRef = ref([]);
  firstarrRef.value = [1,2,3,4]
  let firstobjRef = reactive({
    arr: []
  })
  firstobjRef.arr = [1,2,3,4,5];
  let firstChange = ()=>{
    firstboolRef.value = !firstboolRef.value;
    firstarrRef.value[1] = firstarrRef.value[1]+1
    firstobjRef.arr =  firstarrRef.value;
  }

  //第二种写法： 都用reactive来定义，然后使用toRefs进行导出页面使用
  let state = reactive({
    boolRef: false,
    arrRef: [],
    objRef: {}
  })
  let { boolRef,arrRef,objRef } = toRefs(state);
  state.arrRef = [4,3,2,1];
  state.objRef.arr = [5,4,3,2,1];
  let secondChange = ()=>{
    state.boolRef = !state.boolRef;
    state.arrRef[1] = state.arrRef[1]+1
    state.objRef.arr =  state.arrRef;
  }
</script>