# starpost-ui

> A Vue2.0 UI Components for Web.


## 项目演示

[演示地址](https://blryli.github.io/starpost-ui/)

## 安装

``` Bash
npm install starpost-ui -S
```

## 使用

```js
//ES6
import starpostUI from 'starpost-ui.js'

// require
var starpostUI = require('Starpost')

Vue.use(starpostUI)

// 或者直接使用script导入
<script src="https://unpkg.com/starpost-ui/dist/starpost-ui.js"></script>
```



## sp-img 组件

```html
<sp-img :urlArr="urlArr" @get-urlArr="getUrlArr" @active-index="getActiveIndex"></sp-img>

<sp-img :urlArr="urlArr1" @get-urlArr="getUrlArr" @active-index="getActiveIndex"></sp-img>
<sp-dialog :title="title" :visible.sync="visible">
  <sp-img-content :urlArr="spImgArr" :activeIndex="activeIndex" @active-index="getActiveIndex"></sp-img-content>
</sp-dialog>
```

```js
<script>
export default {
  data () {
    return {
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
    }
  }
}
</script>
```


### sp-dialo gAttribute

|    name    |    Description   |   type   |default|
| -----------------  | ---------------- | :--------: | :----------: |
| title       | 标题 |String| ''
| visible        | 是否打开 | Boolean| false
| width        | 弹窗宽度 | String| --
| top        | 顶部距离 | String| '15vh'
| footer        | 弹窗底部是否显示 |Boolean | false
| scrollbar        | 是否允许浏览器出现滚动条 |Boolean | false
| shadeClose        | 是否点击遮罩关闭 |Boolean | false

### sp-dialo Events

|  事件名 |    说明           |   参数      |
|-------- |------             |------       |
|open|打开时触发|--|
|close|关闭时触发|--|

### sp-img Attribute

|    name    |    Description   |   type   |default|
| -----------------  | ---------------- | :--------: | :----------: |
| urlArr       | 图片地址 |Array| []
| showOne        | 只展示第一张图片 |Boolean | false
| alignRow        | 横排展示 |Boolean | true
| imgSize        | 展示图片大小 |Array | [30, 30]

### sp-img Events

|  事件名 |    说明           |   参数      |
|-------- |------             |------       |
|active-index|图片打开/切换时触发|index值(当前index)|
|get-urlArr|图片打开/切换时触发|获取图片数组urlArr|

### sp-img-content Attribute

|    name    |    Description   |   type   |default|
| -----------------  | ---------------- | :--------: | :----------: |
| urlArr       | 图片数组 |Array| []
| smallImgShow        | 是否展示缩略图 | Boolean| true
| imgSize        | 缩略图图大小 | Array| [30, 30]
| defaultColor        | 弹窗缩略图边框颜色 | String| '#15A6BB'
| cutBoxShow        | 是否开启左右切换箭头 | Boolean| 'mouseenter'(可选'click')
| switchEvent        | 缩略图切换大图方式 |Boolean | false
| activeIndex        | 当前展示图片的index |Number | 0

### sp-img-content Events

|  事件名 |    说明           |   参数      |
|-------- |------             |------       |
|active-index|打开/切换时触发|index|




### 【全选/复选框】组件配置

```html
<sp-checkbox
	:checkboxAll="true"
	:checkedArr="checkArr"
	v-model="checkAlled"
	@change="getCheckArr">全选&nbsp;&nbsp;
</sp-checkbox>
<sp-checkbox-group v-for="(item, index) in checkArr">
    <sp-checkbox
	  	v-model="item.checked"
	  	:checkedArr="checkArr"
	  	:checkAlled="checkAlled"
	  	@change="getCheckAlled">选项{{index}}
    </sp-checkbox>
</sp-checkbox-group>
```

```js
<script>
export default {
  data () {
    return {
      checkAlled: false,
      checkArr: [
        { checked: false },
        { checked: false },
        { checked: false },
        { checked: false },
        { checked: false }
      ]
    }
  },
  methods: {
    getCheckArr(val){
        this.checkArr = val
    },
    getCheckAlled(val) {
        this.checkAlled = val
    }
  }
}
</script>
```


### Props

|    name    |    Description   |   type   |default|
| -----------------  | ---------------- | :--------: | :----------: |
| checkedArr       | checked数组 |Array| []
| checkboxAll        | 是否为全选按钮 |Boolean | false
| checkAlled        | 全选 |Boolean | false
| checkSize        | checked大小 |Array | [14, 14]




### 【单选/复选按钮】组件配置

```html
<sp-checkbox-button
  :checkList="checkList"
  :checkValues="checkValues"
  @callback="getSaskStatus">
</sp-checkbox-button>
```

```js
<script>
export default {
  data () {
    return {
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
      ]
    }
  },
  methods: {
    //当前选中的值
    getSaskStatus(val) {
      this.checkValues = val;
      console.log('按钮 选中的值: '+val)
    },
  }
}
</script>
```

### Props

|    name    |    Description   |   type   |default|
| -----------------  | ---------------- | :--------: | :----------: |
| checkList       | checked数组 |Array| []
| checkValues        | 默认选中项 |Array | []
| checkMany        | 是否为多选按钮 |Boolean | false
| checkboxSize        | checked大小 |String | 'lg'

### 【Select 选择器】组件配置

```html
<sp-select
  :options="options"
  :selectValue="selectValue"
  @change="getSelectValue">
</sp-select>
```

```js
<script>
export default {
  data () {
    return {
      selectValue: '',
      options: [
        {value: '1111111'},
        {value: '2222222'},
        {value: '1111111'},
        {value: '2222222'},
        {value: '1111111'},
        {value: '2222222'}
      ]
    }
  },
  methods: {
    //选择器 选中的值
    getSelectValue(val) {
      this.selectValue = val;
      console.log('选择器 选中的值: '+val)
    },
  }
}
</script>
```

### Props

|    name    |    Description   |   type   |default|
| -----------------  | ---------------- | :--------: | :----------: |
| options       | 选中数组 |Array| []
| selectValue        | 选中的值 |String | ''

### 【menu 菜单】组件配置

```html
<sp-menu-group
  :menuWidth="['40px', '200px']"
  :menuStatus="status"
  @status-change="getStatus">
  <sp-menu :menus="menus"
    :menuStatus="status" 
    :select-id="selectId" 
    @select-id="getSelectId"/>
</sp-menu-group>
```

```js
<script>
export default {
  data () {
    return {
      status: true,
      selectId: '1',
      pageConfig: [],
      menus: [{
        label: '一级 1',
        active: false,
        icon: 'icon-wutu',
        children: [{
          label: '二级 1-0',
          active: false,
          url:'#',
          children: [//如果使用权限，这样写，有url的children会转成configs数组，不会渲染出来，权限后台tree建议用element tree
            {'label': '新建'}
          ]
        },{
          label: '二级 1-1',
          active: false,
          children: [{
            label: '三级 1-1-1',
            active: false,
            url:'#'
          },{
            label: '三级 1-1-2',
            active: false,
            children: [{
              label: '4级 1-1-1-1',
              active: false,
              url:'#'
            }]
          }]
        }]
      }],
    }
  },
  methods: {
    //菜单组件 是否展开
    getStatus(val) {
      this.status = val
      console.log('菜单组件 是否展开: '+ val)
    },
    //菜单选中的ID
    getSelectId(val) {
      this.selectId = val
      console.log('选中的ID： '+ val)
    },
    //获取页面权限
    getPageConfig(val) {
      this.pageConfig = val;
      console.log("获取页面权限： " + JSON.stringify(val));
    },
    menuOpen(val) {
      console.log("菜单组件 打开的ID: " + val);
    },
    menuClose(val) {
      console.log("菜单组件 关闭的ID: " + val);
    },
  }
}
</script>
```

### Props

|    name    |    Description   |   type   |default|
| -----------------  | ---------------- | :--------: | :----------: |
| menus       | 菜单数组 |Array| []
| backgroundColor  | 背景颜色 | String | '#222'
| hoverBgColor  | hove背景颜色 | String | '#000'
| menuColor  | 字体颜色 |String | '#fff'
| activeMenuColor  | 选中改变字体颜色 | Array | [false, '#2e323e']
| accordion  | 是否开启手风琴模式 | Boolean | false
| width  | 菜单尺寸 | String |  '200px'
| height  | 每行高度 | String |  '36px'
| menuStatus  | 菜单是否默认展开 | Boolean | true
| router  | 是否使用router | Boolean | false
| selectId  | 选中的ID | String | ''
| pagePermissions  | 是否开启页面权限功能 | Boolean | false

### Events

|  事件名 |    说明           |   参数      |
|-------- |------             |------       |
|select-id|选中的ID|--|
|page-config|获取页面权限配置|--|
|open|打开的ID|--|
|close|关闭的ID|--|
