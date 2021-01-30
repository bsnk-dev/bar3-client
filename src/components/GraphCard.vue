<template>
  <v-card
    outlined
    width="400px"
    height="380px"
  >
    <v-card-title>
      Messages Sent Over Time
    </v-card-title>
    <div
      class="pa-4"
    >
      <line-chart :height="300" v-if="loaded" :data="chartData"/>
    </div>
  </v-card>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { VueLineChart } from '@/types';
  import LineChart from '@/components/LineChart.vue';

  @Component({
    components: {
      LineChart
    },
  })
  export default class GraphCard extends Vue {
    loaded = false;
    chartData = new VueLineChart.ChartData();

    generateChartData() {
      this.chartData.labels = ['9 PM', '10 PM', '11 PM'];
      
      const dataset = new VueLineChart.Dataset();
      dataset.label = 'Message Count';
      dataset.data = [500, 200, 700];

      this.chartData.datasets.push(dataset);

      this.loaded = true;
    }

    mounted() {
      this.generateChartData();
    }
  }
</script>