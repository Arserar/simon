<template>
  <div class="traffic-light">
    <div>
      <light
        v-for="(light, index) in lights.slice(0, 2)"
        :key="light.id"
        :bg="light.active ? light.activeBgColor : light.passiveBgColor"
        @mousedown="makeStep(index)"
      ></light>
    </div>
    <div>
      <light
        v-for="(light, index) in lights.slice(2, 4)"
        :key="light.id"
        :bg="light.active ? light.activeBgColor : light.passiveBgColor"
        @mousedown="makeStep(index + 2)"
      ></light>
    </div>
  </div>
</template>

<script>
import light from "./light";

export default {
  name: "traffic-light",
  props: {
    state: {
      type: String,
    },
    sequence: {
      type: Array,
    },
  },
  data() {
    return {
      lights: [
        {
          id: "blue",
          passiveBgColor: "#A9A9F5",
          activeBgColor: "#2E2EFE",
          active: false,
        },
        {
          id: "red",
          passiveBgColor: "#F5A9A9",
          activeBgColor: "#FE2E2E",
          active: false,
        },
        {
          id: "yellow",
          passiveBgColor: "#F2F5A9",
          activeBgColor: "#F7FE2E",
          active: false,
        },
        {
          id: "green",
          passiveBgColor: "#E1F5A9",
          activeBgColor: "#C8FE2E",
          active: false,
        },
      ],
      timeout: undefined,
    };
  },
  components: {
    light,
  },
  methods: {
    changeActivity(index) {
      const activity = !this.lights[index].active;
      const id = this.lights[index].id;
      this.lights[index].active = activity;
      if (activity) {
        const sound = new Audio(require(`../assets/sounds/${id}.mp3`));
        sound.play();
        setTimeout(
          function () {
            this.lights[index].active = !activity;
          }.bind(this),
          100
        );
      }
    },
    makeStep(index) {
      if (this.state === "waiting") {
        this.changeActivity(index);
        this.$emit("make-step", index);
      }
    },
  },
  mounted() {
    this.emitter.on(
      "play_sequence",
      function (interval) {
        if (this.timeout) {
          clearTimeout(this.timeout, interval);
          this.timeout = undefined;
        }
        let step = 0;
        const playSequenceStep = function () {
          this.changeActivity(this.sequence[step++]);
          this.timeout = setTimeout(playSequenceStep, interval);
          if (step === this.sequence.length) {
            clearTimeout(this.timeout, interval);
            this.timeout = undefined;
            this.$emit("end-to-play-sequence");
          }
        }.bind(this);
        this.timeout = setTimeout(playSequenceStep, 0);
      }.bind(this)
    );
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.traffic-light {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 170px;
  padding: 10px;
  border-radius: 10px;
  border: 3px solid #000;
  margin-bottom: 20px;

  & > div {
    display: flex;
    justify-content: space-between;

    &:nth-of-type(1) {
      margin-bottom: 10px;
    }
  }
}
</style>
