<template>
  <div id="dateEL" class="date-picker calendar">{{date}}
    <ul id="date-picker__hd" class="date-picker__hd date-picker__hd-more">
      <li data-time="2018-4" v-for="i in monthLength" :key="i" data-id="month0" :class="{active: activeIndex == i}" @click="activeIndex = i" :style="{width: btnWidth}">
        <span>{{formartMonth(currentYear, currentMonth + 1 + i)}}</span>
      </li>
    </ul>
    <ul class="week-ul ul-box week-more">
      <li>日</li>
      <li>一</li>
      <li>二</li>
      <li>三</li>
      <li>四</li>
      <li>五</li>
      <li>六</li>
    </ul>
    <ul id="ul" class="date-picker__bd ul-box">
      <li :class="d.class" v-for="(d, i) in days" :key="i">
        <div :data-date="d.date" class="noCurrentDate dayStyle">
          <span>{{d.day}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "sp-date-picker",
  props: {
    data: {
      //数据
      type: Array,
      default: () => {
        return [];
      }
    },
    type: {
      //日期组件类型
      type: Number,
      default: 1
    },
    anim: {
      //是否开启动画
      type: Boolean,
      default: true
    },
    animTime: {
      //动画时长
      type: Number,
      default: 800
    },
    acrossMouthShow: {
      //是否显示跨月月份
      type: Boolean,
      default: true
    },
    tagShow: {
      //是否显示标签
      type: Boolean,
      default: true
    },
    today: {
      //是否显示当天日期为 今天
      type: Boolean,
      default: true
    },
    showOneMonth: {
      //是否只展示一个月的内容
      type: Boolean,
      default: true
    },
    monthLength: {
      //可选月份数量 最大值4
      type: Number,
      default: 2
    },
    date: "2018/5/4",
    tag: [1, 2, 3],
    tagColor: ["#f80", "#58d321", "#fa5555"]
  },
  data() {
    return {
      curDate: "",
      year: "",
      month: "",
      day: "",
      currentYear: "",
      currentMonth: "",
      currentDay: "",
      activeIndex: 1,
      fullDay: 0, //当月总天数
      total: 0, //元素总个数
      startWeek: 0, //当月第一天是周几
      preMonthLastDay: 0, //上月最后一天
      selectedDate: 0 //当天
    };
  },
  created() {
    this.curDate = this.date ? new Date(this.date) : new Date();
    this.year = this.currentYear = this.curDate.getFullYear();
    this.month = this.currentMonth = this.curDate.getMonth();
    this.day = this.currentDay = this.curDate.getDate();
    this.monthLength =
      this.monthLength > 4 ? 4 : this.monthLength < 1 ? 1 : this.monthLength;
    this.fullDay = new Date(this.year, this.month + 1, 0).getDate();
    this.total =
      (this.fullDay + this.startWeek) % 7 == 0
        ? this.fullDay + this.startWeek
        : this.fullDay +
          this.startWeek +
          (7 - (this.fullDay + this.startWeek) % 7); //元素总个数
    this.startWeek = new Date(this.year, this.month, 1).getDay(); //当月第一天是周几
    this.preMonthLastDay = new Date(this.year, this.month, 0).getDate(); //上月最后一天
  },
  computed: {
    btnWidth() {
      var re = /([0-9]+\.[0-9]{2})[0-9]*/,
        width = 100 / this.monthLength + "";
      return width.replace(re, "$1") + "%";
    },
    days() {
      var arr = [];
      for (let i = 0; i < this.total; i++) {
        var starday = this.startWeek,
          nowDate = this.formartDate(this.year, this.month + 1,(i + 1 - this.startWeek), '-');

        if (i < this.startWeek) {
          arr.push({date: nowDate, class: 'other-month', day: this.preMonthLastDay - starday + 1 + i});
        } else if (i < this.startWeek + this.fullDay) {
          arr.push({date: nowDate, class: 'noCurrent-month', day: i + 1 - this.startWeek});
        } else {
          arr.push({date: nowDate, class: 'other-month', day: i + 1 - (this.startWeek + this.fullDay)});
        }
      }
      return arr;
    }
  },
  methods: {
    //日期格式化
    formartDate(y, m, d, symbol) {
      symbol = symbol || "-";
      m = m.toString()[1] ? m : "0" + m;
      d = d.toString()[1] ? d : "0" + d;
      return y + symbol + m + symbol + d;
    },
    numToDouble(m) {
      m = m.toString()[1] ? m : "0" + m;
      return m;
    },
    //带数字的日期格式化
    formartMonth(y, m, yVal, mVal) {
      yVal = yVal ? yVal : "年";
      mVal = mVal ? mVal : "月";
      m = m.toString()[1] ? m : "0" + m;
      if (m <= 12) {
        return y + yVal + m + mVal;
      } else if (m > 12) {
        m = m % 12;
        y += 1;
        return y + yVal + m + mVal;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
// header
//盒子
.date-picker {
  width: 320px;
  padding: 10px 10px 20px;
  font-size: 13px;
  margin-bottom: 10px;
  background-color: #fff;
  box-shadow: 0 2px 15px 2px #e3e3e3;
}

//年月
.date-picker__hd {
  display: block;
  overflow: hidden;
  padding: 0 20px 10px;
  li {
    text-align: center;
    span {
      display: inline-block;
      padding: 10px 0;
    }
  }
}
.date-picker__hd-more {
  //多月模式
  background-color: transparent;
  li {
    float: left;
    &.active span {
      background-color: transparent;
      color: #f65454;
    }
  }
  span {
    width: 80%;
    margin: 0 10%;
    &:hover {
      cursor: pointer;
    }
  }
}

//周
.week-ul {
  border-bottom: 1px solid #ddd;
}

.calendar .week-ul {
  background-color: #f5f5f5;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  border-bottom: 0;
}
.calendar .week-more {
  //多月模式
  background-color: #535d63;
  color: #fff;
}

.ul-box {
  overflow: hidden;
  & > li {
    float: left;
    width: 14.28%;
    height: 30px;
    line-height: 30px;
    text-align: center;
  }
}

.date-picker__bd.ul-box {
  & > li {
    height: 36px;
    line-height: 36px;
  }
}
.today {
  flex: 1;
  text-align: center;
}

.currentDate {
  border-radius: 50%;
  overflow: hidden;
  &.sp-data-color {
    font-weight: bold;
    color: #f65454;
    cursor: pointer;
    display: inline-block;
    width: 36px;
    height: 36px;
    &:hover {
      background: #f80;
      color: #fff;
    }
    &.selected-style {
      color: #fff;
    }
  }
}

.date-picker.calendar {
  position: relative;
  width: 100%;
  padding: 0;
  min-width: 400px;
  box-shadow: none;
  .date-picker__hd-more {
    //多月模式
    li {
      &.active span {
        background-color: #535d63;
        color: #fff;
      }
    }
  }
  .date-picker__hd {
    padding: 0 20px;
    border-left: 1px solid #ccc;
    border-top: 1px solid #ccc;
    border-right: 1px solid #ccc;
    background-color: #f5f5f5;
  }
  .sp-loding {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #000;
    opacity: 0.3;
    text-align: center;
    i {
      color: #fff;
      font-size: 30px;
      line-height: 326px;
    }
  }
  .current-month {
    position: relative;
  }
  .icon-prev-year,
  .icon-prev-month,
  .icon-next-year,
  .today {
    display: none;
  }
  .tomonth {
    display: block;
  }
  .date-picker__bd {
    border-right: 1px solid #ccc;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    & > li {
      height: 50px;
      text-align: left;
      font-size: 12px;
    }
  }
  .dayStyle {
    width: 100%;
    height: 100%;
    line-height: 16px;
    border-left: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }
  .currentDate {
    position: relative;
    border-radius: 0;
    cursor: pointer;
    transition: all 0.1s;
    &.selected-style {
      cursor: default;
      pointer-events: none;
    }
    .click-box {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      opacity: 0;
      z-index: 10;
    }
    .money {
      color: #f65454;
      font-weight: bold;
      margin-left: 2px;
      text-align: center;
    }
    .data {
      margin-left: 4px;
    }
    .number {
      text-align: center;
      color: #888;
    }
    .tag-box {
      position: absolute;
      top: 1px;
      right: 1px;
      display: block;
    }
    &:hover {
      background: #f80;
      color: #fff;
      .money,
      .number {
        color: #fff;
      }
    }
  }
  .other-month,
  .noCurrent-month {
    span {
      margin-left: 4px;
    }
  }
  .monthClass1,
  .monthClass2 {
    display: block;
  }
}

//复制的节点
#clone-node {
  position: fixed;
  width: 67.2px;
  height: 51px;
  z-index: 10000;
}

.selected-style {
  //选中
  background: #f80;
  color: #fff;
  .money,
  .number {
    color: #fff !important;
  }
}

.other-month {
  color: #999;
}

.today-style {
  background: #58d321;
}

.marginAauto {
  margin: 0 auto;
}

#h3Ele {
  text-align: center;
  padding: 10px;
}

.date-picker .iconfont {
  cursor: pointer;
  font-size: 10px;
}

.noCurrent-month {
  &:hover {
    cursor: default;
  }
}

//默认样式
#cutData {
  vertical-align: middle;
  line-height: 30px;
  z-index: 10000;
}

.el-button-danger-line {
  color: #fa5555;
  background-color: #fff;
  border-color: #fa5555;
}

.el-button-danger-line:hover,
.el-button-danger-line:active,
.el-button-danger-line:focus {
  color: #fff;
  background-color: #fa5555;
  border-color: #fa5555;
}

.sp-option-tb {
  border: 1px solid #ddd;
  li {
    text-align: center;
    display: block;
    padding: 10px;
    cursor: pointer;
    &.active {
      border-top: 2px solid #fa5555;
      font-weight: bold;
      border-right: 1px solid #ccc;
      border-left: 1px solid #ccc;
    }
    a {
      color: #fa5555;
      font-weight: bold;
    }
  }
}

.monthClass1,
.monthClass2 {
  position: relative;
  display: inline-block;
  &::after {
    content: "";
    background-color: rgb(241, 196, 144);
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.1;
    z-index: 1;
  }
}
.monthClass2 {
  &::after {
    opacity: 0.2;
  }
}

.first-monthClass {
  &::before {
    content: "";
    display: inline-block;
    width: 26px;
    height: 16px;
  }
  .nextYue {
    position: absolute;
    top: 0;
    left: 4px;
  }
  .data {
    display: none;
  }
}

//标签
.tag {
  text-align: center;
  float: right;
  background-color: #fa5555;
  color: #fff;
  width: 14px;
  height: 14px;
  line-height: 13px;
  font-size: 10px;
  &.more {
    background-color: #58d321;
  }
  &.hot {
    background-color: #f80;
  }
  & + .tag {
    margin-right: 1px;
  }
}
</style>


