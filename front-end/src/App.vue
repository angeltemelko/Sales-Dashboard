<template>
  <nav-bar></nav-bar>
  <home-view></home-view>
  <router-view />
</template>

<style lang="scss"></style>
<script>
import NavBar from "@/views/NavBar";
import HomeView from "@/views/HomeView";
export default {
  components: { NavBar, HomeView },
};
</script>
