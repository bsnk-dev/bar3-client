<template>
  <v-app>
    <v-app-bar
      app
      color="white"
      dark
      flat
    >
      <template v-if="['xs', 'sm'].includes($vuetify.breakpoint.name)">
        <v-app-bar-nav-icon light @click="sideBarOpen = true"/>
        <div
          class="d-flex align-center"
        >
          <v-img
            class="shrink mr-2"
            contain
            src="@/assets/bar3.png"
            transition="scale-transition"
            width="45"
          />
        </div>
      </template>
      
      <application-on-control :disabled="!setup" class="ml-auto"/>
    </v-app-bar>

    <side-bar v-model="sideBarOpen" :disabled="!setup"/>

    <v-main>
      <router-view v-if="setup" @refresh="getApplicationData()" @check-for-updates="checkForUpdates()">
      </router-view>
      <setup-card v-else v-model="setupCardOpen" @complete="getApplicationData()"/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import SideBar from '@/components/SideBar.vue';
import SetupCard from '@/components/SetupCard.vue'; // @ is an alias to /src
import ApplicationOnControl from '@/components/ApplicationOnControl.vue';
import checkForUpdates from '@/actions/checkForUpdates';

@Component({
  name: 'App',
  components: {
    SideBar,
    SetupCard,
    ApplicationOnControl
  }
})
export default class App extends Vue {
  sideBarOpen = false;
  setup = false;
  setupCardOpen = false;

  get serverIP() {
    return this.$store.getters.serverIP;
  }

  async getApplicationData() {
    const response = await fetch(`${this.serverIP}/api/appData`)
        .catch((e) => {
          console.error(e);
          alert('You aren\'t connected to the Bar 3 server. :\\');
        });

    if (!response) return;
    
    const json = await response.json().catch((e) => {
      console.error(e);
      alert('There is an issue in the Bar 3 server. :\\');
    });

    if (!json) return;

    this.setup = json.isSetup;
    this.$store.commit('setApplicationState', json.applicationOn);
    this.$store.commit('setSentMessages', json.sentMessages);
    this.$store.commit('setAPIDetails', json.apiDetails);
    this.$store.commit('setLastRefreshed', Date.now());

    if (!this.setup) {
      this.setupCardOpen = true;
    }
  }

  timeoutGetApplicationData() {
    setTimeout(() => {
      this.timeoutGetApplicationData();
      this.getApplicationData();
    }, 30000);
  }

  async checkForUpdates() {
    const update = await checkForUpdates().catch((e) => {
      console.error(e);
      return null;
    });
    if (!update) return;
    
    this.$store.commit('setNewUpdate', update);
  }

  mounted() {
    this.getApplicationData();
    this.timeoutGetApplicationData();
    this.checkForUpdates();
  }
}
</script>

<style>
  /*
    Import the app's standard styles
  */
  @import url('styles/viewStyle.css');

  /* 
    This adds the cool outlined functionality
  */
  .v-toolbar__content {
    border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
  }
</style>