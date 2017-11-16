<template>
  <div>
    <p>
      <span>{{ folder.label }}</span>
      <sp-tree-contents :children="folder.children"/>
    </p>
  </div>
</template>

<script>
import spTreeContents from './sp-tree-contents.vue'
export default {
    name: 'sp-tree',
    props: {
     folder: {}
    },
    data () {
        return {
           folders: {
             label: '一级 1',
             children: [{
               label: '二级 1-1',
               children: [{
                 label: '三级 1-1-1'
               }]
             }]
           }
       }
    },
    components: {
      spTreeContents
    },
    beforeCreate: function () {
      this.$options.components.spTreeContents = require('./sp-tree-contents.vue')
    },
    created() {
      this.folder = this.folders
    },
    methods:{
  	 	
    }
}

</script>

<style lang="scss" scoped>

</style>