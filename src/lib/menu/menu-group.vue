<template>
  <div class="sp-menu-group">
    <i class="sp-menu-icon" @click="change(menuStatus)"></i>
    <div class="sp-menu-container" :class="{crrut: menuStatus == true}"  :style="{width: menuStatus == true ? menuWidth[1] : menuWidth[0]}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sp-menu-group',
  props: {
    menuWidth: {
      type: Array,
      default: function() {
        return []
      },
    },
    menuStatus: {
      type: Boolean,
      default: true
    },
  },
  methods: {
  	change(menuStatus) {
  		this.$emit('update:menuStatus', !menuStatus)
  	}
  }
}
</script>

<style lang="scss" scoped>
.sp-menu-group{
  position: relative;
}
	.sp-menu-container{
    position: relative;
    z-index: 5;
		overflow: visible;
		transition: width .3s;
    &.crrut{
      overflow: hidden;
    }
	}
  .sp-menu-icon{
    position: relative;
    padding: 6px;
    display: inline-block;
    cursor: pointer;
    margin-bottom: 6px;
    color: #333;
    &:after{
      content: '';
      display: block;
      width: 24px;
      height: 3px;
      border-top: 3px solid #888;
      border-bottom: 3px solid #888;
      background-color: #888;
      padding: 4px 0;
      background-clip:content-box;
      box-sizing:content-box;
    }
  }
</style>