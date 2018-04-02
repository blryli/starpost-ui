<template>
  <div id="app">
    <h1>starpost-ui</h1>
    <h3>Img 图片详情</h3>
    <sp-img :urlArr="urlArr" @get-urlArr="getUrlArr" @active-index="getActiveIndex"></sp-img>
    <sp-img :urlArr="urlArr1" @get-urlArr="getUrlArr" @active-index="getActiveIndex"></sp-img>
    <sp-dialog :title="title" :visible.sync="visible">
      <sp-img-content :urlArr="spImgArr" :activeIndex="activeIndex" @active-index="getActiveIndex"></sp-img-content>
    </sp-dialog>

    <h3>menu 左侧菜单</h3>
    <div class="sp-menu-content">
      <sp-menu-group :menuWidth="['40px', '200px']" :menuStatus="status" @status-change="getStatus">
        <sp-menu :menus="menus" :menuStatus="status" :select-id="selectId" :pagePermissions="true" @select-id="getSelectId" @page-config="getPageConfig" @open="menuOpen" @close="menuClose"/>
      </sp-menu-group>
    </div>

    <h3>Checkbox 全选/复选框</h3>
    <sp-checkbox :checkboxAll="true" :checkedArr="checkArr" v-model.lazy="checkAlled" @change="getCheckArr">全选&nbsp;&nbsp;</sp-checkbox>
    <div v-for="(item, index) in checkArr" :key="index">
      <sp-checkbox v-model.lazy="item.checked" :checkedArr="checkArr" :checkAlled="checkAlled" @change="getCheckAlled">选项{{index}}</sp-checkbox>
    </div>

    <h3>Checkbox 单选/复选按钮</h3>
    <sp-checkbox-button :checkList="checkList" :checkValues="checkValues" @callback="getSaskStatus">状态</sp-checkbox-button>
    
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      status: true,
      selectId: '1',
      pageConfig: [],
      menus: [{
        id: '1',
        name: '一级 1',
        icon: 'icon-wutu',
        url:'javascript:;',
        configs: ['aaa', 'bbb', 'ccc']
      },{
        id: '2',
        name: '一级 2',
        active: false,
        icon: 'icon-wutu',
        children: [{
          id: '2-1',
          name: '二级 2-1',
          url:'javascript:;',
          configs: ['aaa', 'ccc']
        },{
          id: '2-2',
          name: '二级 2-2',
          active: false,
          children: [{
            id: '2-2-1',
            name: '三级 2-2-1',
            url:'javascript:;'
          },{
            id: '2-2-2',
            name: '三级 2-2-2',
            active: false,
            children: [{
              id: '2-2-2-1',
              name: '4级 2-2-2-1',
              url:'javascript:;'
            }]
          },{
            id: '2-2-3',
            name: '三级 2-2-3',
            active: false,
            children: [{
              id: '2-2-3-0',
              name: '4级 2-2-3-0',
              url:'javascript:;'
            }]
          }]
        }]
      },{
        id: '3',
        name: '一级 3',
        active: false,
        icon: 'icon-wutu',
        children: [{
          id: '3-1',
          name: '二级 3-1',
          active: false,
          children: [{
            id: '3-1-1',
            name: '三级 3-1-1',
            url:'javascript:;'
          },{
            id: '3-1-2',
            name: '三级 3-1-2',
            url:'javascript:;'
          }]
        }]
      }],
      name: '12',
      visible: false,
      title: '',
      spImgArr: [],
      activeIndex: null,//当前展示图片的index
      urlArr: [
        {src:'http://pic2.97uimg.com/58pic/19/69/83/38658PICuUm.jpg!w1200', title: '标题1'},
        {src:'http://pic2.97uimg.com/58pic/21/56/66/15D58PICHdR.jpg!w1200', title: '标题2'},
        {src:'http://pic2.97uimg.com/58pic/18/23/47/56r58PICHN3.jpg!w1200', title: '标题3'}
      ],
      urlArr1: [
        'http://pic2.97uimg.com/58pic/21/56/66/15D58PICHdR.jpg!w1200',
        // 'http://pic2.97uimg.com/58pic/18/23/47/56r58PICHN3.jpg!w1200'
      ],
      imgs2: [],
      checkAlled: false,
      checkArr: [
        { checked: false },
        { checked: false },
        { checked: false },
        { checked: false },
        { checked: false }
      ],
      checkValues: ['01'],
      checkList: [
        {
          id: '01',
          name: '已付款',
        },{
          id: '02',
          name: '已发货',
        },{
          id: '03',
          name: '已签收',
        },
      ],
    }
  },
  created() {
    this.menuSelectNode(this.menus);//刷新页面选中的菜单保持选中状态
  },
  methods: {
    getUrlArr(val) {
      this.visible = true;
      this.spImgArr != val && (this.spImgArr = val);
    },
    //图片组件获取当前index
    getActiveIndex(index) {
      this.activeIndex = index;
      this.$nextTick(function() {
        this.title = this.spImgArr.length > 0 && this.spImgArr[index].title ? this.spImgArr[index].title : '标题';
      })
      console.log('图片组件获取当前index: '+ index)
    },
    //单选/复选按钮
    getCheckArr(val){
        this.checkArr = val
        console.log('按钮数组:'+ JSON.stringify(this.checkArr))
    },
    getCheckAlled(val) {
        this.checkAlled = val
        console.log('按钮数组:'+ JSON.stringify(this.checkArr))
    },
    //单选/复选框
    getSaskStatus(val) {
      this.checkValues = val;
      console.log('单选/复选按钮 选中的值: '+val)
    },
    //菜单组件 是否展开
    getStatus(val) {
      this.status = val
      console.log('菜单组件 是否展开: '+val)
    },
    menuOpen(val) {
      console.log('菜单组件 打开的ID: '+val)
    },
    menuClose(val) {
      console.log('菜单组件 关闭的ID: '+val)
    },
    //菜单组件 是否展开
    getStatus(val) {
      this.status = val
      console.log('菜单组件 是否展开: '+val)
    },
    //菜单选中的ID
    getSelectId(val) {
      this.selectId = val
      console.log('选中的ID： '+ val)
    },
    //获取页面权限
    getPageConfig(val) {
      this.pageConfig = val
      console.log('获取页面权限： '+ JSON.stringify(val))
    },
  }
}
</script>

<style lang="scss">
html{box-sizing: border-box;}
*,*::before,*::after{
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}
#app{
  font-size: 14px;
  width: 400px;
  margin: 0 auto;
}
ul, li{
  margin: 0;
  padding: 0;
  list-style: none;
}
h3{
  margin-top: 40px;
  margin-bottom: 20px;
}
.sp-menu-content{
  width: 300px;
  border: 1px solid #ddd;
  padding: 20px;
  margin: 0 auto;
}
.sp-select-box{
  margin: 0 auto;
  padding: 20px;
}
</style>
