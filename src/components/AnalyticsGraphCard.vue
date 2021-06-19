<template>
  <v-card
    outlined
    height="500px"
  >
    <v-row class="blue darken-2 white--text ma-0 align-center pb-4">
      <v-col cols="12" sm="6">
        <div class="text-h6">
          My First Analytical Campaign
        </div>
        <div class="text-subtitle-1">
          Created June 1st
        </div>
      </v-col>
      <v-col cols="6" sm="2" lg="1" class="ml-auto">
        <div class="text-h6" style="opacity: 0.8">
          Sent
        </div>
        <div class="text-h5 font-weight-bold">
          4,394
        </div>
      </v-col>
      <v-col cols="6" sm="2" lg="1">
        <div class="text-h6" style="opacity: 0.8">
          Views
        </div>
        <div class="text-h5 font-weight-bold">
          52
        </div>
      </v-col>
      <v-col cols="6" sm="2" lg="1" class="ml-0 text-h4 font-weight-bold">
        <div class="text-h6" style="opacity: 0.8">
          Clicks
        </div>
        <div class="text-h5 font-weight-bold">
          12
        </div>
      </v-col>
    </v-row>
    <v-row class="ma-5">
      <line-chart :height="350" style="width: 100%" v-if="loaded" :data="chartData"/>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { AnalyticalCampaign } from '@/interfaces/analytics';
import { VueLineChart } from '@/types';
import {Prop, Component, Vue} from 'vue-property-decorator';
import LineChart from '@/components/LineChart.vue';

@Component({
  components: {
    LineChart
  }
})
export default class AnalyticsGraphCard extends Vue {
  chartData = new VueLineChart.ChartData();
  loaded = false;

  @Prop(Object) campaign!: AnalyticalCampaign;
  
  generateViewsHistory() {
    const labels: string[] = [];

    const dataset = new VueLineChart.Dataset();
    dataset.label = 'Message Views';
    dataset.fill = false;

    if (this.campaign.messagePixel.readCount == 0) {
      this.chartData.labels = labels;
      this.chartData.datasets.push(dataset);
      this.loaded = true;
      return;
    }

    const firstRead = this.campaign.messagePixel.readHistory[0];

    const dayInMiliseconds = 24 * 60 * 60 * 1000;
    const totalIncrements = Math.ceil((Date.now() - firstRead) / dayInMiliseconds);

    let lastReadIndex = 0;

    for (let i = 1; i <= totalIncrements; i++) {
      let messagesAtIncrement = 0;
      while(this.campaign.messagePixel.readHistory[lastReadIndex] && this.campaign.messagePixel.readHistory[lastReadIndex] < (i * dayInMiliseconds) + firstRead) {
        messagesAtIncrement++;
        lastReadIndex++;
      }

      labels.push(
        new Date((i * dayInMiliseconds) + firstRead).toLocaleTimeString()
      );

      dataset.data.push(messagesAtIncrement);
    }

    this.chartData.labels = labels;
    this.chartData.datasets.push(dataset);
    this.loaded = true;
  }

  generateData() {
    this.generateViewsHistory();
  }

  mounted() {
    this.generateData();
  }
}
</script>