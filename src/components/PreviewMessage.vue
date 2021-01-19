<template>
  <div class="red-msg">
    <div v-html="htmlPreview"></div>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from "vue-class-component";
  import { Prop } from 'vue-property-decorator';

  @Component
  export default class Preview extends Vue {
    @Prop(String) htmlPreview!: string
  }
</script>
<style scoped>
  .red-msg {
    background-color: #e4b6ae;
  }
</style>