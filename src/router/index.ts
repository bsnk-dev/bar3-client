import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Configuration from '../views/Configuration.vue';
import MessageCreator from '../views/MessageCreator.vue';
import Help from '../views/Help.vue';
import Analytics from '../views/Analytics.vue';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/config',
    name: 'Configuration',
    component: Configuration
  },
  {
    path: '/message-creator',
    name: 'Message Creator',
    component: MessageCreator
  },
  {
    path: '/analytics',
    name: 'Analytics Dashboard',
    component: Analytics,
  },
  {
    path: '/help',
    name: 'Help',
    component: Help
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
