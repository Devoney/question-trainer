<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
    <table>
      <tbody>
        <book-record id="a8f9ce0"  index="1" title="My book title" nr-of-chapters="5" nr-of-questions="32"/>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import 'bootstrap';
import { Component, Vue } from 'vue-property-decorator';
import AddOrRemove from './components/AddOrRemove.vue';
import BookRecord from './components/BookRecord.vue';
import HelloWorld from './components/HelloWorld.vue';

@Component({
  components: {
    AddOrRemove,
    BookRecord,
    HelloWorld,
  },
})
export default class App extends Vue { }
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
