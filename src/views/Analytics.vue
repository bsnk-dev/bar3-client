<template>
  <div class="view-small-inner-wrapper view-padding-inner-wrapper fill-height mb-10">
    <div v-if="enabled">
      <v-row>
        <v-col cols="12" md="8">
          <h1>Analytics Manager</h1>
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            class="ml-auto"
            :items="campaigns"
            v-model="selectedCampaign"
            return-object
            v-if="loaded"
            filled
            hide-details
            item-text="name"
            label="Select a Campaign"
            append-outer-icon="mdi-plus-circle"
            @click:append-outer="openCreateDialog()"
          >
          </v-select>
        </v-col>
      </v-row>
      <div class="mb-4 mt-4">
        <analytics-graph-card v-if="loaded" :campaign="selectedCampaign" class="mt-4"/>
      </div>
      <v-row>
      <v-col cols="12" md="4">
        <v-card
          outlined
          height="250px"
          v-if="loaded"
        >
            <v-card-title>
              Views
            </v-card-title>
            <v-card-text>
              <h4>
                Viewed to Sent Messages Ratio
              </h4>
              <h2>
                {{ selectedCampaign.messagePixel.readCount }} / {{ selectedCampaign.sentCount }}
              </h2>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="8">
          <analytics-link-card v-if="loaded" :campaign="selectedCampaign"/>
        </v-col>
      </v-row>

      <create-campaign-dialog v-model="createCampaignDialog" @created="createdNewCampaign()"/>
    </div>

    <v-container class="fill-height" fluid v-else-if="loaded">
      <v-row class="text-center mt-n16">
        <v-col class="ma-auto" style="max-width: fit-content" xs="10" md="7">
          <h2>
            Analytics
          </h2>
          <div>
            Enable analytics in <router-link to="/config">Configuration</router-link> to get access to message analytics.
            Message Analytics allows you to track the number of views and clicks of links inside your messages
            over time.
          </div>
        </v-col>
      </v-row>
    </v-container>

    <div v-if="!loaded">
      <v-skeleton-loader
        class="mx-auto"
        type="image"
      ></v-skeleton-loader>
      <v-row class="mt-6">
        <v-col cols="12" md="6">
          <v-skeleton-loader
            class="mx-auto"
            type="image"
          ></v-skeleton-loader>
        </v-col>
        <v-col cols="12" md="6">
          <v-skeleton-loader
            class="mx-auto"
            type="image"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import AnalyticsGraphCard from '@/components/AnalyticsGraphCard.vue';
import AnalyticsLinkCard from '@/components/AnalyticsLinksCard.vue';
import CreateCampaignDialog from '@/components/CreateAnalyticsCampaignDialog.vue';
import getCampaigns from '@/actions/getAnalyticalCampaigns';
import getConfig from '@/actions/getConfig';
import { AnalyticalCampaign } from '@/interfaces/analytics';

@Component({
  components: {
    AnalyticsGraphCard,
    AnalyticsLinkCard,
    CreateCampaignDialog
  }
})
export default class AnalyticsManager extends Vue {
  loaded = false;
  enabled = false
  selectedCampaign: AnalyticalCampaign | null = null;
  createCampaignDialog = false;

  get campaigns() {
    return this.$store.getters['analytics/campaigns'];
  }

  openCreateDialog() {
    this.createCampaignDialog = true;
  }

  createdNewCampaign() {
    this.loaded = false;
    
    this.loadAnalytics();
  }

  async loadAnalytics() {
    this.enabled = true;

    await getCampaigns();

    if (this.campaigns.length > 0) {
      this.selectedCampaign = this.campaigns[this.campaigns.length - 1];
      this.loaded = true;
    } else {
      this.openCreateDialog();
    }
  }

  async mounted() {
    const config = await getConfig();

    if (config && !(config instanceof Error) && config.analyticsEnabled) {
      await this.loadAnalytics();
    } else {
      this.loaded = true;
    }
  }
}
</script>