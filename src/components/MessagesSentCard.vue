<template>
  <v-card
    outlined
    width="400px"
    height="380px"
  >
    <v-card-title>
      Sent Messages
    </v-card-title>
    <v-divider/>
    <v-list
      dense
      class="scrolling-list"
    >
      <div
        v-for="(messageItem, index) in messageItems" 
        :key="index"
      >
        <v-list-item>
          <v-list-item-icon>
            <template v-if="messageItem.successful">
              <v-icon
                color="green"
                dark
              >
                mdi-check
              </v-icon>
            </template>
            <template v-else>
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    color="red"
                    dark
                    v-bind="attrs"
                    v-on="on"
                  >
                    mdi-close
                  </v-icon>
                </template>
                <span>{{ messageItem.error }}</span>
              </v-tooltip>
            </template>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              {{ messageItem.nation.leader }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ new Date(messageItem.sentTimeMiliseconds).toLocaleString() }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider/>
      </div>
      <div v-if="this.messageItems.length == 0" class="ml-4">
        No messages sent since you started Bar 3.
      </div>
    </v-list>
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
  export default class MessagesSentCard extends Vue {
    loaded = false;
    chartData = new VueLineChart.ChartData();
    get messageItems() {
      return this.$store.getters.sentMessages.slice().reverse();
    }
  }
</script>

<style scoped>
  .scrolling-list {
    max-height: 300px;
    overflow-y: auto;
  }
</style>