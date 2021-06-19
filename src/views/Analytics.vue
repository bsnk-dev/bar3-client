<template>
  <div class="view-small-inner-wrapper view-padding-inner-wrapper">
    <h1>Analytics Manager</h1>
    
    <analytics-graph-card v-if="loaded" :campaign="campaigns[0]" class="mt-4"/>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import AnalyticsGraphCard from '@/components/AnalyticsGraphCard.vue';
import getCampaigns from '@/actions/getAnalyticalCampaigns';

@Component({
  components: {
    AnalyticsGraphCard
  }
})
export default class AnalyticsManager extends Vue {
  loaded = false;

  get campaigns() {
    return this.$store.getters['analytics/campaigns'];
  }

  async mounted() {
    await getCampaigns();
    this.loaded = true;
  }
}
</script>