<template>
  <v-card
    outlined
    min-height="500px"
  >
    <v-row class="blue darken-2 white--text ma-0 align-center pb-4">
      <v-col cols="12" sm="6">
        <div class="text-h6">
          {{ campaign.name }}
        </div>
        <div class="text-subtitle-1">
          Created {{ new Date(campaign.createdTime).toLocaleDateString() }}
        </div>
      </v-col>

      <v-col cols="3" sm="2" lg="1" :class="(!['xs','sm'].includes($vuetify.breakpoint.name)) ? 'ml-auto' : ''">
        <div class="text-md-h6" style="opacity: 0.8">
          Sent
        </div>
        <div class="text-md-h5 font-weight-bold">
          {{ campaign.sentCount }}
        </div>
      </v-col>
      <v-col cols="3" sm="2" lg="1">
        <div class="text-md-h6" style="opacity: 0.8">
          Views
        </div>
        <div class="text-md-h5 font-weight-bold">
          {{ campaign.messagePixel.readCount.toLocaleString() }}
        </div>
      </v-col>
      <v-col cols="3" sm="2" lg="1" class="ml-0 text-md-h4 font-weight-bold">
        <div class="text-md-h6" style="opacity: 0.8">
          Clicks
        </div>
        <div class="text-md-h5 font-weight-bold">
          {{ totalLinkClicks.toLocaleString() }}
        </div>
      </v-col>
    </v-row>
    <v-row class="ma-5" style="height: 350px">
      <line-chart style="width: 100%; height: 100%;" v-if="loaded" :data="chartData"/>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { AnalyticalCampaign } from '@/interfaces/analytics';
import { VueLineChart } from '@/types';
import {Prop, Component, Vue, Watch} from 'vue-property-decorator';
import LineChart from '@/components/LineChart.vue';

@Component({
  components: {
    LineChart
  }
})
export default class AnalyticsGraphCard extends Vue {
  chartData = new VueLineChart.ChartData();
  loaded = false;

  totalLinkClicks = 0;

  @Prop(Object) campaign!: AnalyticalCampaign;
  
  generateViewsHistory() {
    const dataset = new VueLineChart.Dataset();
    dataset.borderColor = `rgb(0, 115, 255)`
    dataset.label = 'Message Views';
    dataset.fill = false;

    if (this.campaign.messagePixel.readCount == 0) {
      this.chartData.datasets.push(dataset);
      return [];
    }

    const firstRead = this.campaign.messagePixel.readHistory[0];

    const dayInMiliseconds = 24 * 60 * 60 * 1000;
    const totalIncrements = Math.ceil((this.campaign.messagePixel.readHistory[this.campaign.messagePixel.readHistory.length - 1] - firstRead) / dayInMiliseconds);

    let lastReadIndex = 0;

    for (let i = 1; i <= totalIncrements; i++) {
      let messagesAtIncrement = 0;
      while(this.campaign.messagePixel.readHistory[lastReadIndex] && this.campaign.messagePixel.readHistory[lastReadIndex] < (i * dayInMiliseconds) + firstRead) {
        messagesAtIncrement++;
        lastReadIndex++;
      }

      dataset.data.push({ x: (new Date((i * dayInMiliseconds) + firstRead).toLocaleDateString('en-US')), y: messagesAtIncrement });
    }

    this.chartData.datasets.push(dataset);
  }

  generateLinkClicksGraph() {
    let colorIncremeter = 0;
    const maxColorIndex = VueLineChart.color.length;

    for (const link of this.campaign.links) {
      colorIncremeter++;
      if (colorIncremeter >= maxColorIndex) colorIncremeter = 0;

      const urlInfo = new URL(link.url);

      const dataset = new VueLineChart.Dataset();
      dataset.label = urlInfo.hostname;
      dataset.borderColor = VueLineChart.color[colorIncremeter];
      dataset.fill = false;

      if (link.readCount == 0) {
        this.chartData.datasets.push(dataset);
        return [];
      }

      const firstRead = link.readHistory[0];

      const dayInMiliseconds = 24 * 60 * 60 * 1000;
      const totalIncrements = Math.ceil((link.readHistory[link.readHistory.length - 1] - firstRead) / dayInMiliseconds);

      let lastReadIndex = 0;

      for (let i = 1; i <= totalIncrements; i++) {
        let readsAtIncrement = 0;
        while(link.readHistory[lastReadIndex] && link.readHistory[lastReadIndex] < (i * dayInMiliseconds) + firstRead) {
          readsAtIncrement++;
          lastReadIndex++;
        }

        dataset.data.push({x: (new Date((i * dayInMiliseconds) + firstRead).toLocaleDateString('en-US')), y: readsAtIncrement});
      }

      this.chartData.datasets.push(dataset);
    }
  }

  getTotalLinkClicks() {
    this.totalLinkClicks = 0;
    
    for (const link of this.campaign.links) {
      this.totalLinkClicks += link.readCount;
    }
  }

  generateData() {
    this.chartData = new VueLineChart.ChartData();

    this.getTotalLinkClicks();
    this.generateViewsHistory();
    this.generateLinkClicksGraph();

    this.loaded = true;
  }

  @Watch('campaign')
  onCampaignChanged() {
    this.loaded = false;

    this.generateData();

    this.loaded = true;
  }

  mounted() {
    this.generateData();
  }
}
</script>