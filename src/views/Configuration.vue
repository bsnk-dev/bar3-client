<template>
  <div class="view-small-inner-wrapper view-padding-inner-wrapper">
    <h1>Configuration</h1>
    <h2 class="mb-3 mt-8">
      API Details
    </h2>
    <article>
      To send messages Bar 3 requires your API key from Politics and War. 
      To retrieve the key go to <a target="_blank" href="https://politicsandwar.com/account">the account page</a>.
      Additionally, you need to set how often you want to check for new nations. Just set the minutes to update in the second box.
    </article>

    <v-text-field
      label="API Key"
      class="mt-6"
      outlined
      v-model="apiKey"
      @input="changes()"
    />

    <v-text-field
      label="Minutes to Update"
      type="number"
      outlined
      v-model="minutesToUpdate"
      @input="changes()"
    />

    <v-checkbox
      label="Message Analytics"
      class="mb-16"
      v-model="analyticsEnabled"
      @change="changes()"
    />

    <div class="d-flex align-center">
      <h2 class="mb-3 mt-2">
        Your Message
      </h2>
      <v-btn
        class="ml-auto"
        color="primary"
        outlined
        @click="$router.push('/message-creator')"
      >
        Edit
      </v-btn>
    </div>
    <h5>
      Preview
    </h5>
    <preview-message :html-preview="config.messageHTML" class="preview"/>
    <saved-changes-card
      v-model="saveChangesOpen"
      @save="save()"
    />
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import getConfig from '@/actions/getConfig';
  import sendConfig from '@/actions/sendConfig';
  import { Config, DefaultConfig } from '@/types';
  import PreviewMessage from '@/components/PreviewMessage.vue';
  import SavedChangesCard from '@/components/SavedChangesCard.vue';

  @Component({
    components: {
      PreviewMessage,
      SavedChangesCard
    }
  })
  export default class Configuration extends Vue {
    config: Config = new DefaultConfig();
    minutesToUpdate = 0;
    apiKey = '';
    analyticsEnabled = false;
    saveChangesOpen = false;
    error = false;

    async save() {
      const newConfig = {
        apiKey: this.apiKey,
        analyticsEnabled: this.analyticsEnabled,
        updatePeriodMilliseconds: this.minutesToUpdate * 60000
      };

      const res = await sendConfig(newConfig);
      Object.assign(this.config, newConfig);

      if (!res) {
        this.error = true;
        alert('Couldn\'t update config! Please try again and verify the server is running.');
      } else {
        this.saveChangesOpen = false;
      }
    }

    changes() {
      if (this.apiKey != this.config.apiKey) {
        this.saveChangesOpen = true;
        return;
      }
      
      if (this.minutesToUpdate != (this.config.updatePeriodMilliseconds || 0) / 60000) {
        this.saveChangesOpen = true;
        return;
      }

      if (this.analyticsEnabled != this.config.analyticsEnabled) {
        this.saveChangesOpen = true;
        return;
      }

      this.saveChangesOpen = false;
    }

    async mounted() {
      const config = await getConfig();
      if (config && !(config instanceof Error)) {
        this.config = config;
        this.minutesToUpdate = (config.updatePeriodMilliseconds || 0) / 60000;
        this.apiKey = config.apiKey || '';
      } else {
        alert('Couldn\'t retrieve your config!');
      }
    }
  }
</script>

<style scoped>
  .preview {
    border-radius: 5px;
    padding: 10px;
    min-height: 200px;
    width: 100%;
    font-family: "Roboto",Arial;
  }
</style>