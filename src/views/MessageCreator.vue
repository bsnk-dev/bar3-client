

<template>
  <div class="view-small-inner-wrapper view-padding-inner-wrapper">
    <h1>Message Creator</h1>
    <v-tabs v-model="editorTab" class="mt-2">
      <v-tab>
        Basic Editor
      </v-tab>
      <v-tab>
        Advanced Editor
      </v-tab>

      <v-tab-item class="mt-2">
        <message-creator @change="quill = $event" :inputHTML="config.messageHTML"/>
      </v-tab-item>
      <v-tab-item class="mt-2">
        <advanced-message-creator @change="advanced = $event" :inputHTML="config.messageHTML"/>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import getConfig from '@/actions/getConfig';
  import { Config } from '@/types';
  import MessageCreator from '@/components/MessageCreator.vue';
  import AdvancedMessageCreator from '@/components/AdvancedMessageCreator.vue';

  @Component({
    components: {
      MessageCreator,
      AdvancedMessageCreator
    }
  })
  export default class Configuration extends Vue {
    config: Config = new Config();
    messageHTML = {
      quill: '',
      advanced: '',
    };
    editorTab = 0;
    subject = '';

    async mounted() {
      const config = await getConfig();
      if (config && !(config instanceof Error)) {
        this.config = config;
      } else {
        alert('Couldn\'t retrieve your config!');
      }
    }
  }
</script>