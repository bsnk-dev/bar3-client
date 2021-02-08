<template>
  <div class="wrapper" :data-open="state === 'open' ? 1 : 0" style="z-index: 150">
    <div class="bg"></div>
    <transition name="slideup-card">
      <div
        ref="card"
        class="card"
        :data-state="isMoving ? 'move' : state"
        :style="{ top: `${isMoving ? y : calcY()}px`, 'z-index': '150' }"
      >
        <div class="pan-area" ref="pan">
          <div class="bar" ref="bar" :style="{ backgroundColor: barColor }"></div>
        </div>
        <div class="contents">
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Hammer from 'hammerjs';

export default Vue.extend({
  name: 'bottom-sheet',

  props: {
    defaultState: {
      type: String,
      default: 'close',
    },

    barColor: {
      type: String,
      default: 'rgba(0, 0, 0, .3)',
    },

    value: {
      type: String,
      default: 'half',
    },

    minState: {
      type: String,
      default: 'close',
    },
  },

  data() {
    return {
      mc: null as HammerManager | null,
      y: 0,
      startY: 0,
      isMoving: false,
      state: this.defaultState,
      rect: {} as DOMRect,
      states: ['close', 'half', 'open'],
      openY: 0.1,
      halfY: 0.70,
    };
  },

  mounted() {
    window.onresize = () => {
      const card = this.$refs.card as Element;
      this.rect = card.getBoundingClientRect();
    };

    const card = this.$refs.card as Element;
    this.rect = card.getBoundingClientRect();

    this.mc = new Hammer(this.$refs.pan as HTMLElement);

    if (this.mc == null) {
      return;
    }
    this.mc.get('pan').set({direction: Hammer.DIRECTION_ALL});

    this.mc.on('panup pandown', (evt: HammerInput) => {
      this.y = evt.center.y - 16;
    });

    this.mc.on('panstart', (evt: HammerInput) => {
      this.startY = evt.center.y;
      this.isMoving = true;
    });

    this.mc.on('panend', (evt: HammerInput) => {
      this.isMoving = false;

      switch (this.state) {
        case 'close': // Added a close state on the condition to be able to swipe from closed to half/closed state.
        case 'half':
          if (this.state === 'close') {
            if (this.startY - evt.center.y > 120) {
              this.state = 'half';
            }
            if (this.startY - evt.center.y > 320) {
              this.state = 'open';
            }
            break;
          }
          if (this.startY - evt.center.y > 120) {
            this.state = 'open';
          }
          if (this.startY - evt.center.y < -50) {
            this.state = 'close';
          }
          break;
        case 'open':
          if (this.startY - evt.center.y < -120) {
            this.state = 'half';
          }
          break;
        default:
          this.state = 'half';
      }
      this.checkForMinState();
    });

    // init
    this.state = this.value;
    this.checkForMinState();
  },

  beforeDestroy() {
    if (this.mc != null) this.mc.destroy();
    window.onresize = null;
  },

  methods: {
    calcY() {
      switch (this.state) {
        case 'close':
          return this.rect.height;
        case 'open':
          return this.rect.height * this.openY;
        case 'half':
          return this.rect.height * this.halfY;
        default:
          return this.y;
      }
    },

    checkForMinState() {
      if (
        this.states.indexOf(this.state) < this.states.indexOf(this.minState)
      ) {
        this.state = this.minState;
      }
    },

    setState(state: string) {
      this.state = state;
    },
  },

  watch: {
    value(newState) {
      this.state = newState;
    },

    state(newState) {
      this.$emit('input', newState);
    },

    y(yVal) { // Fix for mobile getting stuck at very top without panend
      if (yVal <= -16) {
        this.state = 'open';
        this.isMoving = false;
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.wrapper[data-open="1"] {
  position: fixed;
  top: 0;
  left: 0;
}

.wrapper[data-open="1"] .bg {
  display: block;
  transition: all 0.3s;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
}

.card {
  width: 100vw;
  height: 100vh;
  bottom: 0;
  position: fixed;
  background: white;
  border-radius: 10px 10px 0 0;
  box-shadow: 0 -3px 4px rgba(0, 0, 0, 0.1);
  left: 0;
}

.card[data-state="half"],
.card[data-state="open"],
.card[data-state="close"] {
  transition: top 0.3s ease-out;
}

/*.card[data-state="close"] {
  box-shadow: none;
}*/

.bar {
  width: 45px;
  height: 8px;
  border-radius: 14px;
  margin: 0 auto;
  cursor: pointer;
}

.pan-area {
  top: 0;
  right: 0;
  left: 0;
  position: absolute;
  padding: 20px;
  padding-bottom: 50px;
  z-index: 98;
  .bar {
    &:hover {
      cursor: grab;
    }
    &:active {
      cursor: grabbing;
    }
  }
}


.card[data-state="close"] .pan-area {
  top: -60px !important ;
}

.contents {
  margin-top: 28px;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 100%;
  padding-bottom: calc(100vh * 0.2);
  box-sizing: border-box;
}
</style>

<style> 
  .slideup-card-enter-active, .slideup-card-leave-active {
    transition: bottom 1s ease !important;
  }
  .slideup-card-enter, .slideup-card-leave-to {
    bottom: -100vh !important;
  }
</style>