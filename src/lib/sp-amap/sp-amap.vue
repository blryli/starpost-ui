<template>
  <div class="sp-amap">
    <el-amap ref="map" vid="amapDemo" :center="center" :zoom="zoom" :plugin="plugin" :events="events">
      <el-amap-marker v-for="(marker, index) in markers" :position="marker.position" :title="marker.address" :events="marker.events" :visible="marker.visible" raise-on-drag="true" :draggable="marker.draggable" :vid="index" :key="index"></el-amap-marker>
    </el-amap>
  </div>
</template>

<script>
export default {
  name: "sp-amap",
  props: {
    markers: {
      type: Array,
      default() {
        return [];
      }
    },
    width: String,
    height: String
  },
  watch: {
    width(val) {
      document.getElementById("sp-amap").style.width = this.width;
    }
  },
  data() {
    return {
      zoom: 9,
      center: [0, 0],
      events: {
        init: o => {
          //创建地图获取城市
          o.getCity(result => {
            this.$emit("getCity", result);
          });
        },
        moveend: () => {},
        zoomchange: () => {},
        click: e => {
          //点击地图获取经纬度和具体地址
          this.getGeocoder(e.lnglat);
        }
      },
      plugin: []
    };
  },
  created() {
    var self = this;
    //工具条
    this.plugin = [
      "ToolBar",
      {
        pName: "MapType",
        defaultType: 0,
        autoPosition: true,
        useNative: true
      },
      {
        //定位插件---------
        pName: "Geolocation",
        events: {
          init(o) {
            // 定位 初始坐标
            o.getCurrentPosition((status, result) => {
              if (result && result.position) {
                self.center = [result.position.lng, result.position.lat];
                let start = {
                  longitude: result.position.lng,
                  latitude: result.position.lat
                };
                // console.log(result);
                self.address = result.formattedAddress;
                self.$nextTick(function() {
                  //距离最近的仓库
                  let arr = [];
                  self.markers.forEach((d, i) => {
                    let end = {
                        longitude: d.position[0],
                        latitude: d.position[1]
                      },
                      num = self.calculateLineDistance(start, end).toFixed(2);
                    self.$set(d, "distance", num);
                    arr.push(num);
                  });
                  let minN = Math.min.apply(null, arr);
                  self.markers.forEach((d, i) => {
                    self.$set(d, "minNumber", minN);
                    if (minN == arr[i]) {
                      this.$emit("get-map-form", d);
                    }
                  });
                });
              }
            });
          },
          click: e => {
            alert("Geolocation");
          }
        }
      }
    ];
  },
  computed: {},
  methods: {
    //获取经纬度和具体地址
    getGeocoder(lnglat) {
      this.$emit("get-geocoder", lnglat);
      let { lng, lat } = lnglat;
      var self = this;
      this.center = [lng, lat];

      // 这里通过高德 SDK 完成。
      var geocoder = new AMap.Geocoder({
        radius: 1000,
        extensions: "all"
      });
      geocoder.getAddress([lng, lat], function(status, result) {
        if (status === "complete" && result.info === "OK") {
          if (result && result.regeocode) {
            self.address = result.regeocode.formattedAddress;
            self.$nextTick(function() {
              // console.log("获取经纬度和具体地址");
            });
          }
        }
      });
    },
    //计算两点间距离
    calculateLineDistance(start, end) {
      let lon1 = Math.PI / 180 * start.longitude;
      let lon2 = Math.PI / 180 * end.longitude;
      let lat1 = Math.PI / 180 * start.latitude;
      let lat2 = Math.PI / 180 * end.latitude;
      // 地球半径
      let R = 6371;
      // 两点间距离 km，如果想要米的话，结果*1000
      let d =
        Math.acos(
          Math.sin(lat1) * Math.sin(lat2) +
            Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1)
        ) * R;
      return d;
    }
  },
  mounted: function() {
    var self = this;
    this.$nextTick(function() {
      //渲染完成添加地图点的点击事件
      this.markers.forEach((d, i) => {
        self.$set(d, "events", {
          click: e => {
            this.$emit("get-map-form", d);
          }
        });
      });
    });
  }
};
</script>

<style lang="scss" scoped>
.sp-amap {
  position: relative;
  width: 500px;
  height: 400px;
}
</style>