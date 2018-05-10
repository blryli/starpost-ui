<template>
  <div id="app">
    <h1>starpost-ui</h1>
    <h3>Img 图片</h3>
    <sp-img :urlArr="urlArr" @get-urlArr="getUrlArr" @active-index="getActiveIndex"></sp-img>
    <sp-img :urlArr="urlArr1" @get-urlArr="getUrlArr" @active-index="getActiveIndex"></sp-img>
    <sp-dialog :title="title" :visible.sync="visible">
      <sp-img-content :urlArr="spImgArr" :activeIndex="activeIndex" @active-index="getActiveIndex"></sp-img-content>
    </sp-dialog>

    <h3>Menu 菜单(无限循环)</h3>
    <div class="sp-menu-content">
      <sp-menu-group :menuWidth="['40px', '200px']" :menuStatus.sync="menuStatus">
        <sp-menu :menus="menus" :menuStatus="menuStatus" :select-id="selectId" pagePermissions @select-id="getSelectId" @page-config="getPageConfig" @open="menuOpen" @close="menuClose" />
      </sp-menu-group>
    </div>

    <h3>Transfer 穿梭框(拖动)</h3>
    <sp-transfer :data="transferData" @clear="clear" :callbakData.sync="callbakData" :title="['列表1', '列表2']" />

    <h3>Amap 地图(高德)</h3>
    <sp-amap @get-map-form="getMapForm" :markers="markers" @get-geocoder="getGeocoder"></sp-amap>

    <h3>CheckBox 全选/复选框</h3>
    <sp-checkbox :checkboxAll="true" :checkedArr="checkArr" v-model.lazy="checkAlled" @change="getCheckArr">全选&nbsp;&nbsp;</sp-checkbox>
    <div v-for="(item, index) in checkArr" :key="index">
      <sp-checkbox v-model.lazy="item.checked" :checkedArr="checkArr" :checkAlled="checkAlled" @change="getCheckAlled">选项{{index}}</sp-checkbox>
    </div>

    <h3>Checkbox 单选/复选按钮</h3>
    <sp-checkbox-button :checkList="checkList" :checkValues="checkValues" @callback="getSaskStatus">状态</sp-checkbox-button>

    <h3>DataPicker 日期组件</h3>
    <sp-date-picker :data="datePicker" />

  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      datePicker: [
        {
          data: "2018-01-09",
          money: 28,
          par: 35,
          count: 2200,
          more: true,
          hot: true,
          unit: "kg",
          time: "20-25"
        },
        {
          data: "2018-01-10",
          money: 20,
          par: 22,
          count: 1900,
          more: false,
          hot: false,
          unit: "cbm",
          time: "20-25"
        }
      ],
      //穿梭框
      transferData: [
        { id: 1, label: "item1" },
        { id: 2, label: "item2" },
        { id: 3, label: "item3" },
        { id: 4, label: "item4" },
        { id: 5, label: "item5" }
      ],
      callbakData: [],
      number: 0,
      //地图
      markers: [
        {
          title: "【东莞仓】",
          position: [113.753228, 22.9833],
          address: "广东省东莞市南城街道东骏豪苑(东骏路)",
          name: "blry",
          phone: "13713262222"
        },
        {
          title: "【龙岗仓】",
          position: [114.234824, 22.723301],
          address: "广东省深圳市龙岗区龙城街道宏兴苑",
          name: "blry",
          phone: "13713263333"
        },
        {
          title: "【坂田仓】",
          position: [114.07314, 22.62579],
          address: "广东省深圳市龙岗区坂田第三工业区二栋一楼",
          name: "blry",
          phone: "13713261111"
        }
      ],
      //菜单
      menuStatus: true,
      selectId: "1",
      pageConfig: [],
      menus: [
        {
          label: "一级 1",
          icon: "icon-wutu",
          url: "javascript:;",
          children: ["aaa", "bbb", "ccc"]
        },
        {
          label: "一级 1",
          icon: "icon-wutu",
          url: "javascript:;",
          children: ["aaa", "bbb", "ccc"]
        },
        {
          label: "一级 2",
          active: false,
          icon: "icon-wutu",
          children: [
            {
              label: "二级 2-1",
              url: "javascript:;",
              children: ["aaa", "ccc"]
            },
            {
              label: "二级 2-2",
              active: false,
              children: [
                {
                  label: "三级 2-2-1",
                  url: "javascript:;"
                },
                {
                  label: "三级 2-2-2",
                  active: false,
                  children: [
                    {
                      label: "4级 2-2-2-1",
                      url: "javascript:;"
                    }
                  ]
                },
                {
                  label: "三级 2-2-3",
                  active: false,
                  children: [
                    {
                      label: "4级 2-2-3-0",
                      url: "javascript:;"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          label: "一级 3",
          active: false,
          icon: "icon-wutu",
          children: [
            {
              label: "二级 3-1",
              active: false,
              children: [
                {
                  label: "三级 3-1-1",
                  url: "javascript:;"
                },
                {
                  label: "三级 3-1-2",
                  url: "javascript:;"
                }
              ]
            }
          ]
        }
      ],
      //图片
      name: "12",
      visible: false,
      title: "",
      spImgArr: [],
      activeIndex: null, //当前展示图片的index
      urlArr: [
        {
          src: "http://pic2.97uimg.com/58pic/19/69/83/38658PICuUm.jpg!w1200",
          title: "标题1"
        },
        {
          src: "http://pic2.97uimg.com/58pic/21/56/66/15D58PICHdR.jpg!w1200",
          title: "标题2"
        },
        {
          src: "http://pic2.97uimg.com/58pic/18/23/47/56r58PICHN3.jpg!w1200",
          title: "标题3"
        }
      ],
      urlArr1: [
        "http://pic2.97uimg.com/58pic/21/56/66/15D58PICHdR.jpg!w1200"
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
      checkValues: ["01"],
      checkList: [
        {
          id: "01",
          name: "已付款"
        },
        {
          id: "02",
          name: "已发货"
        },
        {
          id: "03",
          name: "已签收"
        }
      ]
    };
  },
  created() {
  },
  watch: {
    callbakData(val) {
      console.log("穿梭框数组：" + JSON.stringify(val));
    }
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
        this.title =
          this.spImgArr.length > 0 && this.spImgArr[index].title
            ? this.spImgArr[index].title
            : "标题";
      });
      console.log("图片组件获取当前index: " + index);
    },
    //单选/复选按钮
    getCheckArr(val) {
      this.checkArr = val;
      console.log("按钮数组:" + JSON.stringify(this.checkArr));
    },
    getCheckAlled(val) {
      this.checkAlled = val;
      console.log("按钮数组:" + JSON.stringify(this.checkArr));
    },
    //单选/复选框
    getSaskStatus(val) {
      this.checkValues = val;
      console.log("单选/复选按钮 选中的值: " + val);
    },
    menuOpen(val) {
      console.log("菜单组件 打开的ID: " + val);
    },
    menuClose(val) {
      console.log("菜单组件 关闭的ID: " + val);
    },
    //菜单选中的ID
    getSelectId(val) {
      this.selectId = val;
      console.log("选中的ID： " + val);
    },
    //获取页面权限
    getPageConfig(val) {
      this.pageConfig = val;
      console.log("获取页面权限： " + JSON.stringify(val));
    },
    //高德地图返回数据
    getMapForm(val) {
      console.log("选择仓库： " + JSON.stringify(val));
    },
    //获取经纬度：
    getGeocoder(val) {
      console.log("获取经纬度： " + JSON.stringify(val));
    },
    //穿梭框
    clear() {
      console.log("清空穿梭框");
    }
  }
};
</script>

<style lang="scss">
html {
  box-sizing: border-box;
}
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}
#app {
  font-size: 14px;
  width: 60%;
  margin: 0 auto;
}
ul,
li {
  margin: 0;
  padding: 0;
  list-style: none;
}
h3 {
  margin-top: 40px;
  margin-bottom: 20px;
}
.sp-select-box {
  margin: 0 auto;
  padding: 20px;
}
input {
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 30px;
  line-height: 30px;
  outline: none;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 120px;
  margin-bottom: 10px;
}
</style>
