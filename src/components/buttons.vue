<template>
  <div class="buttons" :style="styles">
    <div v-if="state === 'start' || state === 'waiting'" @click="startGame">
      Start game
    </div>
    <template v-else-if="state === 'next'">
      <div @click="startGame">Start game</div>
      <div @click="nextLevel">Next level</div>
    </template>
    <div v-else @click="startGame">Play again</div>
  </div>
</template>

<script>
export default {
  name: "buttons",
  props: {
    state: {
      type: String,
      required: true,
    },
  },
  methods: {
    startGame() {
      this.$emit("start-game");
    },
    nextLevel() {
      this.$emit("next-level");
    },
  },
  computed: {
    styles() {
      const state = this.state;
      if (state === "start" || state === "lose" || state === "waiting") {
        return { justifyContent: "center" };
      } else return { justifyContent: "space-between" };
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$light-size: 80px;

.buttons {
  display: flex;
  justify-content: center;
  width: 250px;

  & > div {
    font-size: 1.2rem;
    color: #000;
    border: 2px solid #000;
    padding: 10px;
    border-radius: 10px;
    transition: background, color 0.5s ease;
    cursor: pointer;

    &:hover {
      color: #fff;
      background: #000;
    }
  }
}
</style>
