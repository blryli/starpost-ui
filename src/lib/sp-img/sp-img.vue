<template>
  <div>
      <!-- <i v-if="!isUrlArr()" :class="{'sp-img-one':showOne}" :style="{'font-size':imgSize[0]+'px'}" class="iconfont icon-wutu"></i> -->
      <img v-if="!showOne || showOne && index == 0" class="sp-img__small"  v-for="(item, index) in urlArr" :key="index" :class="{'sp-img-inline':inline}" 
      :style="{width:imgSize[0]+'px',height:imgSize[1]+'px'}"  @click="showImage(index)" :src="isObject ? item.src : item">
  </div>
</template>

<script>

export default {
    name: 'sp-img',
    props: {
      urlArr: {
        type: Array,
        default: function() {
          return []
        }
      },
      showOne: {//是否只展示一张图片
      	type:Boolean,
      	default: false
      },
      inline: {//是否在一行展示
        type:Boolean,
        default : true
      },
      imgSize: { //图片大小
          type: Array,
          default: function() {
              return [30, 30]
          }
      },
    },
    data () {
        return {
           
       }
    },
    computed: {
      isObject() {//数组内容是对象还是字符串
        let isObject;
        if(this.urlArr.length > 0) {
          if(typeof this.urlArr[0] == 'object'){
            isObject = true;
          }
          if(typeof this.urlArr[0] == 'string' && this.urlArr[0].length > 0){
            isObject = false;
          }
        }
        return isObject;
      }
    },
    methods:{
      //弹窗
  	 	showImage(index) {
          this.$emit('active-index', index);
          this.$emit('get-urlArr', this.urlArr);
      }
    }
}

</script>

<style lang="scss" scoped>
@import '../../../static/icon-font/iconfont.css';

.sp-img__small{
  margin: 3px;
  cursor: pointer;
  display: block;
  background-color: #f0f0f0;
}
.sp-img-inline{
  display: inline-block;
}
.icon-wutu{
  color: #888;
}
</style>