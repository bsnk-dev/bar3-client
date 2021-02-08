<template>
  <div v-if="value">
    <template v-if="$vuetify.breakpoint.mobile">
      <bottom-sheet
        v-model="bottomSheetState"
        v-if="bottomSheetState != 'close'"
      >
        <v-card-title>
          Test Your Message
        </v-card-title>
        <v-card-text>
          <div class="mt-2 mb-4">
            Send your message to someone you know to see how it turns out.
            You can't send it to yourself.
          </div>
          <v-text-field
            label="Nation ID"
            type="number"
            class="mt-2 mb-2"
            outlined
            v-model="nationDetails.nationID"
          />
          <v-text-field
            label="Nation Name"
            class="mt-2 mb-2"
            outlined
            v-model="nationDetails.nationName"
          />
          <v-text-field
            label="Leader Name"
            class="mt-2 mb-2"
            outlined
            v-model="nationDetails.leaderName"
          />
          <div class="d-flex">
            <v-btn
              class="ml-auto"
              color="primary"
              depressed
              dark
              @click="send()"
            >
              Send
            </v-btn>
          </div>
        </v-card-text>
      </bottom-sheet>
    </template>
    <template v-else>
      <v-dialog
        v-model="isShowing"
        width="500"
      >
        <v-card>
          <v-card-title>
            Test Your Message
          </v-card-title>
          <v-card-text>
            <div class="mt-2 mb-4">
              Send your message to someone you know to see how it turns out.
              You can't send it to yourself.
            </div>
            <v-text-field
              label="Nation ID"
              type="number"
              class="mt-2 mb-2"
              outlined
              v-model="nationDetails.nationID"
            />
            <v-text-field
              label="Nation Name"
              class="mt-2 mb-2"
              outlined
              v-model="nationDetails.nationName"
            />
            <v-text-field
              label="Leader Name"
              class="mt-2 mb-2"
              outlined
              v-model="nationDetails.leaderName"
            />
            <div class="d-flex">
              <v-btn
                class="ml-auto"
                color="primary"
                depressed
                dark
                @click="send()"
              >
                Send
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-dialog>
    </template>
  </div>
</template>

<script lang="ts">
  import {Component, Vue, Prop, Watch} from 'vue-property-decorator';
  import BottomSheet from '@/components/BottomSheet.vue';

  @Component({
    components: {
      BottomSheet
    }
  })
  export default class TestMessageDialog extends Vue {
    isShowing = false;
    bottomSheetState = 'close';
    nationDetails = {
      nationID: 0,
      nationName: 'TestNationName',
      leaderName: 'TestLeaderName'
    }

    @Prop(Boolean) value!: boolean;
    @Prop(Boolean) disabled!: boolean;

    mounted() {
      this.isShowing = this.value;
      if (this.value) this.bottomSheetState = 'open';
    }

    get config() {
      return this.$store.getters.config;
    }

    send() {
      this.$emit('send', this.nationDetails);
    }

    @Watch('value')
    valueChanged(val: boolean) {
      this.isShowing = val;
      if (this.value) this.bottomSheetState = 'open';
    }

    @Watch('isShowing')
    isShowingChanged(val: boolean) {
      this.$emit('input', val); 
    }

    @Watch('bottomSheetState')
    bottomSheetStateChanged(val: string) {
      if (val == 'close') {
        this.$emit('input', false);
      }
    }
  }
</script>