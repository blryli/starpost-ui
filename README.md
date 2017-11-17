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
<script src="https://unpkg.com/starpost-ui/dist/starpost-ui.js""></script>

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
        {src:'http://pic2.97uimg.com/58pic/19/34/12/01q58PICkKe.jpg!w1200', text: 1111111},
        {src:'http://pic2.97uimg.com/58pic/19/77/18/38v58PICbIJ.jpg!w1200', text: 2222222},
        {src:'http://170.168.0.51:9001/img/75cffdc9-c596-423c-8ffd-c9c596b23c7c', text: 3333333}
      ],
    }
  }
}
</script>
```

### Props

|    name    |    Description   |   type   |default|
| -----------------  | ---------------- | :--------: | :----------: |
| url-arr       | 图片地址 |Array| []
| show-one        | 只展示第一张图片 |Boolean | false
| align-row        | 横排展示 |Boolean | true
| img-size        | 展示图片大小 |Array | [30, 30]
| default-color        | 激活图片边框颜色 |String | #15A6BB
| cut-box-show        | 左右切换箭头 |Boolean | true
| img-box-size        | 弹窗大小 |Array | [600, 500]

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
