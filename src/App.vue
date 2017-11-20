<template>
  <div id="app">
    <h1>starpost-ui</h1>
    <h3>图片详情</h3>
    <sp-img-details :urlArr="imgs"></sp-img-details>
    <h3>全选/复选框</h3>
    <sp-checkbox :checkboxAll="true" :checkedArr="checkArr" v-model.lazy="checkAlled" @change="getCheckArr">全选&nbsp;&nbsp;</sp-checkbox>
    <p v-for="(item, index) in checkArr">
      <sp-checkbox v-model.lazy="item.checked" :checkedArr="checkArr" :checkAlled="checkAlled" @change="getCheckAlled">选项{{index}}</sp-checkbox>
    </p>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      imgs: [ 
        {src:'http://pic2.97uimg.com/58pic/19/69/83/38658PICuUm.jpg!w1200', text: 11111111111},
        {src:'http://pic2.97uimg.com/58pic/21/56/66/15D58PICHdR.jpg!w1200', text: 22222222222},
        {src:'http://pic2.97uimg.com/58pic/18/23/47/56r58PICHN3.jpg!w1200', text: 33333333333}
      ],
      imgs2: [],
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
  // created() {
  //   this.checkAlled = false
  //   this.checkArr.forEach((d, i) => {
  //     d.checked = false
  //   })
  // },
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

<style lang="scss">
#app{
  text-align: center;
}
</style>
