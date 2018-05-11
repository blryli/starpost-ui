<template>
  <div class="sp-hover">
    <button type="button" ref="btn" class="sp-hover__button" :data-text="text" :class="sizeClass" :style="{backgroundColor: bgColor,'--hoverColor': hoverColor}" @mousemove="handleMove($event)">
      <span>
        <slot></slot>
      </span>
    </button>
  </div>
</template>
<script>
export default {
  name: "sp-hover-button",
  props: {
    text: {
      type: String,
      default: "Hover me I`m awesome"
    },
    bgColor: {
      type: String,
      default: "#f72359"
    },
    hoverColor: {
      type: String,
      default: "#4405f7"
    },
    size: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  watch: {},
  computed: {
    sizeClass() {
      return this.size === "log"
        ? "sp-hover__log"
        : this.size === "small"
          ? "sp-hover__small"
          : this.size === "mini" ? "sp-hover__mini" : "sp-hover__default";
    }
  },
  methods: {
    handleMove(e) {
      const x = e.pageX - e.target.offsetLeft;
      const y = e.pageY - e.target.offsetTop;
      e.target.style.setProperty("--x", `${x}px`);
      e.target.style.setProperty("--y", `${y}px`);
    }
  }
};
</script>
<style lang="scss" scoped>
.sp-hover__button {
  position: relative;
  padding: 18px 36px;
  border: none;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  outline: none;
  overflow: hidden;
  border-radius: 100px;

  &::after {
    content: attr(data-text);
    position: relative;
  }

  &.sp-hover__log {
    padding: 20px 40px;
  }

  &.sp-hover__default {
    padding: 16px 32px;
  }

  &.sp-hover__small {
    padding: 10px 20px;
    font-size: 14px;
    &:hover::before {
      --size: 200px;
    }
  }

  &.sp-hover__mini {
    padding: 6px 12px;
    font-size: 12px;
    &:hover::before {
      --size: 200px;
    }
  }

  span {
    position: relative;
  }

  &::before {
    --size: 0;
    content: "";
    position: absolute;
    left: var(--x);
    top: var(--y);
    width: var(--size);
    height: var(--size);
    background: radial-gradient(
      circle closest-side,
      var(--hoverColor),
      transparent
    );
    transform: translate(-50%, -50%);
    transition: width 0.2s ease, height 0.2s ease;
  }

  &:hover::before {
    --size: 300px;
  }
}
</style>