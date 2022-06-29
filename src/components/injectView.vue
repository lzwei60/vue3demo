<template>
  <div>this is a inject: {{theme}}</div>
</template>
<script setup>
  import { inject } from "vue"
  const theme = inject("ThemeSymbol", 'light');
  console.log(theme)
</script>