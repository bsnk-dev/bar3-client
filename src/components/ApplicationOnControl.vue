<template>
  <v-btn
    :color="applicationOn ? 'green' : 'red'"
    depressed
    :disabled="disabled"
    @click="toggleApplication()"
  >
    <v-icon
      left
    >
      mdi-power
    </v-icon>
    {{ applicationOn ? 'Turn Bar3 Off' : 'Turn Bar3 On' }}
  </v-btn>
</template>

<script lang="ts">
  import {Component, Vue, Prop} from 'vue-property-decorator';
  import setApplicationState from '@/actions/setApplicationState';

  @Component
  export default class ApplicationOnControl extends Vue {
    @Prop(Boolean) disabled!: boolean;

    get applicationOn() {
      return this.$store.getters.applicationOn;
    }

    toggleApplication() {
      this.$store.commit('setApplicationState', !this.applicationOn);
      setApplicationState(this.applicationOn);
    }
  }
</script>