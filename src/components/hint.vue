<template>
  <div class="hint">
    <div v-if="state === 'waiting'">
      Please repeat after Simon to go to the next level.
    </div>
    <div v-else-if="state === 'lose'">
      Sorry, you lost after {{ lostLevel }} rounds! Wanna play again?
    </div>
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
    lostLevel: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hint {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  font-size: 1.2rem;
}
</style>
