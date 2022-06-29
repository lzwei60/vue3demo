<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import {toRefs} from "vue"
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  setup(props){
    const { msg } = toRefs(props);
    console.log("props传值:", msg.value);
  }
}
</script>