<template>
  <div class="home">
    <HelloWorld :msg="msg"/>
  </div>
</template>
<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { ref } from "vue"
export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  setup(){
    console.log("setup")
    let msg = ref("Welcome to Your Vue.js App");
    return {
      msg
    }
  },
  beforeCreate(){
    console.log("beforeCreate")
  },
}
</script>
