<template>
	<div>
		<slot></slot>
        <ul class="checkbox">
        	<li :class="{'active': isCheck}" style="z-index: 3;" v-if="checkAllShow == true" :style="{padding: checkSize(checkboxSize)}" @click="checkAll()">
        		<i></i>
        		<span role="button">全选</span>
        	</li><li v-for="item in checkList" :key="item.id" :style="{padding: checkSize(checkboxSize)}" :class="{'active': contains(checkarr, item.id) && isCheck == false}"  @click="check(item.id)">
        		<i></i>
        		<span role="button">{{item.name}}</span>
        	</li>
        </ul>
    </div>
</template>

<script>

export default {
	name: 'sp-checkbox-button',
	data () {
		return {
		  	isCheck: false,
		  	checkarr: []
		}
	},
	props: {
		checkList: {//选项列表
			type: Array,
			default: function () {
				return []
			}
		},
		checkValues: {//初始值
			type: Array,
			default: function () {
				return []
			}
		},
		checkMany: {//是否开启多选
			type: Boolean,
			default: false
		},
		checkAllShow: {//是否显示全选按钮
			type: Boolean,
			default: true
		},
		checkboxSize: {//按钮大小
			type: String,
			default: 'lg'
		}
	},
	created() {
		this.checkarr = this.checkValues
	},
	methods:{
		checkSize(size) {
			if(size == 'lg'){
				return '8px 12px'
			}else if(size == 'sm'){
				return '6px 8px'
			}if(size == 'xs'){
				return '4px 6px'
			}
		},
		contains(arr, obj) {
		  let i = arr.length;
		  while (i--) {
		    if (arr[i] === obj) {
		      return true;
		    }
		  }
		  return false;
		},
		check(val) {
			this.isCheck = false
			let l = this.checkarr.length
			if(this.checkMany == false) {
				this.checkarr.splice(0, 1, val)
			}else {
				if (this.contains(this.checkarr, val)) {
					for (var i = 0; i < l; i++) {
						if(this.checkarr[i] == val){
							this.checkarr.splice(i,1)
						}
					}
					if(this.checkarr.length < 1) {
						this.isCheck = true
						this.checkarr = []
					}
				} else {
					 this.checkarr.push(val)
				}
			}
			this.$emit('callback', this.checkarr)
		},
		checkAll() {
			if(this.isCheck == false){
				this.isCheck = true
				this.checkarr = []
				this.$emit('callback', this.checkarr)
			}
		}

	}
}
</script>

<style lang="scss" scoped>
.checkbox{
    padding: 0;
    margin: 0;
    display: inline-block;
    li{
        display: inline-block;
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        border-right: 1px solid #ccc;
        background-color: #fff;
        list-style: none;
        position: relative;
        cursor: pointer;
        i{
        	width: 100%;
        	height: 100%;
        	background-color: #15A6BB;
        	border-color: rgb(16, 152, 173);
        	opacity: 0;
        	position: absolute;
        	z-index: 0;
        	left: 0;
        	top: 0;
        }
        span{
            color: #333;
            display: block;
            font-size: 14px;
            position: relative;
            z-index: 1;
            user-select:none;
        }
        &:hover{
            i{
            	opacity: 0.2;
            }
        }
        &.active{
            background-color: #15A6BB;
            border-color: rgb(16, 152, 173);
            span{
                color: #fff;
            }

        }
        &:first-child{
            border-radius: 4px 0 0 4px;
            border-left: 1px solid #ccc;
            &.active{
            	border-color: #15A6BB;
            }
        }
        &:last-child{
            border-radius: 0 4px 4px 0;
        }

    }
}
</style>