<template>
	<div>
		<div  v-for="(imgArr, index) in imgArrs">
		  <sp-img-details :url-arr="imgArr" :show-one="true" :smallImgShow="false" :imgArrs="imgArrs" :cut-index="cutIndex">
		  	<div slot="cut" class="cutBox">
		  	    <p class="pre" @click="cutPre(index)">{{index}}<i class="iconfont icon-pre"></i></p>
		  	    <p class="next" @click="cutNext(index)">{{index}}<i class="iconfont icon-next"></i></p>
		  	</div>
		  </sp-img-details>
		</div>
	</div>
</template>

<script>
	export default {
	    name: 'sp-img-cut',
	    props: {
	    	imgArrs: {
	    	  type: Array,
	    	  default: function() {
	    	    return []
	    	  }
	    	}
	    },
	    data () {
	      return {
	      	cutIndex: 0
	      }
	    },
	    methods: {
	    	cutPre(index) {
	    		this.cutIndex--
	    		if(this.cutIndex < 0){
	    			this.cutIndex = this.imgArrs.length
	    		}
	    		console.log(this.cutIndex)
	    	},
	    	cutNext() {
	    		this.cutIndex++
	    		if(this.cutIndex > this.imgArrs.length){
	    			this.cutIndex = 0
	    		}
	    		console.log(this.cutIndex)
	    	}
	    }
	}
</script>

<style lang="scss" scoped>
	@import '../../../static/icon-font/iconfont.css';
	
</style>