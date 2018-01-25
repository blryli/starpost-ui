<template>
    <label role="checkbox">
        <div class="icheckbox_square-green" :class="{active: value == true}" style="position: relative;" :style="{width: checkSize[0]+'px',height: checkSize[1]+'px'}">
            <input v-if="checkboxAll == true" type="checkbox" class="check" :value="value" @click="updateValueAll(value)">
            <input v-else type="checkbox" class="check" :value="value" @click="updateValue(value)">
            <i class="iconfont icon-gou" :style="{fontSize: checkSize[0]+'px'}" v-if="value == true"></i>
        </div>
        <slot></slot>
    </label>
</template>

<script>
  export default {
    name: 'sp-checkbox',
    props: {
        value: '',
        checkedArr: {
            type: Array,
            default() {
                return []
            }
        },
        checkAlled: {
            type: Boolean,
            default: false
        },
        checkboxAll: {
            type: Boolean,
            default: false
        },
        checkSize: {
            type: Array,
            default: function() {
                return [14, 14]
            }
        }
    },
    methods: {
        //点击单选
        updateValueAll(value) {
            value = !value
            this.checkedArr.forEach((d, i)=>{
                if(value == true){
                    d.checked = true
                }else{
                    d.checked = false
                }
            })
            this.$emit('input', value)
            this.$emit('change', this.checkedArr)
        },
        //点击单选
        updateValue(value) {
            value = !value
            this.$emit('input', value)
            let checkAlledVal
            if(value == false && this.checkAlled == true){
                checkAlledVal = false
            }else {
                let arr = []
                let len = this.checkedArr.length
                this.checkedArr.forEach((d, i)=>{
                    if(d.checked == true){
                        arr.push({check:true})
                    }
                })
                if(arr.length == len){
                    checkAlledVal = true
                }
            }
            this.$emit('change', checkAlledVal)
        },
    }
  }
</script>

<style lang="scss" scoped>
@import '../../../static/icon-font/iconfont.css';
@import '../../scss/variable';

.icheckbox_square-green, .iradio_square-green {
    display: inline-block;
    vertical-align: middle;
    margin: 0;
    padding: 0;
    cursor: pointer;
    border: 1px solid #aaa;
    border-radius: 2px;
    &:hover{
        border-color: $bgColor;
    }
    &.active{
        border-color: $bgColor;
        background-color: $bgColor;
    }
    .check{
        position: absolute;z-index: 10; opacity: 0;top: 0%; left: 0%;cursor: pointer;margin-top: 0;
    }
}
.iconfont{
    position:absolute;
    z-index: 1;
    color: #333;
    left: 0;
    top: 0;
    color: #fff;
}
</style>