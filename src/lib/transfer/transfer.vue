<template>
  <div>
    <div class="sp-transfer" :style="{width: width}">
      <div class="sp-transfer__header">
        <slot name="header">
          <div style="float:left;margin-right:10px;">{{title[0]}}</div>
          <slot></slot>
          <span style="float:right">{{datasAll.length}}/{{data.length}}</span>
        </slot>
      </div>
      <div class="sp-transfer__body" :style="{height: height}" :class="{disabled: disabled}">
        <draggable v-model="datasAll" :style="{minHeight: height}" :options="{disabled: disabled, animation: 300, group:'people'}" @end="end(dataArr)">
          <div v-for="(d, i) in datasAll" :key="i" class="sp-transfer__item">
            <p class="sp-transfer__content">{{d.label}}</p>
          </div>
        </draggable>
      </div>
    </div>
    <div v-if="limit" class="sp-transfer" :style="{width: width}">
      <div class="sp-transfer__header">
        <slot name="header">
          <div style="float:left;margin-right:10px;">{{title[1]}}</div>
          <span class="btn-text" @click="clear">清空</span>
          <span style="float:right">{{number}}</span>
        </slot>
      </div>
      <div class="sp-transfer__body" :style="{height: height}" :class="{'sp-transfer__stripe':stripe}">
        <div v-if="limit" class="sp-transfer__item" v-for="item in dataArr" :key="item.id">
          <div class="sp-transfer__left">{{item.id}}</div>
          <draggable class="sp-transfer__right" style="min-height: 36px;" v-model="item.array" :options="{animation: 300, group:'people'}" @end="end(dataArr)">
            <p v-for="(d, i) in item.array" :key="i">{{d.label}}</p>
          </draggable>
        </div>
      </div>
    </div>
    <div v-else class="sp-transfer" :style="{width: width}">
      <div class="sp-transfer__header">
        <slot name="header">
          <div style="float:left;margin-right:10px;">{{title[1]}}</div>
          <span style="float:right">{{dataArr.length}}</span>
        </slot>
      </div>
      <div class="sp-transfer__body" :style="{height: height}" :class="{disabled: disabled}">
        <draggable v-model="dataArr" :style="{minHeight: height}" :options="{animation: 300, group:'people'}" @end="end(dataArr)">
          <div v-for="(d, i) in dataArr" :key="i" class="sp-transfer__item">
            <p class="sp-transfer__content">{{d.label}}</p>
          </div>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  name: "sp-transfer",
  props: {
    data: {
      type: Array,
      default: () => {
        return [];
      }
    },
    callbakData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    title: {
      type: Array,
      default: () => {
        return ["列表1", "列表2"];
      }
    },
    height: {
      type: String,
      default: "300px"
    },
    width: {
      type: String,
      default: "200px"
    },
    number: {
      type: Number,
      default: 0
    },
    stripe: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      datasAll: [],
      dataArr: [],
      disabled: false
    };
  },
  components: { draggable },
  watch: {
    number(val) {
      this.dataArrVal(val);
    },
    callbakData(val) {
      val.length ? (this.dataArr = val) : this.dataArrVal(this.number);
    },
    data(val) {
      this.datasAll = val;
    }
  },
  created() {
    this.datasAll = this.data;
    this.limit ? (this.disabled = true) : (this.dataArr = this.callbakData);
  },
  computed: {},
  methods: {
    end(arr) {
      this.$emit("update:callbakData", arr);
    },
    dataArrVal(val) {
      this.dataArr = [];
      this.datasAll = this.data;
      this.disabled = this.limit && val == 0 ? true : false;
      for (let i = 0; i < val; i++) {
        this.dataArr.push({ id: i + 1, array: [] });
      }
    },
    clear() {
      this.dataArrVal(this.number);
      this.datasAll = this.data;
      this.$emit("clear");
    }
  }
};
</script>

<style lang="scss" scoped>
.sp-transfer {
  border: 1px solid #ebeef5;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  display: inline-block;
  vertical-align: middle;
  max-height: 100%;
  box-sizing: border-box;
  position: relative;
  & + .sp-transfer {
    margin-left: 40px;
  }
}
.sp-transfer__header {
  padding: 0 15px;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #ebeef5;
}
.sp-transfer__body {
  overflow: auto;
}
.sp-transfer__item {
  display: table;
  width: 100%;
  border-bottom: 1px solid #ebeef5;
  > * {
    display: table-cell;
    vertical-align: middle;
    min-height: 36px;
    line-height: 36px;
  }
}
.sp-transfer__left {
  width: 40px;
  text-align: center;
  border-right: 1px solid #ebeef5;
}
.sp-transfer__right {
  p {
    padding: 0 15px;
    + p {
      border-top: 1px solid #ebeef5;
    }
  }
}
.sp-transfer__stripe {
  .sp-transfer__item {
    &:nth-child(even) {
      background-color: #fafafa;
    }
  }
}
.sp-transfer__content {
  width: 100%;
  padding: 0 15px;
}
.sp-input {
  width: 120px;
  display: inline-block;
}
.sp-input__inner {
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 30px;
  line-height: 30px;
  outline: none;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
  &:focus {
    border-color: #409eff;
  }
}
.btn-text {
  cursor: pointer;
  color: #409eff;
  &:hover {
    opacity: 0.8;
  }
}
.disabled {
  cursor: no-drop;
  opacity: 0.6;
  -moz-user-select: none; /*火狐*/
  -webkit-user-select: none; /*webkit浏览器*/
  -ms-user-select: none; /*IE10*/
  -khtml-user-select: none; /*早期浏览器*/
  user-select: none;
}
</style>