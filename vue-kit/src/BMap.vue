<template>
  <div class="contanier bmap-container">
    <div id="allmap"></div>
    <el-input v-model="street" placeholder="请输入地址" @change="change"></el-input>
    <div class='l-result' v-show = '!selected'>
      <li v-for='(item,index) in results' @click='select(item)'>
        <p class='title'>
          {{item.title}}
        </p>
        <p class='address'>{{item.address}}</p>
      </li>
    </div>
    <el-input v-model="door" placeholder="请输入门牌号"></el-input>
    <el-upload
      action="/apis/upload"
      type="drag"
      :thumbnail-mode="true"
      :on-success="handleSuccess"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :default-file-list="fileList"
    >
      <i class="el-icon-upload"></i>
      <div class="el-dragger__text"><em>上传影像</em></div>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <div class='btn-chip'>
       <el-button type="primary" @click.native="startHacking">提交</el-button>
    </div>
    <div class='preview' v-show='preview' @click="hidePreview">
      <img :src="previewImg"/>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      street: '',
      door: '',
      poinit: null,
      results: [],
      fileList: [],
      selected: false,
      previewImg:'',
      preview: false,
      filepath:''
    }
  },
  mounted: function () {
    this.init();
  },
  methods: {
    init () {
      var map = new BMap.Map("allmap");
      //var point = new BMap.Point(116.331398,39.897445);
      map.centerAndZoom('石家庄',12);

      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function(r){
        if(this.getStatus() == BMAP_STATUS_SUCCESS){
          var mk = new BMap.Marker(r.point);
          map.addOverlay(mk);
          map.panTo(r.point);
          map.setZoom(16);
          //alert('您的位置：'+r.point.lng+','+r.point.lat);
        }
        else {
          alert('failed'+this.getStatus());
        }        
      },{enableHighAccuracy: true})
      this.map = map;
    },
    startHacking () {
      if(!this.point){
        this.$message.error('请在下拉列表选择地址');
      }else if(!this.door){
        this.$message.error('请填写门牌号');
      }else if(!this.filepath){
        this.$message.error('请上传影像');
      }else{
        fetch('/apis/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            street: this.street,
            door: this.door,
            point: this.point,
            filepath: this.filepath
          })
        })
      }
    },
    search () {
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
      local.search(this.street);
    },
    /**
     * [throttle 节流]
     * @param  {[type]} delay  [ 延迟时间，单位毫秒]
     * @param  {[type]} action [实际应用需要调用的函数]
     * @return {[type]}        [返回客户调用函数]
     */
    throttle (delay, action) {
      var last = 0;
      return function(){
        var curr = +new Date();
        //console.log(curr);
        if (curr - last > delay){
          action.apply(this, arguments);
          last = curr; 
        }
      }
    },
    change () {
      //console.log('a');
      if(this.street == '')
        this.selected = false;
      if(!this.selected)
        this.throttle(5000,this.search());
    },
    select (item) {
      //console.log(point.lng)
      this.selected = true;
      this.street = item.title;
      this.point = item.point;
    },
    handleSuccess(response, file, fileList) {
      this.filepath = response[0].path;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
      this.previewImg = file.url;
      this.preview = true;
    },
    hidePreview () {
      this.preview = false;
    }
  }
}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}
</style>
