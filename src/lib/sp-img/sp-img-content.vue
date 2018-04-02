<template>
    <div class="sp-img-content">
        <div class="sp-img-box">
            <img :src="isObject ? urlArr[activeIndex].src : urlArr[activeIndex]" ref="urlSrc">
        </div>
        <div class="sp-img-list" v-show="smallImgShow && urlArr.length > 1">
            <img v-for="(item, index) in urlArr" :key="index" ref="img" :src="isObject ? item.src : item" @mouseenter="show(index)" @click="clickShow(index)">
        </div>
        <div class="sp-img-switch" v-if="cutBoxShow && urlArr.length > 1">
            <p class="pre" @click="cutPre()"><i class="iconfont icon-pre"></i></p>
            <p class="next" @click="cutNext()"><i class="iconfont icon-next"></i></p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'sp-img-content',
        props: {
            urlArr: {
                type: Array,
                default: function() {
                    return []
                }
            },
            smallImgShow: { //弹窗内是否展示缩略图
                type: Boolean,
                default: true
            },
            imgSize: { //图片大小
                type: Array,
                default: function() {
                    return [30, 30]
                }
            },
            defaultColor: { //弹窗缩略图边框颜色
                type: String,
                default: '#15A6BB'
            },
            cutBoxShow: { //是否开启左右切换箭头
                type: Boolean,
                default: true
            },
            switchEvent: { //缩略图切换大图方式
                type: String,
                default: 'mouseenter'
            },
            activeIndex: { //当前展示图片的index
                type: Number,
                default: 0
            },
        },
        data() {
            return {
            }
        },
        watch: {
            activeIndex() {
                this.cutBorderColor();
                this.cutAnimation();
            },
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
        mounted() {
            this.$nextTick(function() {
                if (this.smallImgShow && this.$refs.img) {
                    if(this.activeIndex == 0) {
                        this.$refs.img[0].style.borderColor = this.defaultColor;
                    }
                }
            })
        },
        methods: {
            //切换动效
            cutAnimation() {
                var _this = this;
                window.clearInterval(timer)
                this.$refs.urlSrc.classList.add("fade_in");
                var timer = setTimeout(function() {
                    _this.$refs.urlSrc.classList.remove("fade_in");
                }, 300)
            },
            //移入切换
            show(index) {
                this.switchEvent == 'mouseenter' && index != this.activeIndex && this.$emit('active-index', index);
            },
            //点击切换
            clickShow(index) {
                this.switchEvent == 'click' && index != this.activeIndex && this.$emit('active-index', index);
            },
            //切换缩略图边框颜色
            cutBorderColor() {
                this.$nextTick(function() {
                    if (this.smallImgShow && this.$refs.img) {
                        this.$refs.img.forEach((d, i) => {
                            d.style.borderColor = 'transparent';
                        })
                        this.$refs.img[this.activeIndex].style.borderColor = this.defaultColor
                    }
                })
            },
            //上一张
            cutPre() {
                let l = this.urlArr.length - 1;
                let index = this.activeIndex;
                index--;
                if (index < 0) {
                    index = l;
                }
                this.$emit('active-index', index)
            },
            //下一张
            cutNext() {
                let l = this.urlArr.length - 1;
                let index = this.activeIndex;
                index++;
                if (index > l) {
                    index = 0
                }
                this.$emit('active-index', index)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../../static/icon-font/iconfont.css';
    .sp-img-box {
        height: 460px;
        overflow: hidden;
        img {
            width: 100%;
            height: auto;
            margin: 0 auto;
        }
    }
    .sp-img-list {
        margin-top: 20px;
        text-align: center;
        img {
            width: 50px;
            height: 50px;
            border: 2px solid transparent;
            padding: 2px;
            cursor: pointer;
        }
    }
    
    //左右切换
    .sp-img-switch {
        >p {
            position: absolute;
            top: 50%;
            margin-top: -20px;
            color: #fff;
            width: 40px;
            height: 40px;
            text-align: center;
            cursor: pointer;
            .iconfont {
                opacity: .4;
                font-size: 30px;
                &:hover {
                    opacity: .9;
                }
            }
        }
    }
    
    .pre {
        left: -50px;
    }
    
    .next {
        right: -50px;
    }
    
    .fade_in {
        animation: fadein .5s;
    }
    
    //动画
    @keyframes fadein {
        from {
            opacity: .2;
        }
        to {
            opacity: 1;
        }
    }
</style>