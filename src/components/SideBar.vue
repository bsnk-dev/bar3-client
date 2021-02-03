<template>
  <v-navigation-drawer
    :permanent="!['xs', 'sm'].includes($vuetify.breakpoint.name)"
    :temporary="['xs', 'sm'].includes($vuetify.breakpoint.name)"
    :hide-overlay="!['xs', 'sm'].includes($vuetify.breakpoint.name)"
    app
    v-model="isShowing"
    class="elevation-0"
  >
      <v-list-item style="height: 63px;">
        <div class="text-h5 mt-3 mb-3 font-weight-medium d-flex align-center grey--text text--darken-3" @click="$router.push({'path': '/'})">
          <v-img
            class="shrink mr-2"
            contain
            src="@/assets/bar3.png"
            transition="scale-transition"
            width="45"
          />
          <div class="ml-2"> 
            Bar 3
          </div>
        </div>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
        shaped
        class="pl-0"
      >
        <v-list-item-group
          v-model="selectedItem"
          color="primary"
        >
          <v-list-item
            v-for="item in items"
            :key="item.title"
            :disabled="disabled"
            @click="$router.push({'path': item.path})"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
</template>

<script lang="ts">
  import { SideBarItem } from '@/types';
import Vue from 'vue';
  import Component from "vue-class-component";
  import { Prop, Watch } from "vue-property-decorator";

  @Component
  export default class SideBar extends Vue {
    isShowing = false;
    items: SideBarItem[] = [
      {
        title: 'Dashboard',
        icon: 'mdi-view-dashboard',
        path: '/',
      },
      {
        title: 'Configuration',
        icon: 'mdi-cog',
        path: '/config',
      },
      {
        title: 'Message Creator',
        icon: 'mdi-email',
        path: '/message-creator',
      },
      {
        title: 'About',
        icon: 'mdi-information',
        path: '/about',
      },
      {
        title: 'Help',
        icon: 'mdi-help-circle',
        path: '/help',
      },
    ];

    selectedItem = 0;
    
    @Prop(Boolean) value!: boolean;
    @Prop(Boolean) disabled!: boolean;

    mounted() {
      this.isShowing = this.value;
    }

    @Watch('value')
    valueChanged(val: boolean) {
      this.isShowing = val;
    }

    @Watch('isShowing')
    isShowingChanged(val: boolean) {
      this.$emit('input', val); 
    }

    @Watch('$route.path', { immediate: true, deep: true })
    onPathChange(value: string) {
      let option;
      let index;
      for ([index, option] of Object.entries(this.items)) {
        if (option.path === value) {
          this.selectedItem = parseInt(index);
          break;
        }
      }
    }
  }
</script>