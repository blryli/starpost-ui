<template>
  <div id="app">
    <h1>starpost-ui</h1>
    <h3>图片详情</h3>
    <sp-img-details :url-arr="imgs"></sp-img-details>
    <h3>全选/复选框</h3>
    <sp-checkbox :checkboxAll="true" :checkedArr="taskData" v-model.lazy="checkAlled" @change="getCheckArr">全选&nbsp;&nbsp;</sp-checkbox>
    <p v-for="(item, index) in taskData">
      <sp-checkbox v-model.lazy="item.checked" :checkedArr="taskData" :checkAlled="checkAlled" @change="getCheckAlled">选项{{index}}</sp-checkbox>
    </p>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      imgs: [ 
        {src:'http://pic2.97uimg.com/58pic/19/34/12/01q58PICkKe.jpg!w1200', text: 88888888},
        {src:'http://pic2.97uimg.com/58pic/19/77/18/38v58PICbIJ.jpg!w1200', text: 2222},
        {src:'http://170.168.0.51:9001/img/75cffdc9-c596-423c-8ffd-c9c596b23c7c', text: 3333}
      ],
      imgs2: [],
      checkAlled: false,
      taskData: [
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
  //   this.taskData.forEach((d, i) => {
  //     d.checked = false
  //   })
  // },
  methods: {
    getCheckArr(val){
        this.taskData = val
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
