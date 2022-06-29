<template>
  <span>{{mood}}</span>
  <button @click="mood++">changeMood</button>
  <br />
  <span>{{target}}</span>
  <button @click="target++">changeTarget</button>
  <br />
  <span>{{obj.count}}</span>
  <button @click="obj.count++">changeObjCount</button>
</template>
<script setup>
  import { ref, reactive, watch} from "vue"
  /**
   * watch 有三个参数
   * name： 需要侦听的属性
    (curVal,preVal)=>{业务处理}箭头函数，是坚挺到的最新值和本次修改之前的值，此处写业务
    options：配置项，对监听器的配置，如：是否深度监听
   */
  //页面刚进入的时候并不会执行，值发生改变的 时候，才会打印出当前最新值和修改之前的值。
  let mood = ref(0);
  watch(mood, (cruVal, preVal) => {
    console.log("cru", cruVal);
    console.log("pre", preVal)
  },{
    // 配置项
  })
  //watch监听多个属性值
  let target = ref(1);
  watch([mood, target], ([curMood, curTarget],[preMood,preTarget])=>{
    console.log('curMood',curMood);
    console.log('preMood',preMood);
    console.log('curTarget',curTarget);
    console.log('preTarget',preTarget);
  },{
    // 配置项
  })
  //watch 监听引用数据类型
  //watch监听引用数据类型时，如果只监听其中某个属性时，使用语法：第一个参数，回调函数返回的是需要侦听对象的属性。后面的参数与之前的一致。
  let obj = reactive({
    count: 0
  })
  watch(()=>obj.count, (curVal, preVal)=>{
    console.log("count:", curVal, preVal)
  },{
    // 配置项
  })
  // 如果我们试着把属性去掉，直接监听整个对象，发现watch好像时效了，此时，我们就需要引入watchEffect。
  /**
  watch特点
  watch监听函数可以添加配置项，也可以配置为空，配置项为空的时候，watch的特点为：
    有惰性：运行的时候不会立即执行
    更加具体：需要添加监听的属性
    可以访问属性之前的值：回调函数内会返回最新值和修改之前的值
    可配置：可以添加配置项
  watch配置项
  watch的配置项可以补充watch特点上的不足，可以配置的有：
    immediate：配置watch属性是否立即执行，值为true时，一旦运行就会立即执行，值为false时，保持静默。
    deep：配置watch是否深度监听，值为true时，可以监听对象的所有属性，值为false时，保持更加具体性，必须要具体的属性上。 
  */
</script>