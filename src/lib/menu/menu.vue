<template>
  <ul :class="{ 'sp-menu-small': !menuStatus }">
    <li class="sp-menu" v-if="menus" v-for="menu in menus" :key="menu.uid" :style="{'background-color': backgroundColor}">
      <div class="sp-title" :class="[{active: menu.active, 'sp-arrow': !menu.url}, {'is-active': selectId == menu.uid}]" @click="clickMenu(menu)" 
        :style="{'padding-left': menuStatus ? pdleft + 'px' : '','color': activeMenuColor[0] && selectId == menu.uid ? activeMenuColor[1] : menuColor, 'backgroundColor': selectId == menu.uid ? hoverBgColor : backgroundColor, 'height': height, 'line-height':height}">
        <div class="bg-hove" :style="{'background-color': hoverBgColor}"></div>
        <i class="iconfont" v-if="menu.icon" :class="menu.icon"></i>
        <span :class="{'is-hover': isHover(menu)}">{{ menu.label }}</span>
      </div>
      <sp-collapse-transition>
        <sp-menu v-show="menu.active" @select-id="getSelectId" @page-config="getPageConfig"  @open="menuOpen" @close="menuClose" 
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
        default: '1'
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
    created() {
      if(this.isUpNav) {
        !sessionStorage.selectId && (sessionStorage.selectId = selectId);
        this.muneSetId(this.menus);
        this.setHighlight(this.menus);
      }
    },
    watch: {
      menuStatus(val) {
        this.isUpNav && val && this.setHighlight(this.menus);
      }
    },
    computed: {
      //层级padding-left
      pdleft() {
        return this.paddingLeft + 20;
      }
    },
    methods:{
      //menu收缩展开
      clickMenu(menu) {
        let config = menu.configs ? menu.configs : [];
        if (!menu.url){
          if ( this.menuStatus) {
            menu.active = !menu.active;
            menu.active ? this.$emit('open', menu.uid) : this.$emit('close', menu.uid);
            this.handlerAccordion(menu);
          }
        } else {
          this.$emit('select-id', menu.uid);
          this.pagePermissions && this.$emit('page-config', config);
          sessionStorage.selectId = menu.uid;
          sessionStorage.configs = JSON.stringify(config);
          this.router ? this.$router.push(menu.url) : window.location.href = menu.url;
          // if(this.accordion) {//手风琴
          //   let l = this.menus.length;
          //   for (let i = 0; i < l; i++) {
          //     if(this.menus[i].uid != menu.uid) {
          //       this.menus[i].active = false;
          //       menu.uid.split('-').length == 1 && this.menus[i].children && this.navClose(this.menus[i].children);
          //     }
          //   }
          // }
        }
      },
      //初始化设置ID
      muneSetId(menus, id) {
        for (let i = 0; i < menus.length; i++) {
          id ? this.$set(menus[i], "uid", id + "-" + (i + 1)) : this.$set(menus[i], "uid", '' + parseInt(i + 1));
          if (menus[i].url && menus[i].children) {
            this.$set(menus[i], "checked", false);
            this.$set(menus[i], "configs", menus[i].children);
            menus[i].children = [];
          }
          menus[i].children && this.muneSetId(menus[i].children, menus[i].uid);
        }
      },
      //高亮展开
      setHighlight(menus) {
        if (sessionStorage.selectId) {
          this.$emit('select-id', sessionStorage.selectId);
          let activeArr = sessionStorage.selectId.split('-'),
            this_menu;
          for (let i = 0; i < activeArr.length - 1; i++) {
            if (this_menu) {
              this_menu.children[activeArr[i] - 1].active = true;
              this_menu = this_menu.children[activeArr[i] - 1];
            } else {
              menus[activeArr[i] - 1].active = true;
              this_menu = menus[activeArr[i] - 1];
            }
          }
        }
      },
      //手风琴
      handlerAccordion(menu) {
        let l = this.menus.length;
        if (this.accordion) {//手风琴
          for (let i = 0; i < l; i++) {
            if (menu.active) {
              if (this.menus[i].uid != menu.uid) {
                if (this.menus[i].active) {
                  this.menus[i].active = false;
                  this.$emit('close', this.menus[i].uid);
                }
                menu.uid.split('-').length == 1 && this.menus[i].children && this.navClose(this.menus[i].children);
              }
            }
          }
        }
      },
      //手风琴 关闭菜单
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
        let l = menu.uid.split('-').length;
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
      isHover(menu) {
        if(!this.menuStatus && this.isUpNav) {
          if(!menu.children || menu.children && !menu.children.length) return true;
          return false;
        }
        return false;
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
    span{
      text-decoration: none;
      display: inline-block;
    }
    span, i{
      position: relative;
      z-index: 5;
      opacity: .7;
      transition: opacity .1s ease;
    }
    .bg-hove{
      opacity: 0;
    }
    &:hover{
      .bg-hove{
        opacity: 1;
      }
      span, i{
        opacity: 1;
      }
      .is-hover{
        left: 6px;
        width: auto;
        padding: 0 10px;
        background-color: #2e323e;
        color: #fff;
        position: relative;
        z-index: 1000;
        &:before{
          content: '';
          position: absolute;
          left: -2px;
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
      span, i{
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
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.2);
      margin-left: 1px;
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
