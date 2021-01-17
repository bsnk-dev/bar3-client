<template>
  <v-dialog v-model="isShowing" max-width="1000px" max-height="800px" persistent>
    <v-card class="setup-card">
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

          <v-stepper-items>
            <v-stepper-content step="1">
              <div class="d-flex flex-column">
                <v-img src="@/assets/bar3.png" class="ma-auto" width="30%"/>
                <h3 class="ma-auto" style="width: 60%; text-align: center">
                  Start using Bar 3 to get rich and customized messages sent to each new player of the game when they join.
                </h3>
                <v-btn
                  depressed
                  color="primary"
                  dark
                  x-large
                  class="ma-auto mt-8"
                  @click="page++"
                >
                  Continue
                </v-btn>
              </div>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-card
                class="mb-12"
                color="grey lighten-1"
                height="200px"
              ></v-card>

              <v-btn
                color="primary"
                @click="e1 = 3"
              >
                Continue
              </v-btn>

              <v-btn text>
                Cancel
              </v-btn>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-card
                class="mb-12"
                color="grey lighten-1"
                height="200px"
              ></v-card>

              <v-btn
                color="primary"
                @click="e1 = 1"
              >
                Continue
              </v-btn>

              <v-btn text>
                Cancel
              </v-btn>
            </v-stepper-content>
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

  @Component
  export default class SetupCard extends Vue {
    isShowing = false;
    page = 1;
    @Prop(Boolean) readonly value!: boolean;

    mounted() {
      this.isShowing = this.value;
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
</style>