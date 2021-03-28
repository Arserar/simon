<template>
  <div class="light" :style="{ backgroundColor: bg }"></div>
</template>

<script>
export default {
  name: "light",
  props: {
    bg: {
      type: String,
      required: true,
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$light-size: 80px;

.light {
  width: $light-size;
  height: $light-size;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    box-shadow: 0 5px 5px 0 #999;
  }
}
</style>
