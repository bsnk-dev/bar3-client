<template>
  <div class="home">
    <v-btn
      @click="setupCard = true"
    >
      Toggle Setup Card
    </v-btn>
    <setup-card v-model="setupCard"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SetupCard from '@/components/SetupCard.vue'; // @ is an alias to /src

@Component({
  components: {
    SetupCard,
  },
})
export default class Home extends Vue {
  setupCard = false;
}
</script>
