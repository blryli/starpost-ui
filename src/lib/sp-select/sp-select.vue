<template>
    <div class="sp-select">
        <div class="select" ref="select" :class="{open: show == true}" @click="show = !show">
            <!-- <input type="text" class="input" :value="selectValue"> -->
            <p>{{selectValue}}</p>
            <ul ref="ul">
                <li class="selected">所有选项</li>
                <li v-for="(option, index) in options" @click="toValue(option.value)" :key="index">{{option.value}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'sp-select',
    props: {
    //选项数组
     options: {
        type: Array,
        default: function() {
            return []
        },
     },
     //选中的值
     selectValue: ''
    },
    data () {
        return {
           show: false
       }
    },
    methods:{
        toValue(value) {
            this.$emit('change', value)
        }
    },
    mounted: function () {
        var _this = this
        this.$nextTick(function () {
            document.onclick = function(){
                let ulHeight = _this.$refs.ul.offsetHeight
                let select = _this.$refs.select
                if(_this.show == true && ulHeight > 10){
                    _this.show = false
                    select.classList.remove('open');
                }
            }
        })
    }
}
</script>

<style lang="scss" scoped>
@import '../../scss/variable';
    .sp-select {
        .select {
            width: 100%;
            height: 36px;
            background-color: #fff;
            position: relative;
            border-radius: 4px;
            border: 1px solid #ddd;
            .input{
                width:100%;
                height: 36px;
            }
            /*transform(缩放、旋转、平移)，显示的是最终效果，没有动画过程*/
            /*transition是对元素本身的属性(比如：width、height)设置动画效果*/          
            &:after {
                content: '';
                display: block;
                width: 10px;
                height: 10px;
                border-left: 1px #ccc solid;
                border-bottom: 1px #ccc solid;
                position: absolute;
                top: 11px;
                right: 12px;
                transform: rotate(-45deg);
                transition: transform .3s ease-out,top .3s ease-out;
            } 
            /*设置展开时下拉箭头的旋转动画*/          
            &.open:after {
                transform: rotate(-225deg);
                top: 18px;
                transition: all .3s ease-in-out;
            }
            p {
                margin: 0;
                padding: 0 15px;
                line-height: 36px;
                cursor: pointer;
            }
            /*设置下拉框收起时的高度过渡动画*/         
            ul {
                list-style-type: none;
                background-color: #fff;
                box-shadow: 0 2px 10px rgba(0,0,0,.2);
                width: 100%;
                overflow-y: auto;
                position: absolute;
                z-index: 2000;
                top: 40px;
                left: 0;
                max-height: 0;
                transition: max-height .3s ease-out;
                li {
                    padding: 0 15px;
                    line-height: 40px;
                    cursor: pointer;
                    &:hover {
                        background-color: #f5f5f5;
                        color: $bgColor;
                        font-weight: bold;
                    }           
                }           
                &.selected {
                    background-color: #39f;
                    color: #fff;
                }
            }           
            /*下拉框展开时调用动画slide-down*/
            /*transform-origin设置缩放下拉框的基点位置*/            
            &.open ul {
                max-height: 250px;
                -webkit-animation: slide-down .5s ease-in;
                transition: max-height .3s ease-in;
                transform-origin: 50% 0; 
            }
        }
    }           
    /*为下拉框展开时添加名称为slide-down的关键帧动画*/
    @-webkit-keyframes slide-down{
        0%{transform: scale(1,0);}
        25%{transform: scale(1,1.2);}
        50%{transform: scale(1,0.85);}
        75%{transform: scale(1,1.05);}
        100%{transform: scale(1,1);}
    }
</style>