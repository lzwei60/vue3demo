<template>
  <Child-component :list="list"></Child-component>
  <div class="child-warp input-group">
    <input type="text" v-model="value" class="form-control" placeholder="请输入">
    <div class="input-group-append">
      <button class="btn btn-primary" type="button" @click="handleAdd">添加</button>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import ChildComponent from "@/components/correspondence/childView.vue";
const list = ref(['JavaScript', 'HTML', 'CSS']);
let value = ref("");
const handleAdd = () => {
  list.value.push(value.value);
  value.value = "";
}
</script>
<style>
.input-group{
  height: 100%;
  position: relative;
  margin: auto;
  left: 46%;
  top: 50%;
}
.form-control{
  float: left;
  
  color: #000;
  box-shadow: none;
  font-size: 9pt;
  height: 28px;
  padding-top: 0;
  padding-bottom: 1px;
  padding-right: 0;
  padding-left: 5px;
  resize: none;
  border-radius: 2px;
  display: block;
  line-height: 1.42857143;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-right: none;
  -webkit-box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%);
  box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%);
  -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
  -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
  transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
}
.input-group-append{
  height: 28px;
}
.btn{
  float: left;
  height: 31px;
  background-color: #087BF5;
  border: 1px solid #ccc;
  border-left: none;
  border-radius: 2px;
  color: #fff;
}
</style>