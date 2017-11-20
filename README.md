# starpost-ui

> A Vue.js project


## demo演示

[demo](https://blryli.github.io/starpost-ui/)

## 安装

``` Bash
# install dependencies
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

// 作为组件的方式使用
<sp-img-details></sp-img-details>
```

### 配置

```html
<sp-img-details
	:url-arr="array"
	:show-one="true"
	:align-row="true"
	:img-size="[30, 30]"
	:default-color="#15A6BB">
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
    }
  }
}
</script>
```

### Props

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
| scrollbar        | 是否允许浏览器出现滚动条 |Boolean | true
| shadeClose        | 是否点击遮罩关闭 |Boolean | false

```

// 作为组件的方式使用
<sp-checkbox></sp-checkbox>
```

### 配置

```html
<sp-checkbox
	:checkboxAll="true"
	:checkedArr="checkArr"
	v-model="checkAlled"
	@change="getCheckArr">全选&nbsp;&nbsp;
</sp-checkbox>
<div v-for="(item, index) in checkArr">
    <sp-checkbox
	  	v-model="item.checked"
	  	:checkedArr="checkArr"
	  	:checkAlled="checkAlled"
	  	@change="getCheckAlled">选项{{index}}
    </sp-checkbox>
</div>
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
