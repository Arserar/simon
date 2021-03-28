<template>
  <div class="difficulty">
    <div v-for="difficulty in difficulties" :key="difficulty">
      <input
        type="radio"
        :id="difficulty"
        :value="difficulty"
        v-model="currentDifficulty"
        @change="change"
      />
      <label :for="difficulty">{{ difficulty }}</label>
    </div>
  </div>
</template>

<script>
export default {
  name: "difficulty",
  props: {
    difficulty: {
      type: String,
      required: true,
    },
    difficulties: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentDifficulty: this.difficulty,
    };
  },
  methods: {
    change() {
      this.$emit("change-difficulty", this.currentDifficulty);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.difficulty {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
</style>
