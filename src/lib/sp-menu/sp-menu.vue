<template>
  <ul :style="{'background-color': backgroundColor}" :class="{ 'sp-menu-small': menuStatus == false}">
    <li class="sp-menu" v-for="menu in menus" :key="menu.id">
      <div class="sp-title" :class="{active: menu.active == true, 'sp-arrow': menu.children}" @click="callBack(menu)" :style="{'padding-left': pdleft(menu),'color': menuColor,'border-color': menuColor}">
        <div class="bg-hove" :style="{'background-color': hoverBgColor}"></div>
        <i class="iconfont" v-show="menu.icon" :class="[menu.icon]"></i>
        <router-link v-if="router == true && menu.url" :to="menu.url" :class="{crrut: crru == menu.id}" @click.native="aActive(menu.id)" :style="{'color': menuColor}">{{ menu.name }}</router-link>
        <a v-if="router == false && menu.url" :href="menu.url" :class="{crrut: crrutFor == menu.id}" @click="aActive(menu.id)" :style="{'color': menuColor}">{{ menu.name }}</a>
        <span v-if="router == false && !menu.url" :href="menu.url" :style="{'color': menuColor}">{{ menu.name }}</span>
      </div>
      <sp-collapse-transition>
        <sp-menu v-show="menu.active == true" :menus="menu.children" :crrutFor="crru" @change="getCrrutID" :menuWidth="menuWidth" :menuStatus="menuStatus" :style="{'width': menuWidth[1], 'z-index': zIndex(menu)}"/>
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
        default: '#222'
      },
      hoverBgColor: {//hove背景颜色
        type: String,
        default: '#000'
      },
      menuColor: {//字体颜色
        type: String,
        default: '#fff'
      },
      activeMenuColor: {//选中字体颜色
        type: String,
        default: '#15A6BB'
      },
      accordion: {//是否开启手风琴模式
        type: Boolean,
        default: false
      },
      menuWidth: {//menu宽度
        type: Array,
        default: function() {
          return ['40px', '200px']
        },
      },
      menuStatus: {//是否是展开状态
        type: Boolean,
        default: true
      },
      router: {//是否使用router
        type: Boolean,
        default: false
      },
      crrutFor: {//选中字体颜色
        type: String,
        default: ''
      },
    },
    data() {
      return {
        crru: this.crrutFor
      }
    },
    methods:{
      //menu收缩展开
      callBack(menu) {
        if(menu.children && this.menuStatus == true){
          menu.active = !menu.active
          if(this.accordion == false) {//手风琴
            let l = this.menus.length
            for (let i = 0; i < l; i++) {
              if(menu.active == true) {
                if(this.menus[i].id != menu.id) {
                  this.menus[i].active = false
                }
              }
            }
          }
        }else return;
      },
      //层级padding-left
      pdleft(menu) {
        let l = menu.id.split('-').length
        return l*10 + 10 +'px'
      },
      zIndex(menu) {
        let l = menu.id.split('-').length
        return 1000 - l*2
      },
      aActive(id) {
        // if(this.crrutFor) {
          // this.crrutFor == id
        // }else {
          // this.crrutFor = id
        // }
        // console.log(id)
        this.$emit('change', id)
      },
      getCrrutID(val) {
        this.crru = val
        // console.log('>>>'+this.crru)
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
    height: 36px;
    line-height: 36px;
    font-size: 14px;
    padding: 0 20px;
    z-index: 0;
    cursor: pointer;
    position: relative;
    transition: border-color .3s,background-color .3s,color .3s;
    box-sizing: border-box;
    white-space: nowrap;
    a{
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
      transition: all .1s ease;
    }
    &:hover{
      .bg-hove{
        opacity: 1;
      }
      a, span, i{
        opacity: 1;
      }
    }
    &:active{
      color: #15A6BB;
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
      top: 11px;
      right: 15px;
      opacity: .7;
      transform: rotate(-45deg);
      transition: transform .3s ease-out,top .3s ease-out;
    }
    //css3下拉箭头动画
    &.active{
      &:after {
        transform: rotate(-225deg);
        top: 15px;
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