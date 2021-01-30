<template>
  <div class="home view-small-inner-wrapper view-padding-inner-wrapper">
    <h1 class="mb-6">Dashboard</h1>
    <graph-card/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import GraphCard from '@/components/GraphCard.vue';

@Component({
  components: {
    GraphCard
  }
})
export default class Home extends Vue {
}
</script>
