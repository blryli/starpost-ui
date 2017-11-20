<template>
  <div>
      <i v-if="urlArr == '' || urlArr == null || urlArr.length == 0" :class="{'more-img':showOne == true}" :style="{'font-size':imgSize[0]+'px'}" class="iconfont icon-wutu"></i>
      <img v-else class="small-img"  v-for="(item, index) in urlArr" :class="[{'more-img':showOne == true},{'img-i-b':alignRow == true}]" :style="{width:imgSize[0]+'px',height:imgSize[1]+'px'}"  @click="showImage(index, scrollbar)" :src="item.src">
    	<div v-if="show == true" class="fix-img" @click="shadeCloseImage(shadeClose)"></div>
    	<div id="big-img" ref="box" :style="{'margin-left': (-imgBoxSize[0])/2+'px',width: imgBoxSize[0]+'px'}">
          <div class="text" v-if="urlArr[0].text">{{urlArr[showImgIndex].text}}</div>
          <div class="show-img" :style="{height: imgBoxSize[1]+'px'}">
    	        <img :src="urlSrc" ref="urlSrc" :style="{'max-width': imgBoxSize[0]+'px'}">
              <div class="cutBox" v-if="cutBoxShow == true">
                  <p class="pre" @click="cutPre()"><i class="iconfont icon-pre"></i></p>
                  <p class="next" @click="cutNext()"><i class="iconfont icon-next"></i></p>
              </div>
    	    </div>
    	    <div class="img-list" :style="{'max-width': imgBoxSize[0]+'px'}" v-if="smallImgShow == true">
    	        <img v-for="(item, index) in urlArr" ref="img" :src="item.src" @mouseenter="showBigImage(index)">
    	    </div>
    	    <i class="iconfont icon-x" @click="hideImage"></i>
          <slot></slot>
      </div>
  </div>
</template>

<script>
export default {
    name: 'sp-img-details',
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
      smallImgShow: {//弹窗内是否展示缩略图
        type:Boolean,
        default : true
      },
      imgSize: {//图片大小
      	type: Array,
      	default: function () { 
      		return [30, 30]
      	}
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
    },
    data () {
        return {
           showImgIndex: 0,
           urlSrc: '',
           show: '',
           bodyHeight: true
       }
    },
    watch: {
      urlSrc() {
        
      }
    },
    methods:{
      //弹窗
  	 	showImage(index, scrollbar) {
          document.getElementById('big-img').classList.add("in");
          document.getElementById('big-img').style.display = 'block';
          if(this.scrollbar == false) {
            document.body.style.overflowY = 'hidden';
            document.body.style.height = '100%';
          }
          this.showImgIndex = index
          this.urlSrc = this.urlArr[index].src
          this.show = true;
          if(this.smallImgShow == true) {
            this.showBigImage(index) 
          }
      },
      //切换动效
      cutAnimation() {
        var _this = this
        window.clearInterval(timer)
        this.$refs.urlSrc.classList.add("fade_in");
        var timer = setTimeout(function() {
          _this.$refs.urlSrc.classList.remove("fade_in");
        }, 300)
      },
      //大图切换
      showBigImage(index) {
          this.showImgIndex = index
          this.cutBorderColor();
          this.cutAnimation()
      },
      //遮罩关闭
      hideImage() {
        window.clearInterval(timer)
          if(this.scrollbar == false) {
            document.body.style.overflowY = 'visible';
            document.body.style.height = 'auto';
          }
          document.getElementById('big-img').classList.remove("in");
          document.getElementById('big-img').classList.add("out");
          this.show = false
          var timer = setTimeout(function() {
            document.getElementById('big-img').classList.remove("out");
            document.getElementById('big-img').style.display = 'none';
          }, 290)
      },
      //是否点击遮罩关闭
      shadeCloseImage(shadeClose) {
        if(shadeClose == true) {
          this.hideImage()
        }
      },
      //切换缩略图边框颜色
      cutBorderColor() {
        this.urlSrc = this.urlArr[this.showImgIndex].src
        if(this.smallImgShow == true) {
          this.$refs.img.forEach((d, i) => {
            d.style.borderColor = 'transparent';
          })
          this.$refs.img[this.showImgIndex].style.borderColor = this.defaultColor
        }
      },
      //上一张
      cutPre() {
        let l = this.urlArr.length-1
        this.showImgIndex--
        if(this.showImgIndex < 0){
          this.showImgIndex = l
        }
        this.cutBorderColor();
        this.cutAnimation()
      },
      //下一张
      cutNext() {
        let l = this.urlArr.length-1
        this.showImgIndex++
        if(this.showImgIndex > l){
          this.showImgIndex = 0
        }
        this.cutBorderColor();
        this.cutAnimation()
      }
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
.fix-img{
  z-index: 10000;
  position: fixed;
  background-color: #000;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: auto;
  opacity: .6;
}
#big-img{
  position: fixed;
  display: none;
  top: 12%;
  left: 50%;
  box-shadow: 0 10px 30px rgba(0,0,0,.5);
  background-color: #fff;
  border:1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  margin: 0 auto;
  z-index: 11000;
  .show-img{
      border: 1px solid #ddd;
      margin-bottom: 6px;
      overflow: hidden;
      img{
          width: 100%;
          height: auto;
          margin: 0 auto;
      }
  }
  .icon-x{
      position: absolute;
      right: -18px;
      top: -18px;
      width: 26px;
      height: 26px;
      line-height: 26px;
      text-align: center;
      border: 2px solid #fff;
      background-color: #666;
      border-radius: 20px;
      font-size: 18px;
      color: #fff;
      cursor: pointer;
      box-shadow: -2px 1px 2px rgba(0,0,0,.4);
      &:hover{
          background-color: #E24747;
      }
  }
  .img-list{
      text-align: center;
      img{
          width: 50px;
          height: 50px;
          border: 2px solid transparent;
          padding: 2px;
          cursor: pointer;
      }
  }
  &.in {
    animation: animIn .3s ease-out;
  }
  &.out {
    animation: animOut .3s ease-out;
  }
}
.icon-wutu{
  color: #888;
}
.text{
  margin-bottom: 8px;
  font-size: 16px;
  color: #333;
}
//左右切换
.cutBox{
    >p{
      position: absolute;
      top: 50%;
      margin-top: -20px;
      color: #fff;
      width: 40px;
      height: 40px;
      text-align: center;
      cursor: pointer;
      .iconfont{
        opacity: .4;
        font-size: 30px;
        &:hover{
          opacity: .9;
        }
    }
    }
}
.pre{
  left: -50px;
}
.next{
  right: -50px;
}
.fade_in{
  animation: fadein .5s;
}
//动画
@keyframes fadein {
  from {opacity: .2;}
  to {opacity: 1;}
}
@keyframes animIn {
  from {margin-top: -20px;opacity: 0;}
  to {margin-top: 0;opacity: 1;}
}
@keyframes animOut {
  0% {margin-top: 0;opacity: 1;}
  50% {margin-top: -12px;opacity: .8;}
  90% {margin-top: -20px;opacity: 0;}
  100% {margin-top: -20px;opacity: 0;}
}

</style>