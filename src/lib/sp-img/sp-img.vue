<template>
  <div>
      <i v-if="!isUrlArr()" :class="{'more-img':showOne == true}" :style="{'font-size':imgSize[0]+'px'}" class="iconfont icon-wutu"></i>
      <img v-if="isUrlArr() && isObject" class="small-img"  v-for="(item, index) in urlArr" :key="index" :class="[{'more-img':showOne == true},{'img-i-b':alignRow == true}]" 
      :style="{width:imgSize[0]+'px',height:imgSize[1]+'px'}"  @click="showImage(index, scrollbar)" :src="item.src">
      <img v-if="isUrlArr() && !isObject" class="small-img"  v-for="(item, index) in urlArr" :key="index" :class="[{'more-img':showOne == true},{'img-i-b':alignRow == true}]" 
      :style="{width:imgSize[0]+'px',height:imgSize[1]+'px'}"  @click="showImage(index, scrollbar)" :src="item">

      <component :is="currentView" :urlArr="urlArr" :smallImgShow="smallImgShow" :defaultColor="defaultColor" :cutBoxShow="cutBoxShow" :isObject="isObject" 
      :imgBoxSize="imgBoxSize" :scrollbar="scrollbar" :shadeClose="shadeClose" :cutClick="cutClick" :showImgIndex="showImgIndex" :show="show" :urlSrc="urlSrc" 
      @close="close" @url-src="getUrlSrc" @show-img-index="getShowImgIndex"
      ></component>
  </div>
</template>

<script>
import spImgDialog from './sp-img-dialog.vue'
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
      alignRow: {//是否在一行展示
        type:Boolean,
        default : true
      },
      imgSize: {//图片大小
      	type: Array,
      	default: function () { 
      		return [30, 30]
      	}
      },
      smallImgShow: {//弹窗内是否展示缩略图
        type:Boolean,
        default : true
      },
      defaultColor: {//弹窗缩略图边框颜色
      	type: String,
      	default: '#15A6BB'
      },
      cutBoxShow: {//是否开启左右切换箭头
        type:Boolean,
        default : true
      },
      imgBoxSize: {//弹窗 || 图片大小
        type: Array,
        default: function() {
          return [600, 500]
        }
      },
      scrollbar: {//是否允许浏览器出现滚动条
        type:Boolean,
        default : true
      },
      shadeClose: {//是否点击遮罩关闭
        type:Boolean,
        default : false
      },
      cutClick: {//是否切换点击缩略图查看大图
        type:Boolean,
        default : false
      },
    },
    data () {
        return {
           showImgIndex: 0,//当前展示图片的index
           currentView: '',
           urlSrc: '',//展示的大图
           show: false,//弹窗显示
       }
    },
    components: {
      spImgDialog
    },
    computed: {
      isObject() {//数组内容是对象还是字符串
        let isObject;
        if(this.urlArr.length > 0) {
          console.log(typeof this.urlArr[0] == 'object')
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
      //urlArr是否存在
      isUrlArr() {
        let isUrlArr;
        return isUrlArr = (this.urlArr == '' || this.urlArr == null || this.urlArr.length == 0) ? false : true;
      },
      //弹窗
  	 	showImage(index, scrollbar) {
          this.currentView = 'spImgDialog';
          if(this.scrollbar == false) {
            document.body.style.overflowY = 'hidden';
            document.body.style.height = '100%';
          }
          this.showImgIndex = index;
          this.urlSrc = this.isObject ? this.urlArr[index].src : this.urlArr[index];
          this.show = true;
      },
      close(val) {
        this.show = val;
      },
      //图片组件获取当前index
      getShowImgIndex(val) {
        this.showImgIndex = val;
        console.log('图片组件获取当前index: '+val)
      },
      //图片组件获取当前激活图片url
      getUrlSrc(val) {
        this.urlSrc = val;
        console.log('图片组件获取当前激活图片url: '+val)
      },
    }
}

</script>

<style lang="scss" scoped>
@import '../../../static/icon-font/iconfont.css';

.small-img{
  margin: 3px;
  cursor: pointer;
  display: block;
  background-color: #f0f0f0;
}
.img-i-b{
  display: inline-block;
}
.more-img{
  & +.more-img{
      display: none;
  }
}
.icon-wutu{
  color: #888;
}
</style>