<template>
  <ul>
    <li v-for="child in children">
      <p>{{child}}</p>
      <sp-tree v-if="child.children" :folder="child"/>
      <span>{{ child.label }}</span>
    </li>
  </ul>
</template>

<script>
import spTree from './sp-tree.vue'
export default {
    name: 'sp-tree-contents',
    props: {
      children: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    data () {
        return {
           
       }
    },
    components: {
      spTree
    },
    methods:{
  	 	
    },
}

</script>

<style lang="scss" scoped>

</style>