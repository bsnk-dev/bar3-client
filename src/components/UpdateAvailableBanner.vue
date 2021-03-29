<template>
    <v-alert
      text
      type="info"
      v-if="update"
      prominent
      outlined
    >
      
      <v-row align="center">
        <v-col class="grow">
          <h3>Update</h3>
        </v-col>
        <v-col class="shrink d-flex">
          <v-btn
            :href="`https://github.com/bsnk-dev/bar3-server/releases/${update.name}`"
            :target="_blank"
            color="primary"
            depressed
            class="ml-auto"
          >
            Download
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="grow">
          Bar 3 {{ update.name }} is available for download. 
          It is recommended you update to the newest version to get the latest patches, 
          features, and security fixes.
        </v-col>
      </v-row>
    </v-alert>
</template>

<script lang="ts">
import {GitHubTag} from '@/types';
import {Component, Vue} from 'vue-property-decorator';

  @Component
  export default class UpdateAvailableBanner extends Vue {
    get update(): GitHubTag {
      return this.$store.getters.newUpdate;
    }
  }
</script>