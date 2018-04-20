<template>
  <transition name="dialog-fade">
    <div class="sp-dialog__wrapper" v-show="visible">
      <div class="sp-dialog" :style="style">
        <div class="sp-dialog__header">
          <slot name="title">
            <span class="sp-dialog__title">{{ title }}</span>
          </slot>
          <i class="iconfont icon-close" @click="handleclose"></i>
        </div>
        <div class="sp-dialog__body">
          <slot></slot>
        </div>
        <div class="sp-dialog__footer" v-show="footer">
          <slot name="footer"></slot>
        </div>
      </div>
      <div class="v-modal" ref="modal" :class="{'v-modal-leave': !visible}" @click="handleModalClose"></div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "sp-dialog",
  props: {
    title: {
      type: String,
      default: ""
    },
    visible: {
      type: Boolean,
      default: false
    },
    footer: {
      type: Boolean,
      default: false
    },
    shadeClose: {
      //是否点击遮罩关闭
      type: Boolean,
      default: true
    },
    width: String,
    top: {
      type: String,
      default: "15vh"
    },
    scrollbar: {
      //是否允许浏览器出现滚动条
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  watch: {
    visible(val) {
      if (val) {
        this.$emit("open");
        if (this.scrollbar == false) {
          document.body.style.overflowY = "hidden";
          document.body.style.height = "100%";
        }
      } else {
        if (!this.scrollbar) {
          document.body.style.overflowY = "visible";
          document.body.style.height = "auto";
        }
      }
    }
  },
  computed: {
    style() {
      let style = {};
      this.width && (style.width = this.width);
      style.marginTop = this.top;
      return style;
    }
  },
  methods: {
    handleclose(cancel) {
      if (cancel !== false) {
        this.$emit("update:visible", false);
        this.$emit("close");
      }
    },
    //是否点击遮罩关闭
    handleModalClose() {
      this.shadeClose && this.handleclose();
    }
  }
};
</script>
<style lang="scss" scoped>
.sp-dialog__wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1998;
}

.sp-dialog {
  position: relative;
  margin: 0 auto 50px;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  width: 40%;
  z-index: 2000;
}

.sp-dialog__header {
  padding: 20px;
  padding-bottom: 10px;
}
.sp-dialog__title {
  line-height: 24px;
  font-size: 18px;
  color: #303133;
}

.icon-close {
  position: absolute;
  top: 18px;
  right: 20px;
  font-size: 22px;
  font-weight: bold;
  color: #999;
  cursor: pointer;
  &:hover {
    color: #15a6bb;
  }
}

.sp-dialog__body {
  padding: 30px 20px;
  color: #606266;
  line-height: 24px;
  font-size: 14px;
}

.sp-dialog__footer {
  padding: 20px;
  padding-top: 10px;
}

.v-modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  background: #000;
  z-index: 1999;
}

.dialog-fade-enter-active {
  animation: dialog-enter ease 0.3s;
}

.dialog-fade-leave-active {
  animation: dialog-leave ease 0.3s;
}

@keyframes dialog-enter {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes dialog-leave {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
}
.v-modal {
  animation: opcity-enter ease 0.3s;
}

.v-modal-leave {
  animation: opcity-leave ease 0.3s;
}

@keyframes opcity-enter {
  from {
    opacity: 0;
  }
  to {
    opacity: 0.5;
  }
}

@keyframes opcity-leave {
  from {
    opacity: 0.5;
  }
  to {
    opacity: 0;
  }
}
</style>