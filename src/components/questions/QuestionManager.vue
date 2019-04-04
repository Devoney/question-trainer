<template>
  <div>
    <add-question />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import AddQuestion from '@/components/questions/AddQuestion.vue';

@Component({
  components: {
    AddQuestion,
  },
})
export default class QuestionManager extends Vue {

}
</script>

<style scoped>
</style>