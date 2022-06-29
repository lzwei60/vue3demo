<template>
  <nav>
    <router-link to="/">setup</router-link> |
    <router-link to="/refView">refView</router-link> |
    <router-link to="/reactive">ReactiveView</router-link> |
    <router-link to="/computedView">computedView</router-link> |
    <router-link to="/readonlyView">ReadonlyView</router-link> |
    <router-link to="/watchView">watchView</router-link> |
    <router-link to="/watchEffectView">watchEffectView</router-link> |
    <router-link to="/providerView">providerView</router-link> |
    <router-link to="/definComponentView">definComponentView</router-link> |
    <router-link to="/templateRefsView">templateRefsView</router-link> |
    <router-link to="/correspondenceView">correspondenceView</router-link> |
    <router-link to="/TSdomeView">TS-DOME</router-link>|
    <router-link to="/TSAdvancedView">TS-进阶</router-link>
  </nav>
  <router-view/>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
