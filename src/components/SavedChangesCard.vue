<template>
  <transition name="slideup">
    <v-card class="save-changes-card elevation-5" v-if="value">
      <v-card-title>
        Save Your Changes
      </v-card-title>
      <v-card-text>
        <v-btn
          depressed
          block
          color="primary"
          @click="save()"
        >
          <v-icon
            left
          >
            mdi-check
          </v-icon>
          Save
        </v-btn>
      </v-card-text>
    </v-card>
  </transition>
</template>

<script lang="ts">
  import {Component, Prop, Watch, Vue} from 'vue-property-decorator';

  @Component
  export default class SavedChangesCard extends Vue {
    @Prop(Boolean) value!: boolean;

    @Watch('value')
    valueChanged(value: boolean) {
      this.value = value;
    }

    save() {
      this.$emit('save');
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

  .slideup-enter-active, .slideup-leave-active {
    transition: bottom 0.2s ease-out
  }
  .slideup-enter, .slideup-leave-to {
    bottom: -200px;
  }
</style>