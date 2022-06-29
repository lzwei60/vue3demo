<template>
  <nav class="markdown-body">
      <router-link to="/TsdomeView/tsBase">ts基础类型</router-link> |
      <router-link to="/TsdomeView/funBase">函数类型</router-link> |
      <router-link to="/TsdomeView/interface">interface</router-link> | 
      <router-link to="/TsdomeView/classView">类</router-link> |  
      <router-link to="/TsdomeView/interfaceAndClass">interface 和 class 的关系</router-link> |
      <router-link to="/TsdomeView/enumView">枚举</router-link> |
      <router-link to="/TsdomeView/typeInference">类型推论</router-link> | 
      <router-link to="/TsdomeView/builtInObject">内置对象</router-link> | 
  </nav>
  <router-view />
</template>
<style lang="scss">
.markdown-body pre, .markdown-body pre>code.hljs{
  color: #333;
  background: #f8f8f8;
}
</style>