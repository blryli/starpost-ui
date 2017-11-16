<template>
  <div>
      <i v-if="urlArr == '' || urlArr == null || urlArr.length == 0" :class="{'more-img':showOne == true}" :style="{'font-size':imgSize[0]+'px'}" class="iconfont icon-wutu"></i>
      <img v-else class="small-img"  v-for="(item, index) in urlArr" :class="[{'more-img':showOne == true},{'img-i-b':alignRow == true}]" :style="{width:imgSize[0]+'px',height:imgSize[1]+'px'}"  @click="showImage(index)" :src="item.src">
    	<div v-if="show == true" class="fix-img" @click="hideImage"></div>
    	<div v-show="show == true" class="big-img" :style="{'margin-left': (-imgBoxSize[0])/2+'px',width: imgBoxSize[0]+'px'}">
          <div class="text" v-if="urlArr[0].text">{{urlArr[showImgIndex].text}}</div>
          <div class="show-img" :style="{height: imgBoxSize[1]+'px'}">
    	        <img :src="urlSrc" :style="{'max-width': imgBoxSize[0]+'px'}">
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
      showOne: {
      	type:Boolean,
      	default: false
      },
      alignRow: {
        type:Boolean,
        default : true
      },
      smallImgShow: {
        type:Boolean,
        default : true
      },
      imgSize: {
      	type: Array,
      	default: function () { 
      		return [30, 30]
      	}
      },
      defaultColor: {
      	type: String,
      	default: '#15A6BB'
      },
      cutBoxShow: {
        type:Boolean,
        default : true
      },
      imgBoxSize: {
        type: Array,
        default: function() {
          return [600, 500]
        }
      }
    },
    data () {
        return {
           showImgIndex: 0,
           urlSrc: '',
           show: '',
           bodyHeight: true
       }
    },
    methods:{
  	 	showImage(index) {
          document.body.style.overflowY = 'hidden';
          document.body.style.height = '100%';
          this.showImgIndex = index
          this.urlSrc = this.urlArr[index].src
          this.show = true;
          if(this.smallImgShow == true) {
            this.showBigImage(index) 
          }
      },
      showBigImage(index) {
          this.showImgIndex = index
          this.cutBorderColor()
      },
      hideImage() {
          this.show = false
          document.body.style.overflowY = 'visible';
          document.body.style.height = 'auto';
      },
      cutBorderColor() {
        this.urlSrc = this.urlArr[this.showImgIndex].src
        if(this.smallImgShow == true) {
          this.$refs.img.forEach((d, i) => {
            d.style.borderColor = 'transparent';
          })
          this.$refs.img[this.showImgIndex].style.borderColor = this.defaultColor
        }
      },
      cutPre() {
        let l = this.urlArr.length-1
        this.showImgIndex--
        if(this.showImgIndex < 0){
          this.showImgIndex = l
        }
        this.cutBorderColor()
      },
      cutNext() {
        let l = this.urlArr.length-1
        this.showImgIndex++
        if(this.showImgIndex > l){
          this.showImgIndex = 0
        }
        this.cutBorderColor()
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
.big-img{
  position: fixed;
  top: 12%;
  left: 50%;
  box-shadow: 0 10px 30px rgba(0,0,0,.5);
  background-color: #fff;
  border:1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  display: block;
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
        opacity: .6;
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
</style>