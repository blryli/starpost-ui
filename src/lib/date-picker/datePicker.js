/**
 * @desc date-picker
 * @author blryli
 * @date  2018-3-12 14:00:39
 */

;(function(undefined) {
  var _global;
  
  //日期格式化
  function formartDate(y, m, d, symbol) {
    symbol = symbol || "-";
    m = m.toString()[1] ? m : "0" + m;
    d = d.toString()[1] ? d : "0" + d;
    return y + symbol + m + symbol + d;
  }
  function numToDouble(m) {
    m = m.toString()[1] ? m : "0" + m;
    return m;
  }
  

  function datePicker(opt) {
    this.init(opt);
  }
  datePicker.prototype = {
    constructor: this,
    init: function(opt) {
      var config = {// 默认参数
        el: '#dateEL',
        inputEL: '#inputEL',
        // date: "2018/3/11",//默认日期
        saleData: [],//数据
        type: 1,//日期组件类型
        anim: true,//是否开启动画
        animTime: 800,//动画时长
        acrossMouthShow: true,//是否显示跨月月份
        tagShow: true,//是否显示标签
        today: true,//是否显示当天日期为 今天
        showOneMonth: true,//是否只展示一个月的内容
        monthLength: 3,//可选月份数量 最大值4
        tag: [1, 2, 3],
        tagColor: ['#f80', '#58d321', '#fa5555'],
        clickCb: function() {}
      };
      this.def = this.extend(config, opt, true);
      this.el = document.querySelector(this.def.el);
      this.inputEL = document.querySelector(this.def.inputEL);
      this.curDate = this.def.date ? new Date(this.def.date) : new Date();
      this.year = this.currentYear = this.curDate.getFullYear();
      this.month = this.currentMonth = this.curDate.getMonth();
      this.day = this.currentDay = this.curDate.getDate();
      this._init(this.def);
    },
    //带数字的日期格式化
    formartMonth: function(y, m, yVal, mVal) {
      yVal = yVal ? yVal : '';
      mVal = mVal ? mVal : '';
      m = m.toString()[1] ? m : "0" + m;
      if (m <= 12) {
        return y + yVal + m + mVal;
      } else if (m > 12) {
        m = m % 12;
        y += 1;
        return y + yVal + m + mVal;
      }
    },
    _init: function(def) {
      var isActive = '',
        headercut = '',
        re = /([0-9]+\.[0-9]{2})[0-9]*/;
      this.def.monthLength = this.def.monthLength > 4 ? 4 : this.def.monthLength < 1 ? 1 : this.def.monthLength;
      var width = 100 / this.def.monthLength + '';
      width = width.replace(re, '$1');
      for (var i = 0; i < this.def.monthLength; i++) {
        isActive = i == 0 ? 'active' : '';
        headercut += '<li class="' + isActive + '" data-time="' + this.currentYear + '-' + (this.currentMonth + 1 + i) + '" data-id="month' + i + '" style="width: ' +
        width + '%">' + '<span>' + this.formartMonth(this.currentYear, this.currentMonth + 1 + i, '年', '月') + '</span>' + '</li>'
      }
      var DPheader1 = '<ul class="schedule-hd">' + '<li><span>' + this.formartMonth(this.currentYear, this.currentMonth + 1, '年', '月') + "</span></li>" + "</ul>",
        DPheader2 = '<ul class="schedule-hd schedule-hd-more" id="schedule-hd">' + headercut + "</ul>",
        weekClass = this.def.showOneMonth ? '' : 'week-more',
        datePickerWeek = '<ul class="week-ul ul-box '+ weekClass +'">' + "<li>日</li>" + "<li>一</li>" + "<li>二</li>" + "<li>三</li>" + "<li>四</li>" +  "<li>五</li>" + "<li>六</li>" + "</ul>",
        datePickerBd = '<ul id="ul" class="schedule-bd ul-box" ></ul>',
        datePickerHd = this.def.showOneMonth ? DPheader1 : DPheader2,
        DPinput = '<input type="button" class="date-picker-input">';
        topClass = this.def.type == 1 ? 'date-picker calendar' : 'date-picker';
      this.el.setAttribute('class', topClass)
      this.el.innerHTML =  datePickerHd + datePickerWeek + datePickerBd;
      this.bindEvent(def);
      this.render(def);
    },
    // 对象合并
    extend: function(o, n, override) {
      for (var key in n) {
        if (n.hasOwnProperty(key) && (!o.hasOwnProperty(key) || override)) {
          o[key] = n[key];
        }
      } return o;
    },
    render: function(def) {
      var saleData = def.saleData ? def.saleData : [],
        year =  this.year,
        month = this.month,
        day = this.day,
        currentYear = this.currentYear,
        currentMonth = this.currentMonth,
        currentDay = this.currentDay,
        selectedDate = this.selectedDate,//选中日期
        fullDay = new Date(year, month + 1, 0).getDate(), //当月总天数
        nextFullDay = new Date(year, month + 2, 0).getDate(), //下月总天数
        startWeek = new Date(year, month, 1).getDay(), //当月第一天是周几
        dayNow = new Date(currentYear, currentMonth, currentDay).getDate(), //当天是几号
        total = (fullDay+startWeek)%7 == 0 ? (fullDay+startWeek) : fullDay+startWeek+(7-(fullDay+startWeek)%7),//元素总个数
        lastMonthDay = new Date(year, month, 0).getDate(), //上月最后一天
        eleTemp = [],
        kuayue = false,
        starday = startWeek,
        dayRow = (dayNow + starday) / 7;
      dayRow = isInteger(dayRow) ? parseInt(dayRow - 0.2) : parseInt(dayRow);
        function isInteger(obj) {//判断是否为正整数
          return (obj | 0) === obj
         }
      //完全展示一个月
      if(this.def.showOneMonth) {
        for (var i = 0; i < 63; i++) {
          var addClass = '',
            nowDate = '',
            kuayueNum = 0,
            index = '';
          if(i < (starday + fullDay)){
            nowDate = formartDate(year, month + 1, i + 1 - starday, "-");
          }else if(i < (starday + fullDay + nextFullDay)){
            nowDate = formartDate(year, month + 2, i + 1 - (starday + fullDay), "-");
            startWeek = starday + fullDay;
          }else {
            nowDate = formartDate(year, month + 3, i + 1 - (starday + fullDay + nextFullDay), "-");
            startWeek = starday + fullDay + nextFullDay;
          }
          selectedDate == nowDate && (addClass = "selected-style");//选中日期
          kuayue = (nowDate.split("-")[1] - numToDouble(month + 1) != 0);//跨月
          kuayue && (kuayueNum = (nowDate.split("-")[1] - numToDouble(month + 1)));//跨月数量
          if (formartDate(currentYear, currentMonth + 1, currentDay, "-") == nowDate) {//当天
            addClass = "today-flag";
            selectedDate == nowDate && (addClass = "today-flag selected-style");
            if (kuayue) {
              selectedDate == nowDate && (addClass = "today-flag selected-style monthClass"+kuayueNum);
            }
          }
          if (kuayue) {
            addClass = "monthClass"+kuayueNum;
            selectedDate == nowDate && (addClass = "selected-style monthClass"+kuayueNum);
          }
          if (i < startWeek) {
            eleTemp.push('<li class="other-month"><div data-date=' + nowDate + ' class="dayStyle"><span>' + (lastMonthDay - starday + 1 + i) + "</span></div></li>|");
          } else{
            if (saleData) { // 判断有没有数据
              if (this.def.type == '1') { //组件类型1
                for (var j = 0; j < saleData.length; j++) {
                  var unit = saleData[j].unit == "kg" ? "kg" : "cbm";
                  if (saleData[j].data == nowDate) { //当天是否有活动
                    if (i + 1 - starday >= currentDay) {//大于等于当天时间
                      eleTemp.push(
                        '<li class="current-month" ><div data-date=' + nowDate + ' class="currentDate dayStyle ' + addClass + '"><span class="data">' +
                        (i + 1 - startWeek) + '</span><div class="number">余' + '<span class="min-unit">' + saleData[j].count + "</span>" +
                          '</div><div class="money">' + '¥<span class="count" data-par=' + saleData[j].par + ">" + saleData[j].money + "</span>/" +
                          '<span class="unit">' + unit + "</span></div>" + '<span class="tag-box"></span><div class="click-box"></div>' + "</div></li>|"
                      );
                      index = i;
                    }else if(i == 0){
                      eleTemp.push('<li class="noCurrent-month" ><div data-date=' + nowDate + ' class="noCurrentDate dayStyle ' + addClass + '"><span>' + (i + 1 - startWeek) + "</span></div></li>|");
                    }
                  }
                }
                if (i != index) {
                  eleTemp.push('<li class="noCurrent-month" ><div data-date=' + nowDate + ' class="noCurrentDate dayStyle ' + addClass + '"><span>' + (i + 1 - startWeek) + "</span></div></li>|");
                }
              }else {//组件类型2
                for (var j = 0; j < saleData.length; j++) {
                  if (saleData[j].data == nowDate) {
                    if (i + 1 - starday >= currentDay) {//大于等于当天时间
                      eleTemp.push('<li class="current-month" ><span data-date=' +nowDate +' class="currentDate dayStyle sp-data-color ' +addClass +'">' +(i + 1 - startWeek) +"</span></li>|");
                      index = i;
                    }else if (i == 0) {
                      eleTemp.push('<li class="noCurrent-month" ><span data-date=' +nowDate +' class="dayStyle ' +addClass +'">' +(i + 1 - startWeek) +"</span></li>|");
                    }
                  }
                }
                if (i != index) {
                  eleTemp.push('<li class="noCurrent-month" ><span data-date=' +nowDate +' class="dayStyle ' +addClass +'">' +(i + 1 - startWeek) +"</span></li>|");
                }
              }
            }else {
              eleTemp.push('<li class="current-month" ><div data-date=' +nowDate +' class="currentDate dayStyle ' +addClass +'">' +(i + 1 - startWeek) +"</div></li>|");
            }
          }
        }
        eleTemp = eleTemp.join("").split('|');
        var liNode = [];
        for (var i = 0; i < 63; i++) {
          if (i >= dayRow *7 && i < (dayRow *7) + 35) {
            liNode.push(eleTemp[i]);//添加当日算起的一个月日期
          }
        }
        document.getElementById("ul").innerHTML = liNode.join("");
        this.def.acrossMouthShow && this.acrossMouth(month,kuayueNum);// 跨月 显示下月月份
      }else {//分月展示
        for (var i = 0; i < total; i++) {
          var addClass = '',
            nowDate = formartDate(year, month + 1,(i + 1 - startWeek), '-'),
            index = '';
            selectedDate == nowDate && (addClass = "selected-style");//选中日期
            if (formartDate(currentYear, currentMonth + 1, currentDay, "-") == nowDate) {//当天
              addClass = "today-flag";
              selectedDate == nowDate && (addClass = "today-flag selected-style");
            }
          if (i < startWeek) {
            eleTemp.push('<li class="other-month"><div data-date=' + nowDate + ' class="dayStyle"><span>' + (lastMonthDay - starday + 1 + i) + "</span></div></li>|");
          } else if(i<(startWeek+fullDay)){
            if (saleData) { // 判断有没有数据
              if (this.def.type == 1) { //组件类型1
                for (var j = 0; j < saleData.length; j++) {
                  var unit = saleData[j].unit == "kg" ? "kg" : "cbm";
                  if (saleData[j].data == nowDate) { //当天是否有活动
                    if (i + 1 - starday >= currentDay) {//大于等于当天时间
                      eleTemp.push(
                        '<li class="current-month" ><div data-date=' + nowDate + ' class="currentDate dayStyle ' + addClass + '"><span class="data">' +
                        (i + 1 - startWeek) + '</span><div class="number">余' + '<span class="min-unit">' + saleData[j].count + "</span>" +
                          '</div><div class="money">' + '¥<span class="count" data-par=' + saleData[j].par + ">" + saleData[j].money + "</span>/" +
                          '<span class="unit">' + unit + "</span></div>" + '<span class="tag-box"></span><div class="click-box"></div>' + "</div></li>|"
                      );
                      index = i;
                    }else if(i == 0){
                      eleTemp.push('<li class="noCurrent-month" ><div data-date=' + nowDate + ' class="noCurrentDate dayStyle ' + addClass + '"><span>' + (i + 1 - startWeek) + "</span></div></li>|");
                    }
                  }
                }
                if (i != index) {
                  eleTemp.push('<li class="noCurrent-month" ><div data-date=' + nowDate + ' class="noCurrentDate dayStyle ' + addClass + '"><span>' + (i + 1 - startWeek) + "</span></div></li>|");
                }
              }else {//组件类型2
                for (var j = 0; j < saleData.length; j++) {
                  if (saleData[j].data == nowDate) {
                    if (i + 1 - starday >= currentDay) {//大于等于当天时间
                      eleTemp.push('<li class="current-month" ><span data-date=' +nowDate +' class="currentDate dayStyle sp-data-color ' +addClass +'">' +(i + 1 - startWeek) +"</span></li>|");
                      index = i;
                    }else if(i == 0){
                      eleTemp.push('<li class="noCurrent-month" ><div data-date=' + nowDate + ' class="noCurrentDate dayStyle ' + addClass + '"><span>' + (i + 1 - startWeek) + "</span></div></li>|");
                    }
                  }
                }
                if (i != index) {
                  eleTemp.push('<li class="noCurrent-month" ><span data-date=' +nowDate +' class="dayStyle ' +addClass +'">' +(i + 1 - startWeek) +"</span></li>|");
                }
              }
            }else {
              eleTemp.push('<li class="current-month" ><div data-date=' +nowDate +' class="currentDate dayStyle ' +addClass +'">' +(i + 1 - startWeek) +"</div></li>|");
            }
          }else {
            eleTemp.push('<li class="other-month"><div data-date=' + nowDate + ' class="dayStyle"><span>' + (i + 1 - (startWeek + fullDay)) + "</span></div></li>|");
          }
        }
        eleTemp = eleTemp.join('').replace(/\|/g,"");
        document.getElementById("ul").innerHTML = eleTemp;
      }
      this.def.today == true && this.toDay();//当天显示为今天
      (this.def.type == '1' && this.def.tagShow) && this.addTag(saleData);// 添加标签
    },
    //事件
    bindEvent: function(def) {
      var self = this;
      this.isAnimate = false;
      this.el.addEventListener(
        "click",
        function(e) {
          var dataTime = e.target.parentNode.getAttribute('data-time');
          //月份切换
          if(!self.def.showOneMonth && dataTime) {
            var li = document.getElementById('schedule-hd').getElementsByTagName('li');
            for (var i = 0; i < li.length; i++) {
              li[i].classList.remove('active');
            }
            e.target.parentNode.classList.add('active');

            var time = dataTime.split('-');
            self.year = time[0];
            self.month = time[1] - 1;
            self.render(self.def);
          }
          //点击日期框获取日期
          var eNode = self.def.type == '1' ? e.target.parentNode : e.target;
          if (eNode.className.indexOf("currentDate") > -1) {
            self.selectedDate = eNode.getAttribute("data-date");
            self.mouth = self.selectedDate.split("-")[1];
            self.day = self.selectedDate.split("-")[2];
            self.render(self.def);
            self.def.clickCb && self.def.clickCb(self.selectedDate);
          }
          
          if (self.def.type != '1' || eNode.querySelector(".selected-style") || !eNode.querySelector(".click-box") || !self.def.anim) return;;
          self.animateFn();
        },
        false
      )
    },
    //当天显示为今天
    toDay: function() {
      if(this.month != this.curDate.getMonth()) return;
      if (this.el.querySelector(".today-flag").querySelector(".data")) {
        this.el.querySelector(".today-flag").querySelector(".data").innerHTML =
          "今天";
      } else {
        this.el.querySelector(".today-flag").innerHTML = "今天";
      }
    },
    // 跨月 显示下月月份
    acrossMouth: function(month) {
      this.el.querySelector(".monthClass1") && this.el.querySelector(".monthClass1").classList.add("first-monthClass");
      this.el.querySelector(".monthClass2") && this.el.querySelector(".monthClass2").classList.add("first-monthClass");
      var firstmonthClass = document.getElementsByClassName("first-monthClass");
      for (var i = 0; i < firstmonthClass.length; i++) {
        var kuayueHtml = firstmonthClass[i].innerHTML,
          firstDay = firstmonthClass[i].firstChild,
          nextYue = document.createElement("strong");
        if (firstDay.innerHTML == 1) {
          firstmonthClass[i].removeChild(firstmonthClass[i].childNodes[0]);
        }
        nextYue.setAttribute("class", "nextYue");
        nextYue.innerHTML = kuayueHtml == 1 ? month + 2 + i + "月" : month + 2 + i + "月1";
        firstmonthClass[i].appendChild(nextYue);
      }
    },
    // 添加标签
    addTag: function(saleData) {
      var array = this.el.getElementsByClassName("currentDate");
      for (var index = 0; index < saleData.length; index++) {
        this.def.tag
        console.log()
        // var newHot = document.createElement("span");
        // newHot.setAttribute("class", "tag hot");
        // for (var i = 0; i < array.length; i++) {
        //   var newHot = document.createElement("span"),
        //     newDuo = document.createElement("span"),
        //     newShao = document.createElement("span");
        //   newHot.setAttribute("class", "tag hot");
        //   newHot.innerHTML = this.def.tag.orange;
        //   newShao.setAttribute("class", "tag");
        //   newShao.innerHTML = this.def.tag.red;
        //   newDuo.setAttribute("class", "tag more");
        //   newDuo.innerHTML = this.def.tag.green;
        //   if (array[i].getAttribute("data-date") == saleData[index].data) {
        //     if (saleData[index].more) {
        //       array[i].querySelector(".tag-box").appendChild(newDuo);
        //     } else {
        //       array[i].querySelector(".tag-box").appendChild(newShao);
        //     }
        //     if (saleData[index].hot) {
        //       array[i].querySelector(".tag-box").appendChild(newHot);
        //     }
        //   }
        // }
      }
    },
    //动画
    animateFn: function() {
      var self = this,
      countValue = this.el.querySelector(".selected-style"),
      clonedNode = countValue.cloneNode(true), // 克隆节点
      starX = countValue.getBoundingClientRect().left,
      starY = countValue.getBoundingClientRect().top,
      cutData = this.inputEL,//目标点
      endX = cutData.getBoundingClientRect().left,
      endY = cutData.getBoundingClientRect().top;
      clonedNode.setAttribute("id", "clone-node"); //添加ID
      countValue.parentNode.appendChild(clonedNode); // 在父节点插入克隆的节点
      clonedNode.style.left = starX + "px";
      clonedNode.style.top = starY + "px";
      this.isAnimate = true;
      $(clonedNode).animate({ left: endX + 50, top: endY + 12, width: 10, height: 8},self.def.animTime,
        function() {
          self.isAnimate = false;
          countValue.parentNode.removeChild(clonedNode);
        }
      )
    },
    animate: function(obj, json, interval, sp, fn) {
      clearInterval(obj.timer);
      function getStyle(obj, arr) {
        return obj.currentStyle ? obj.currentStyle[arr] : document.defaultView.getComputedStyle(obj, null)[arr]; 
      }
      obj.timer = setInterval(function(){
          var flag = true;
        for (var arr in json) {
            var icur = arr == "opacity" ? Math.round(parseFloat(getStyle(obj, arr))*100) : icur = parseInt(getStyle(obj, arr));
              var speed = (json[arr] - icur) * sp;
              speed = speed > 0 ? Math.ceil(speed): Math.floor(speed);
              icur != json[arr] && (flag = false);
              if(arr == "opacity"){
                  obj.style.filter = "alpha(opacity : '+(icur + speed)+' )";
                  obj.style.opacity = (icur + speed)/100;
              }else {
                  obj.style[arr] = icur + speed + "px";
              }
          }
  
          if(flag){
              clearInterval(obj.timer);
              fn && fn();
          }
      },interval);
    }
  };

  //将插件暴露给全局对象
  _global = (function() {
    return this || (0, eval)("this");
  })();
  //判断是否存在加载器，如果存在加载器，我们就使用加载器，如果不存在加载器。我们就使用顶级域对象
  if (typeof module !== "undefined" && module.exports) {
    module.exports = datePicker;
  } else if (typeof define === "function" && define.amd) {
    define(function() {
      return datePicker;
    });
  } else {
    !("datePicker" in _global) && (_global.datePicker = datePicker);
  }
})();
