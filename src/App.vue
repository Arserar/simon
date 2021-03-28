<template>
  <difficulty
    :difficulties="difficulties"
    :difficulty="difficulty"
    @change-difficulty="changeDifficulty"
  ></difficulty>
  <traffic-light
    @end-to-play-sequence="state = 'waiting'"
    @make-step="makeStep"
    :sequence="sequence"
    :state="state"
  ></traffic-light>
  <hint :state="state" :lostLevel="lostLevel"></hint>
  <buttons
    :state="state"
    @start-game="startGame"
    @next-level="nextLevel"
  ></buttons>
</template>

<script>
import traffic_light from "./components/traffic_light.vue";
import difficulty from "./components/difficulty";
import buttons from "./components/buttons";
import hint from "./components/hint";
import { compareSequences, continueSequence } from "./components/utils";
import Hint from "./components/hint.vue";

export default {
  name: "App",
  components: {
    "traffic-light": traffic_light,
    difficulty,
    buttons,
    hint,
    Hint,
  },
  data() {
    return {
      difficulty: "easy",
      state: "start",
      sequence: [],
      steps: [],
      difficultyIntervals: [1500, 1000, 400],
      difficulties: ["easy", "normal", "hard"],
      lostLevel: 0,
    };
  },
  methods: {
    startGame() {
      const indexOfInterval = this.difficulties.indexOf(this.difficulty);
      this.sequence = [];
      this.steps = [];
      this.state = "start";
      this.updateSequence();
      this.emitter.emit(
        "play_sequence",
        this.difficultyIntervals[indexOfInterval]
      );
    },
    nextLevel() {
      const indexOfInterval = this.difficulties.indexOf(this.difficulty);
      this.steps = [];
      this.state = "start";
      this.updateSequence();
      this.emitter.emit(
        "play_sequence",
        this.difficultyIntervals[indexOfInterval]
      );
    },
    changeDifficulty(newDifficulty) {
      this.difficulty = newDifficulty;
      this.sequence = [];
      this.steps = [];
      this.state = "start";
    },
    updateSequence() {
      this.sequence = continueSequence(this.sequence);
    },
    makeStep(index) {
      this.steps.push(index);
      this.state = compareSequences(this.sequence, this.steps);
      if (this.state === "lose") this.lostLevel = this.steps.length;
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
}
</style>
