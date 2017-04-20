<template>
  <div class="container bmap-container">
    <div class='header'>
      <span class='go-back'>
        <a href="/uposition">
          <i class="el-icon-arrow-left"></i>
          返回 
        </a>
      </span>
      选择位置
    </div>
    <div class='search-chip'>
      <el-input
        placeholder="搜索"
        icon="search"
        v-model="search"
        @change="change">
      </el-input>
    </div> 
    <div id="allmap"></div> 
    <div class='l-result' >
      <li v-for='(item,index) in results' @click='select(item)'>
        <p class='title'>
          {{item.title}}
        </p>
        <p class='address'>{{item.address}}</p>
      </li>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      password: '',
      results: [],
      checked: false,
      search: ''
    }
  },
  mounted: function () {
    this.init();
  },
  methods: {
    init () {
      var map = this.map = new BMap.Map("allmap");
      //var point = new BMap.Point(116.331398,39.897445);
      map.centerAndZoom('石家庄',12);
      var geolocation = new BMap.Geolocation();
      var geoc = new BMap.Geocoder();
      var me = this;
      geolocation.getCurrentPosition(function(r){
        if(this.getStatus() == BMAP_STATUS_SUCCESS){
          var mk = me.mk = new BMap.Marker(r.point);
          map.addOverlay(mk);
          map.panTo(r.point);
          map.setZoom(16);
          //alert('您的位置：'+r.point.lng+','+r.point.lat);
          geoc.getLocation(r.point, function(rs){
            var addComp = rs.addressComponents;
            var address = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
            me.search = address;
          });  
        }
        else {
          alert('failed'+this.getStatus());
        }        
      },{enableHighAccuracy: true})
      this.map = map;
    },
    change () {
      var me = this;
      var options = {
        onSearchComplete: function(results){
          // 判断状态是否正确
          if (local.getStatus() == BMAP_STATUS_SUCCESS){
            var s = [];
            for (var i = 0; i < results.getCurrentNumPois(); i ++){
              //console.log(results.getPoi(i).point);
              var item={};
              item.title=results.getPoi(i).title;
              item.address=results.getPoi(i).address;
              item.point=results.getPoi(i).point;
              s.push(item);
            }
            //me.radio = '1';
            me.results = s;
            //document.getElementById("r-result").innerHTML = s.join("<br/>");
          }
        }
        //renderOptions:{map: this.map}
      };
      //alert(this.input);
      var local = new BMap.LocalSearch(this.map, options);
      local.search(this.search);
    },
    select (item) {
      this.map.panTo(item.point);
      this.mk.setPosition(item.point);
      var location = {
        title: item.title,
        point: item.point
      }
      sessionStorage.setItem('location',JSON.stringify(location));
      window.location.href = '/uposition';
    }
  }
}
</script>

