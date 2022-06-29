<template>
  <nav class="markdown-body">
      <router-link to="/TSAdvancedView/highType">高级类型（一）</router-link> |
      <router-link to="/TSAdvancedView/highType2">高级类型（二）</router-link> |
      <router-link to="/TSAdvancedView/fanxingView">泛型</router-link> |
      <router-link to="/TSAdvancedView/tsDeclareFileView">TS声明文件</router-link> |
  </nav>
  <router-view />
</template>
<style lang="scss">
.markdown-body pre, .markdown-body pre>code.hljs{
  color: #333;
  background: #f8f8f8;
}
</style>