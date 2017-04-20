<template>
  <div class="container">
    <div class='header'>
      <span class='go-back'>
        <a href="/plist">
          <i class="el-icon-arrow-left"></i>
          返回
        </a>
      </span>
      上传影像
      <a class='header-right' href="/mlist">提交</a>
    </div>
    <div class='page-body'>
      <el-input type="textarea" v-model="desc" placeholder = '添加描述...'></el-input>
        <div class="flex-box pic-card">
        <div class='flex-item flex-box flex-center'>
          <label for="fileElem">
            <i class="el-icon-plus"></i>
          </label>
          <input type="file" id="fileElem" multiple accept="image/*" @change="handleFiles(this.files)">
        </div>
        <div class='flex-item'></div>
        <div class='flex-item'></div>
        <div class='flex-item'></div>
        <div class='flex-item'></div>
      </div> 
      <div class='sl-position' @click = 'slPosition'>
        <span class='sl-title'>{{title}}</span>
        <i class="el-icon-arrow-right"></i>
      </div>  
    </div>
  </div>
</template>

<script>
export default {
  data () {
    var title = '所在位置';
    if(sessionStorage.location){
      var location = JSON.parse(sessionStorage.location);
      title = location.title;
    }
   
    return {
      name: '',
      password: '',
      desc: '',
      title: title,
      fileList: []
    }
  },

  methods: {
    slPosition () {
      window.location.href='/slposition';
    },
    handlePreview(file) {
      console.log(file);
    },
    handleFiles(files) {
      if (!files.length) {
        fileList.innerHTML = "<p>No files selected!</p>";
      } else {
        fileList.innerHTML = "";
        var list = document.createElement("ul");
        fileList.appendChild(list);
        for (var i = 0; i < files.length; i++) {
          var li = document.createElement("li");
          list.appendChild(li);
          
          var img = document.createElement("img");
          img.src = window.URL.createObjectURL(files[i]);
          img.height = 60;
          img.onload = function() {
            window.URL.revokeObjectURL(this.src);
          }
          li.appendChild(img);
          var info = document.createElement("span");
          info.innerHTML = files[i].name + ": " + files[i].size + " bytes";
          li.appendChild(info);
        }
      }
    }
  }
}
</script>

