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



## 【相册】组件配置

```html
<sp-img-details
	:url-arr="array"
	:show-one="true">
</sp-img-details>
```

```js
<script>
export default {
  data () {
    return {
      array: [ 
        {src:'http://pic2.97uimg.com/58pic/19/69/83/38658PICuUm.jpg!w1200', text: 11111111111},
        {src:'http://pic2.97uimg.com/58pic/21/56/66/15D58PICHdR.jpg!w1200', text: 22222222222},
        {src:'http://pic2.97uimg.com/58pic/18/23/47/56r58PICHN3.jpg!w1200', text: 33333333333}
      ],
      //或者
      array: [ 
        'http://pic2.97uimg.com/58pic/19/69/83/38658PICuUm.jpg!w1200',
        'http://pic2.97uimg.com/58pic/21/56/66/15D58PICHdR.jpg!w1200',
        'http://pic2.97uimg.com/58pic/18/23/47/56r58PICHN3.jpg!w1200'
      ]
    }
  }
}
</script>
```


### Attribute

|    name    |    Description   |   type   |default|
| -----------------  | ---------------- | :--------: | :----------: |
| urlArr       | 图片地址 |Array| []
| showOne        | 只展示第一张图片 |Boolean | false
| alignRow        | 横排展示 |Boolean | true
| imgSize        | 展示图片大小 |Array | [30, 30]
| imgBoxSize        | 弹窗大小 |Array | [600, 500]
| defaultColor        | 激活图片边框颜色 |String | #15A6BB
| cutBoxShow        | 是否开启左右切换箭头 |Boolean | true
| smallImgShow        | 弹窗内是否展示缩略图 |Boolean | true
| cutClick        | 是否切换点击缩略图查看大图 |Boolean | false
| scrollbar        | 是否允许浏览器出现滚动条 |Boolean | true
| shadeClose        | 是否点击遮罩关闭 |Boolean | false

### Events

|  事件名 |    说明           |   参数      |
|-------- |------             |------       |
|get-index|图片打开/切换时触发|index值(当前index)|



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
  @change="callBackMenuCrrut">
  <sp-menu :menus="menus"/>
</sp-menu-group>
```

```js
<script>
export default {
  data () {
    return {
      status: true,
      menus: [{
        id: '1',
        name: '一级 1',
        active: false,
        icon: 'icon-wutu',
        children: [{
          id: '1-0',
          name: '二级 1-0',
          active: false,
          url:'#'
        },{
          id: '1-1',
          name: '二级 1-1',
          active: false,
          children: [{
            id: '1-1-1',
            name: '三级 1-1-1',
            active: false,
            url:'#'
          },{
            id: '1-1-2',
            name: '三级 1-1-2',
            active: false,
            children: [{
              id: '1-1-1-1',
              name: '4级 1-1-1-1',
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
    callBackMenuCrrut(val) {
      this.status = val
      console.log('菜单组件 是否展开: '+val)
    }
  }
}
</script>
```

### Props

|    name    |    Description   |   type   |default|
| -----------------  | ---------------- | :--------: | :----------: |
| menus       | 菜单数组 |Array| []
| backgroundColor  | 背景颜色 |String | '#222'
| hoverBgColor  | hove背景颜色 |String | '#000'
| menuColor  | 字体颜色 |String | '#fff'
| activeMenuColor  | 选中字体颜色 |String | '#15A6BB'
| accordion  | 是否开启手风琴模式 |Boolean | false
| menuWidth  | 菜单尺寸 |Array | ['40px', '200px']
| menuStatus  | 菜单是否默认展开 |Boolean | true
| router  | 是否使用router |Boolean | false
