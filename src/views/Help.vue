<template>
  <div v-html="marked" class="view-small-inner-wrapper view-padding-inner-wrapper">

  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import markup from 'marked';
  import main from '!!raw-loader!@/assets/help/index.md';

  @Component
  export default class Help extends Vue {
    mounted() {
      markup.setOptions({
        gfm: true,
        breaks: true,
      });
    }
    
    get marked() {
      return markup(main);
    }
  }
</script>