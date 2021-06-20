<template>
  <v-card
    height="250px"
    outlined
  >
    <v-card-title>
      Links
    </v-card-title>
    <v-divider/>
    <v-list
      dense
      class="scrolling-list"
    >
      <div
        v-for="link of campaign.links" 
        :key="link.url"
      >
        <v-list-item>
          <v-list-item-icon>
            <v-icon>
              mdi-link-variant
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              {{ urlName(link.url) }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ link.readCount }} Clicks
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider/>
      </div>
      <div v-if="this.campaign.links.length == 0" class="ml-4">
        No links sent in this campaign.
      </div>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import { AnalyticalCampaign } from '@/interfaces/analytics';
import {Component, Vue, Prop} from 'vue-property-decorator';

@Component
export default class AnalyticsLinkCard extends Vue {
  @Prop(Object) campaign!: AnalyticalCampaign;

  urlName(urlString: string) {
    const url = new URL(urlString);

    return `${url.hostname}`;
  }
}
</script>

<style scoped>
  .scrolling-list {
    max-height: 180px;
    overflow-y: auto;
  }
</style>