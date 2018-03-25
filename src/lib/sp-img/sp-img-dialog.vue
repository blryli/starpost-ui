<template>
  <div v-show="show">
		<div class="fix-img" @click="shadeCloseImage(shadeClose)"></div>
		<div id="big-img" ref="box" :style="{'margin-left': (-imgBoxSize[0])/2+'px',width: imgBoxSize[0]+'px'}">
				<div class="sp-img-header">
					<span class="sp-img-title" v-if="urlArr[showImgIndex].title">{{urlArr[showImgIndex].title}}</span>
          <i class="iconfont icon-x" @click="hideImage"></i>
					<slot name="header"></slot>
				</div>
				<div class="show-img" :style="{height: imgBoxSize[1]+'px'}">
						<img :src="urlSrc" ref="urlSrc" :style="{'max-width': imgBoxSize[0]+'px'}">
						<div class="cutBox" v-if="cutBoxShow && urlArr.length > 1">
								<p class="pre" @click="cutPre()"><i class="iconfont icon-pre"></i></p>
								<p class="next" @click="cutNext()"><i class="iconfont icon-next"></i></p>
						</div>
				</div>
				<div class="img-list" :style="{'max-width': imgBoxSize[0]+'px'}" v-if="smallImgShow && urlArr.length > 1">
						<img v-if="isUrlArr() && isObject" v-for="(item, index) in urlArr" :key="index" ref="img" :src="item.src" @mouseenter="showBigImage(index)" @click="clickShowBigImage(index)">
						<img v-if="isUrlArr() && !isObject" v-for="(item, index) in urlArr" :key="index" ref="img" :src="item" @mouseenter="showBigImage(index)" @click="clickShowBigImage(index)">
				</div>
		</div>
  </div>
</template>

<script>
export default {
    name: 'sp-img-dialog',
    props: {
			show: {
				type: Boolean,
				default: false
			},
      urlArr: {
        type: Array,
        default: function() {
          return []
        }
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
      cutClick: {//是否切换点击缩略图查看大图
        type:Boolean,
        default : false
			},
			urlSrc: {//展示的大图
      	type: String,
      	default: ''
      },
			showImgIndex: {//当前展示图片的index
      	type: Number,
      	default: 0
      },
      isObject: {//数组内容是对象还是字符串
        type:Boolean,
        default : true
			},
    },
    data () {
        return {
          //  isObject: true,//数组内容是对象还是字符串
       }
    },
		watch: {
      show() {
				if (this.show) {
					document.body.appendChild(this.$el);
				}else{
					this.$el.parentNode.removeChild(this.$el);
				}
			},
			showImgIndex() {
				this.cutBorderColor();
				this.cutAnimation();
			},
		},
		mounted() {
      if (this.show) {
				document.body.appendChild(this.$el);
				this.cutBorderColor();
				this.cutAnimation();
      }
    },
    destroyed() {
      if (this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el);
      }
    },
    methods:{
      //urlArr是否存在
      isUrlArr() {
        let isUrlArr;
        return isUrlArr = (this.urlArr == '' || this.urlArr == null || this.urlArr.length == 0) ? false : true;
      },
      //切换动效
      cutAnimation() {
        var _this = this,timer;
        window.clearInterval(timer)
        this.$refs.urlSrc.classList.add("fade_in");
        var timer = setTimeout(function() {
          _this.$refs.urlSrc.classList.remove("fade_in");
        }, 300)
      },
      //移入大图切换
      showBigImage(index) {
        if(!this.cutClick){
					this.$emit('show-img-index', index)
        }
      },
      //点击大图切换
      clickShowBigImage(index) {
          if(this.cutClick){
						this.$emit('show-img-index', index)
          }
      },
      //遮罩关闭
      hideImage() {
				if(this.scrollbar == false) {
					document.body.style.overflowY = 'visible';
					document.body.style.height = 'auto';
				}
				this.$emit('close', false)
      },
      //是否点击遮罩关闭
      shadeCloseImage(shadeClose) {
        if(shadeClose) {
					this.$emit('close', false)
        }
      },
      //切换缩略图边框颜色
      cutBorderColor() {
				let urlSrc = this.isObject ? this.urlArr[this.showImgIndex].src : this.urlArr[this.showImgIndex];
				this.$emit('url-src', urlSrc)
        if(this.smallImgShow) {
          this.$refs.img.forEach((d, i) => {
            d.style.borderColor = 'transparent';
          })
          this.$refs.img[this.showImgIndex].style.borderColor = this.defaultColor
          this.$emit('show-img-index', this.showImgIndex)
        }
      },
      //上一张
      cutPre() {
				let l = this.urlArr.length-1;
				let index = this.showImgIndex;
        index --;
        if(index < 0){
          index = l;
				}
				this.$emit('show-img-index', index)
      },
      //下一张
      cutNext() {
				console.log(index)
				let l = this.urlArr.length-1;
				let index = this.showImgIndex;
        index ++;
        if(index > l){
          index = 0
				}
				this.$emit('show-img-index', index)
      }
    }
}

</script>

<style lang="scss" scoped>
@import '../../../static/icon-font/iconfont.css';
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
  top: 12%;
  left: 50%;
  box-shadow: 0 10px 30px rgba(0,0,0,.5);
  background-color: #fff;
  border:1px solid #ccc;
  border-radius: 3px;
  padding: 10px;
  margin: 0 auto;
  z-index: 11000;
  .show-img{
      border: 1px solid #ddd;
      margin-bottom: 10px;
      overflow: hidden;
      img{
          width: 100%;
          height: auto;
          margin: 0 auto;
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
}
.icon-wutu{
  color: #888;
}
.sp-img-header{
  position: relative;
  overflow: hidden;
  margin-bottom: 8px;
  .sp-img-title{
    font-size: 16px;
    color: #666;
  }
  .iconfont{
      float: right;
      font-size: 24px;
      font-weight: bold;
      color: #aaa;
      cursor: pointer;
  }
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

</style>