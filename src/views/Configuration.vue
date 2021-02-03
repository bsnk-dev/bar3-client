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
      v-model="config.apiKey"
    />

    <v-text-field
      label="Minutes to Update"
      type="number"
      class="mb-16"
      outlined
      v-model="minutesToUpdate"
    />
    <div class="d-flex">
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
    <preview-message :html-preview="config.messageHTML"/>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import getConfig from '@/actions/getConfig';
  import { Config } from '@/types';
  import PreviewMessage from '@/components/PreviewMessage.vue';

  @Component({
    components: {
      PreviewMessage
    }
  })
  export default class Configuration extends Vue {
    config: Config = new Config();
    minutesToUpdate = 0;

    async mounted() {
      const config = await getConfig();
      if (config && !(config instanceof Error)) {
        this.config = config;
        this.minutesToUpdate = config.updatePeriodMilliseconds / 60000;
      } else {
        alert('Couldn\'t retrieve your config!');
      }
    }
  }
</script>