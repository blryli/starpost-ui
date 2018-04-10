<template>
  <ul :class="{ 'sp-menu-small': !menuStatus }">
    <li class="sp-menu" v-if="menus" v-for="menu in menus" :key="menu.id" :style="{'background-color': backgroundColor}">
      <div class="sp-title" :class="[{active: menu.active, 'sp-arrow': menu.children && !menu.url}, {'is-active': selectId == menu.id}]" @click="clickMenu(menu)" 
      :style="{'padding-left': pdleft + 'px','color': activeMenuColor[0] && selectId == menu.id ? activeMenuColor[1] : menuColor, 'backgroundColor': selectId == menu.id ? hoverBgColor : backgroundColor, 'height': height, 'line-height':height}">
        <div class="bg-hove" :style="{'background-color': hoverBgColor}"></div>
        <i class="iconfont" v-if="menu.icon && menuStatus" :class="[menu.icon]"></i>
        <router-link v-if="router && menu.url" :to="menu.url" :style="{'color': activeMenuColor[0] && selectId == menu.id ? activeMenuColor[1] : menuColor}">
          <i class="iconfont" v-if="menu.icon && !menuStatus" :class="[menu.icon]"></i>
          <span :class="{'is-hover': !menuStatus && !menu.children && isUpNav}">{{ menu.name }}</span>
        </router-link>
        <a v-if="!router && menu.url" :href="menu.url" :style="{'color': activeMenuColor[0] && selectId == menu.id ? activeMenuColor[1] : menuColor}">
          <i class="iconfont" v-if="menu.icon && !menuStatus" :class="[menu.icon]"></i>
          <span :class="{'is-hover': !menuStatus && !menu.children && isUpNav}">{{ menu.name }}</span>
        </a>
        <span v-if="!menu.url"><i class="iconfont" v-if="menu.icon && !menuStatus" :class="[menu.icon]"></i>{{ menu.name }}</span>
      </div>
      <sp-collapse-transition>
        <sp-menu v-show="menu.children && menu.active" @select-id="getSelectId" @page-config="getPageConfig"  @open="menuOpen" @close="menuClose" 
          :menus="menu.children" 
          :backgroundColor="backgroundColor" 
          :hoverBgColor="hoverBgColor" 
          :menuColor="menuColor" 
          :activeMenuColor="activeMenuColor" 
          :accordion="accordion" 
          :width="width" 
          :height="height" 
          :menuStatus="menuStatus" 
          :router="router" 
          :selectId="selectId" 
          :isUpNav="false" 
          :paddingLeft="pdleft"
          :pagePermissions="pagePermissions"
        :style="{'width': width, 'z-index': zIndex(menu)}"/>
      </sp-collapse-transition>
    </li>
  </ul>
</template>

<script>
export default {
    name: 'sp-menu',
    props: {
      //菜单数组
      menus: {
        type: Array,
        default: function() {
          return []
        },
      },
      backgroundColor: {//背景颜色
        type: String,
        default: '#2e323e'
      },
      hoverBgColor: {//hove及选中背景颜色
        type: String,
        default: '#409eff'
      },
      menuColor: {//字体颜色
        type: String,
        default: '#fff'
      },
      activeMenuColor: {//选中改变字体颜色
        type: Array,
        default: function() {
          return [false, '#fff']
        }
      },
      accordion: {//是否开启手风琴模式
        type: Boolean,
        default: true
      },
      width: {//menu宽度
        type: String,
        default: '200px'
      },
      height: {//menu宽度
        type: String,
        default: '36px'
      },
      menuStatus: {//是否是展开状态
        type: Boolean,
        default: true
      },
      router: {//是否使用router
        type: Boolean,
        default: false
      },
      pagePermissions: {//是否开启页面权限功能
        type: Boolean,
        default: false
      },
      selectId: {//选中的ID
        type: String,
        default: ''
      },
      isUpNav: {//是否是一级按钮
        type: Boolean,
        default: true
      },
      paddingLeft: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
      }
    },
    computed: {
      //层级padding-left
      pdleft() {
        return this.paddingLeft + 20;
      },
    },
    methods:{
      //menu收缩展开
      clickMenu(menu) {
        if(menu.children){
          if( this.menuStatus) {
            menu.active = !menu.active;
            menu.active ? this.$emit('open', menu.id) : this.$emit('close', menu.id);
            if(this.accordion) {//手风琴
              let l = this.menus.length;
              for (let i = 0; i < l; i++) {
                if(menu.active) {
                  if(this.menus[i].id != menu.id) {
                    if(this.menus[i].active) {
                      this.menus[i].active = false;
                      this.$emit('close', this.menus[i].id);
                    }
                    menu.id.split('-').length == 1 && this.menus[i].children && this.navClose(this.menus[i].children);
                  }
                }
              }
            }
          }
        }else {
          let config = menu.configs ? menu.configs : [];
          this.$emit('select-id', menu.id);
          this.pagePermissions && this.$emit('page-config', config);
          sessionStorage.selectId = menu.id;
          sessionStorage.configs = JSON.stringify(config);
          // if(this.accordion) {//手风琴
          //   let l = this.menus.length;
          //   for (let i = 0; i < l; i++) {
          //     if(this.menus[i].id != menu.id) {
          //       this.menus[i].active = false;
          //       menu.id.split('-').length == 1 && this.menus[i].children && this.navClose(this.menus[i].children);
          //     }
          //   }
          // }
        }
      },
      //开启router下 刷新页面保持菜单激活状态
      navClose(array) {
        for (let i = 0; i < array.length; i++) {
          let arr = array[i].children;
          if(this.accordion) {}
          if(array[i].active == true) {
            array[i].active = false 
          }
          arr && this.navClose(arr);
        }
      },
      zIndex(menu) {
        let l = menu.id.split('-').length;
        return 1000 - l*2;
      },
      menuOpen(val) {
        this.$emit('open', val)
      },
      menuClose(val) {
        this.$emit('close', val);
      },
      //选中的ID
      getSelectId(val) {
        this.$emit('select-id', val);
      },
      //获取页面权限
      getPageConfig(val) {
        this.pagePermissions && this.$emit('page-config', val);
      },
    }
}
</script>

<style lang="scss" scoped>
@import '../../../static/icon-font/iconfont.css';
.bg-hove{
  position: absolute;
  height: 100%;
  left: 0;
  right: 0;
  z-index: 1;
}
.sp-menu{
  position: relative;
  .sp-title{
    font-size: 14px;
    padding: 0 20px;
    z-index: 0;
    cursor: pointer;
    position: relative;
    transition: border-color .3s,background-color .3s,color .3s;
    box-sizing: border-box;
    white-space: nowrap;
    a{
      width: 100%;
    }
    a, span{
      text-decoration: none;
      display: inline-block;
    }
    a, span, i{
      position: relative;
      z-index: 5;
    }
    .bg-hove{
      opacity: 0;
    }
    a, span, i{
      opacity: .7;
      transition: opacity .1s ease;
    }
    &:hover{
      .bg-hove{
        opacity: 1;
      }
      a, span, i{
        opacity: 1;
      }
      .is-hover{
        left: 10px;
        width: auto;
        padding: 0 10px;
        margin: 0 4px;
        background-color: #2e323e;
        position: relative;
        &:before{
          content: '';
          position: absolute;
          left: -4px;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 0;
          height: 0;
          border-top: 8px solid transparent;
          border-right: 8px solid #2e323e;
          border-bottom: 8px solid transparent;
        }
      }
    }
    &.is-active{
      a, span, i{
        opacity: 1;
      }
    }
  }
  //css下拉箭头
  .sp-arrow{
    &:after{
      content: '';
      display: block;
      width: 6px;
      height: 6px;
      border-left: 1px solid;
      border-bottom: 1px solid;
      position: absolute;
      z-index: 5;
      top: 38%;
      right: 15px;
      opacity: .7;
      transform: rotate(-45deg);
      transition: transform .3s ease-out,top .3s ease-out;
    }
    //css3下拉箭头动画
    &.active{
      &:after {
        transform: rotate(-225deg);
        top: 45%;
        transition: all .3s ease-in-out;
      }
    }
    &.hover{
      &:after {
        opacity: 1;
      }
    }
  }
}
.iconfont {
    vertical-align: middle;
    margin-right: 12px;
    font-size: 18px;
    width: 24px;
    text-align: center;
}
//菜单收缩基本样式
.sp-menu-small{
  >.sp-menu{
    overflow: hidden;
    >.sp-menu-small{
      display: none;
      transition: all .3s;
    }
    &:hover{
      overflow: visible;
      >.sp-menu-small{
        display: block !important;
      }
    }
    >ul{
      position: absolute;
      top: 0;
    }
    
  }
}
//菜单收缩  一级菜单隐藏元素
.sp-menu-group >.sp-menu-small{
  >.sp-menu{
    >.sp-title{
      padding: 0 12px !important;
    }
    >.sp-arrow:after, >a, >span{
      display: none;
      opacity: 0;
    }
    ul{
      left: 100%;
    }
    .sp-arrow:after{
      transform: rotate(-135deg);
      top: 13px;
    }
  }
}

</style>