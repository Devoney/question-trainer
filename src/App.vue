<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
    <AddOrRemove/>
  </div>
</template>

<script lang="ts">
import 'bootstrap';
import { Component, Vue } from 'vue-property-decorator';
import AddOrRemove from './components/AddOrRemove.vue';
import HelloWorld from './components/HelloWorld.vue';

@Component({
  components: {
    AddOrRemove,
    HelloWorld,
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
