<template>
  <ul :class="{ 'sp-menu-small': menuStatus == false}">
    <li class="sp-menu" v-for="menu in menus" :key="menu.id" :style="{'background-color': backgroundColor}">
      <div class="sp-title" :class="{active: menu.active, 'sp-arrow': menu.children}" @click="callBack(menu)" 
      :style="{'padding-left': pdleft(menu),'color': activeMenuColor[0] && selectId == menu.id ? activeMenuColor[1] : menuColor, 'backgroundColor': selectId == menu.id ? hoverBgColor : backgroundColor, 'height': height, 'line-height':height}">
        <div class="bg-hove" :style="{'background-color': hoverBgColor}"></div>
        <i class="iconfont" v-if="menu.icon" :class="[menu.icon]"></i>
        <router-link v-if="router == true && menu.url" :to="menu.url" :style="{'color': activeMenuColor[0] && selectId == menu.id ? activeMenuColor[1] : menuColor}">{{ menu.name }}</router-link>
        <a v-if="router == false && menu.url" :href="menu.url" :style="{'color': activeMenuColor[0] && selectId == menu.id ? activeMenuColor[1] : menuColor}">{{ menu.name }}</a>
        <span v-if="router == false && !menu.url" :href="menu.url">{{ menu.name }}</span>
      </div>
      <sp-collapse-transition>
        <sp-menu v-show="menu.active" :menus="menu.children" :selectId="selectId" @select-id="getSelectId" :Width="Width" :menuStatus="menuStatus" :style="{'width': Width, 'z-index': zIndex(menu)}"/>
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
        default: false
      },
      Width: {//menu宽度
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
      selectId: {//选中的ID
        type: String,
        default: ''
      }
    },
    data() {
      return {
      }
    },
    methods:{
      //是否是一级按钮
      isUpNav(menu) {
        return menu.id.split('-').length == 1
      },
      //menu收缩展开
      callBack(menu) {
        if(menu.children && this.menuStatus == true){
          menu.active = !menu.active;
          if(this.accordion == false) {//手风琴
            let l = this.menus.length;
            for (let i = 0; i < l; i++) {
              if(menu.active) {
                if(this.menus[i].id != menu.id) {
                  this.menus[i].active = false;
                  menu.id.split('-').length == 1 && this.menus[i].children && this.navToFalse(this.menus[i].children);
                }
              }
            }
          }
        }else {
          this.$emit('select-id', menu.id)
        }
      },
      //关闭失去激活状态的子菜单
      navToFalse(array) {
        for (let i = 0; i < array.length; i++) {
          array[i].active == true && (array[i].active = false);
          let arr = array[i].children;
          arr && this.navToFalse(arr);
        }
      },
      //层级padding-left
      pdleft(menu) {
        let l = menu.id.split('-').length;
        return l*10 + 10 +'px';
      },
      zIndex(menu) {
        let l = menu.id.split('-').length;
        return 1000 - l*2;
      },
      //选中的ID
      getSelectId(val) {
        this.$emit('select-id', val);
      }
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
    a, span{
      text-decoration: none;
      display: inline-block;
      width: 100%;
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
    margin-right: 6px;
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