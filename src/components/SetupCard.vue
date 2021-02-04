<template>
  <v-dialog v-model="isShowing" max-width="1000px" max-height="800px" persistent style="height: 100vh" :fullscreen="$vuetify.breakpoint.mobile">
    <v-card>
      <v-card-title>
        Setup Bar 3
      </v-card-title>
      <v-card-text class="d-flex flex-column">
        <v-stepper v-model="page" class="elevation-0">
          <v-stepper-header class="elevation-0">
            <v-stepper-step
              :complete="page > 1"
              step="1"
            >
              Introduction
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
              :complete="page > 2"
              step="2"
            >
              API Details
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
              :complete="page > 3"
              step="3"
            >
              Your Message
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="4">
              You're Done
            </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items class="d-flex flex-column setup-card">
            <v-stepper-content step="1">
              <div class="d-flex flex-column">
                <v-img src="@/assets/bar3.png" class="ma-auto" width="30%"/>
                <h3 class="ma-auto small-block" style="text-align: center">
                  Start using Bar 3 to get rich and customized messages sent to each new player of the game when they join.
                </h3>
                <v-btn
                  depressed
                  color="primary"
                  dark
                  x-large
                  class="ma-auto mt-8"
                  @click="page = 2"
                >
                  Continue
                </v-btn>
              </div>
            </v-stepper-content>

            <v-stepper-content step="2">
              <div class="d-flex flex-column">
                <h2 class="mb-3">
                  API Details
                </h2>
                <article class="small-block">
                  To send messages Bar 3 requires your API key from Politics and War. 
                  To retrieve the key go to <a target="_blank" href="https://politicsandwar.com/account">the account page</a>.
                  Additionally, you need to set how often you want to check for new nations. Just set the minutes to update in the second box.
                </article>

                <v-text-field
                  label="API Key"
                  class="small-block mt-6"
                  outlined
                  v-model="setup.apiKey"
                />

                <v-text-field
                  label="Minutes to Update"
                  type="number"
                  class="small-block  mb-16"
                  outlined
                  v-model="setup.minutesToUpdate"
                />
              </div>
            </v-stepper-content>

            <v-stepper-content step="3">
              <div class="d-flex flex-column" style="overflow-y: auto; max-height: 600px">
                <h2 class="mb-3">
                  Your Message
                </h2>
                <article>
                  This is the message creator. It allows you to easily create rich messages or advanced messages. 
                  You can create a new message later, but you must create one before you can use Bar 3.
                  The advanced editor allows you to create html and css whilst previewing its result, 
                  it is important you test these in the real game using the test button.
                </article>

                <v-text-field
                  dense
                  outlined
                  placeholder="Subject Line"
                  v-model="setup.subjectLine"
                  class="mt-8"
                />

                <v-tabs v-model="editorTab" class="mt-2">
                  <v-tab>
                    Basic Editor
                  </v-tab>
                  <v-tab>
                    Advanced Editor
                  </v-tab>

                  <v-tab-item class="mt-2">
                    <message-creator @change="setup.quill = $event"/>
                  </v-tab-item>
                  <v-tab-item class="mt-2">
                    <advanced-message-creator @change="setup.advanced = $event" @html="setup.advancedRaw.html = $event" @css="setup.advancedRaw.css = $event"/>
                  </v-tab-item>
                </v-tabs>
              </div>
            </v-stepper-content>

            <v-stepper-content step="4">
              <div class="d-flex flex-column">
                <h2 class="mb-3 black--text">
                  You're Done! 🎉
                </h2>
                <article class="small-block">
                  You're done setting up Bar 3. The next screen to greet you will the dashboard, 
                  but you can use the menu on the left to navigate to the configuration to customize what you set up here.
                </article>
                <article class="small-block mt-3">
                  Please star the project on Github to show your support 😀. 
                  You can also share this application with anyone interested.
                </article>
                <h3 class="small-block mt-16">
                  Thanks for using Bar 3.
                </h3>
              </div>
            </v-stepper-content>

            <div class="ml-auto" v-if="page != 1">
              <v-btn 
                text
                @click="page--"
                class="mr-3"
              >
                Back
              </v-btn>

              <v-btn
                color="primary"
                @click="nextPage()"
                :disabled="!canGoToNextPage"
              >
                {{ (this.page == this.maxPage) ? 'Finish' : 'Continue' }}
              </v-btn>
            </div>
          </v-stepper-items>
        </v-stepper>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Watch, Prop} from 'vue-property-decorator';
  import MessageCreator from '@/components/MessageCreator.vue';
  import AdvancedMessageCreator from '@/components/AdvancedMessageCreator.vue';
  import sendConfig from '@/actions/sendConfig';

  @Component({
    components: {
      MessageCreator,
      AdvancedMessageCreator
    }
  })
  export default class SetupCard extends Vue {
    isShowing = false;
    page = 1;
    maxPage = 4;
    editorTab = 0;
    setup = {
      apiKey: '',
      subjectLine: '',
      quill: '',
      advanced: '',
      advancedRaw: {
        html: '',
        css: '',
      },
      minutesToUpdate: 3,
    };
    error = false; // TODO: Add error stopper

    @Prop(Boolean) readonly value!: boolean;

    mounted() {
      this.isShowing = this.value;
    }

    get canGoToNextPage() {
      if (this.page == 2) {
        if (!this.setup.apiKey || !this.setup.minutesToUpdate) return false;
      } else if (this.page == 3) {
        if ((!(this.setup.quill && this.editorTab == 0) && 
            !(this.setup.advanced && this.editorTab == 1)) ||
            !this.setup.subjectLine) {
              return false;
            }
      }

      return true;
    }

    nextPage() {
      if (!this.canGoToNextPage) return;
      if (this.page == this.maxPage) {
        this.complete();

        return;
      }

      this.page++;
    }

    complete() {
      this.isShowing = false;
      const res = sendConfig({
        apiKey: this.setup.apiKey,
        messageSubject: this.setup.subjectLine,
        messageHTML: (this.editorTab == 0) ? this.setup.quill : this.setup.advanced,
        advancedRaw: {
          html: this.setup.advancedRaw.html,
          css: this.setup.advancedRaw.css,
        },
        updatePeriodMilliseconds: this.setup.minutesToUpdate * 60000,
      }); // we are done, send the config to the app

      if (!res) {
        this.error = true;
        alert('Couldn\'t update config! Please try again and verify the server is running.');
      }

      this.$emit('complete');
    }
  
    @Watch('value')
    onValueChanged(val: boolean) {
      this.isShowing = val;
    }

    @Watch('isShowing')
    onIsShowingChanged(val: boolean) {
      this.$emit('input', val);
    }
  }
</script>

<style scoped>
  .setup-card {
    transition: height 2s ease;
  }

  .small-block {
    width: 60%;
    min-width: 300px;
    margin-left: auto !important;
    margin-right: auto !important;
  }
</style>