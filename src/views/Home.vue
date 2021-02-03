<template>
  <div class="home view-small-inner-wrapper view-padding-inner-wrapper">
    <h1 class="mb-6">Dashboard</h1>
    <div class="dashboard-cards-container">
      <graph-card class="dashboard-card" graphType="messagesSentOverTime"/>
      <graph-card class="dashboard-card" graphType="apiRequests"/>
      <messages-sent-card class="dashboard-card"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import GraphCard from '@/components/GraphCard.vue';
import MessagesSentCard from '@/components/MessagesSentCard.vue';

@Component({
  components: {
    GraphCard,
    MessagesSentCard
  }
})
export default class Home extends Vue {
}
</script>

<style scoped>
  .dashboard-cards-container {
    display: flex;
    flex-wrap: wrap;
  }

  .dashboard-card {
    margin-top: 16px;
  }

  @media only screen and (min-width: 450px) {
    .dashboard-card {
      margin-right: 16px;
    }
  }
</style>