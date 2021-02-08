

<template>
  <div class="view-small-inner-wrapper view-padding-inner-wrapper">
    <div class="d-flex align-center">
      <h1>Message Creator</h1>
      <v-btn
        outlined
        color="primary"
        class="ml-auto"
        @click="testDialog = true"
      >
        Test
      </v-btn>
    </div>
    <v-text-field
      dense
      outlined
      placeholder="Subject Line"
      v-model="subject"
      @change="changes()"
      class="mt-4 mb-4"
    />
    <div class="mt-2 mb-2">
      The editor allows you to easily create your own custom message. You can either choose between the Basic Editor with WYSIWYG controls,
      or the advanced editor with HTML and CSS. With both editors it is recommended you use the test button to try out sending a message before
      you turn on Bar 3 and send it to new nations. Finally, you can use two variables in your messages. Use <code>\(nation)</code> to substitute the
      nation name, and use <code>\(leader)</code> to substitute the leader name in your messages or subject line.
    </div>
    <v-tabs v-model="editorTab" class="mt-2" style="margin-bottom: 200px">
      <v-tab>
        Basic Editor
      </v-tab>
      <v-tab>
        Advanced Editor
      </v-tab>

      <v-tab-item class="mt-2">
        <message-creator 
          @change="messageHTML.quill = $event; changes()" 
          :inputHTML="config.messageHTML"
        />
      </v-tab-item>
      <v-tab-item class="mt-2">
        <advanced-message-creator 
          @change="messageHTML.advanced = $event; changes()" 
          :inputHTML="config.advancedRaw.html" 
          :inputCSS="config.advancedRaw.css" 
          @html="advancedRaw.html = $event; changes()"
          @css="advancedRaw.css = $event; changes()"
        />
      </v-tab-item>
    </v-tabs>
    <saved-changes-card
      v-model="saveChangesOpen"
      @save="save($event)"
    />
    <test-message-dialog v-model="testDialog" @send="testMessage($event)"/>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import getConfig from '@/actions/getConfig';
  import sendConfig from '@/actions/sendConfig';
  import { Config, DefaultConfig } from '@/types';
  import MessageCreator from '@/components/MessageCreator.vue';
  import AdvancedMessageCreator from '@/components/AdvancedMessageCreator.vue';
  import SavedChangesCard from '@/components/SavedChangesCard.vue';
  import TestMessageDialog from '@/components/TestMessageDialog.vue';
  import sendMessage from '@/actions/sendMessage';
  
  @Component({
    components: {
      MessageCreator,
      AdvancedMessageCreator,
      SavedChangesCard,
      TestMessageDialog
    }
  })
  export default class MessageDesigner extends Vue {
    config: Config = new DefaultConfig();
    messageHTML = {
      quill: '',
      advanced: '',
    };
    advancedRaw = {
      html: '',
      css: '',
    };
    editorTab = 0;
    subject = '';
    saveChangesOpen = false;
    error = false;
    testDialog = false;

    async mounted() {
      const config = await getConfig();
      if (config && !(config instanceof Error)) {
        this.advancedRaw.html = config?.advancedRaw?.html || '';
        this.advancedRaw.css = config?.advancedRaw?.css || '';
        this.messageHTML.quill = config.messageHTML || '';
        this.subject = config.messageSubject || '';
        this.config = config;
        this.changes();
      } else {
        alert('Couldn\'t retrieve your config!');
      }
    }

    changes() {
      if (this.editorTab == 0 && this.messageHTML.quill != this.config.messageHTML) {
        this.saveChangesOpen = true;
        return;
      } else if (this.editorTab == 1 && (this.advancedRaw.html != this.config.advancedRaw?.html || this.advancedRaw.css != this.config.advancedRaw.css)) {
        this.saveChangesOpen = true;
        return;
      } else if (this.subject != this.config.messageSubject) {
        this.saveChangesOpen = true;
        return;
      }

      this.saveChangesOpen = false;
    }

    async save() {
      const newConfig = {
        messageSubject: this.subject,
        messageHTML: (this.editorTab == 0) ? this.messageHTML.quill : this.messageHTML.advanced,
        advancedRaw: {
          html: this.advancedRaw.html,
          css: this.advancedRaw.css,
        },
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

    async testMessage(nationDetails: {nationName: string; nationID: string; leaderName: string}) {
      const success = await sendMessage((this.editorTab == 0) ? this.messageHTML.quill : this.messageHTML.advanced, nationDetails); 
      if (!success) alert('Couldn\'t send your message!');
    }
  }
</script>

<style>
  .save-changes-card {
    position: fixed;
    bottom: 50px;
    right: 50px;
    width: 300px;
  }

  @media only screen and (max-width: 450px) {
    .save-changes-card {
      width: calc(100% - 20px);
      right: 10px;
      left: 10px;
    }
  }
</style>

<style>
  .slideup-enter-active, .slideup-leave-active {
    transition: bottom 0.2s ease-out
  }
  .slideup-enter, .slideup-leave-to {
    bottom: -200px;
  }
</style>