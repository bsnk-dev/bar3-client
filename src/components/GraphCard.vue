<template>
  <v-card
    outlined
    width="400px"
    height="380px"
  >
    <template v-if="graphType == 'messagesSentOverTime'">
      <v-card-title>
        Message Sending Activity
      </v-card-title>
      <div
        class="pa-4"
      >
        <line-chart :height="300" v-if="loaded" :data="chartData"/>
      </div>
    </template>
    <template v-if="graphType == 'apiRequests'">
      <v-card-title>
        API Requests
      </v-card-title>
      <v-card-text>
        <h4>
          Your Used API Requests
        </h4>
        <h2>
          {{ APIRequests.used }} / {{ APIRequests.max }}
        </h2>
      </v-card-text>
      <div
        class="pa-4 d-flex"
      >
          <v-progress-circular
            :size="200"
            :width="30"
            :value="((APIRequests.used / APIRequests.max) * 100) || 0"
            color="primary"
            class="ml-auto mr-auto"
          >
            {{ (((APIRequests.used / APIRequests.max) * 100) || 0).toFixed(2) }}%
          </v-progress-circular>
      </div>
    </template>
  </v-card>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { Message, VueLineChart } from '@/types';
  import LineChart from '@/components/LineChart.vue';

  @Component({
    components: {
      LineChart
    },
  })
  export default class GraphCard extends Vue {
    loaded = false;
    chartData = new VueLineChart.ChartData();

    @Prop(String) graphType!: string;

    get sentMessages(): Message[] {
      return this.$store.getters.sentMessages;
    }

    get APIRequests(): {max: number; used: number} {
      return this.$store.getters.apiDetails;
    }

    generateSentMessagesChartData() {
      const labels: string[] = [];

      const dataset = new VueLineChart.Dataset();
      dataset.label = 'Message Count';
      dataset.fill = false;

      if (this.sentMessages.length == 0) {
        this.chartData.labels = labels;
        this.chartData.datasets.push(dataset);
        this.loaded = true;
        return;
      }

      const firstMessage = this.sentMessages[0];

      const twoHours = 7200000;
      const totalIncrements = Math.ceil((Date.now() - firstMessage.sentTimeMilliseconds) / twoHours);

      let lastMessageIndex = 0;

      /**
       * Go through all of the two hour increments, find the amount of messages in them, and then push it to the graph
       */
      for (let i = 1; i <= totalIncrements; i++) {
        let messagesAtIncrement = 0;
        while(this.sentMessages[lastMessageIndex] && this.sentMessages[lastMessageIndex].sentTimeMilliseconds < (i * twoHours) + firstMessage.sentTimeMilliseconds) {
          messagesAtIncrement++;
          lastMessageIndex++;
        }

        labels.push(
          new Date((i * twoHours) + firstMessage.sentTimeMilliseconds).toLocaleTimeString()
        );

        dataset.data.push(messagesAtIncrement);
      }

      this.chartData.labels = labels;
      this.chartData.datasets.push(dataset);

      this.loaded = true;
    }

    generateData() {
      if (this.graphType == 'messagesSentOverTime') {
        this.generateSentMessagesChartData();
      }
    }

    mounted() {
      this.generateData();
    }
  }
</script>