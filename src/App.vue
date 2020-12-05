<template>
  <div id="app">
    <router-view />
    <MainTabBar></MainTabBar>
  </div>
</template>

<script>
import MainTabBar from "components/content/mainTabbar/MainTabBar";
export default {
  components: {
    MainTabBar
  }
};
</script>
<style scoped>
@import "assets/css/base.css";
</style>
