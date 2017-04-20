<template>
  <div class="container">
    <div class='header'>
      <span class='go-back'>
        <a href="/plist">
          <i class="el-icon-arrow-left"></i>
          返回
        </a>
      </span>
      客户地理位置
      <a class='header-right' href="/uposition">添加</a>
    </div>
    <div class='list-container'>
      <li class='flex-box' @click = 'goMlist'>
        <div class='flex-item list-icon'>
          <img src="./assets/girl.jpg">
        </div>
        <div class='flex-item'>
          <p>众鑫大厦</p>
          <p>采集时间：2017-2-10 17:55:50</p>
        </div>
        <i class="el-icon-more"></i>
      </li>
      <li class='flex-box'>
        <div class='flex-item list-icon'>
          <img src="./assets/girl.jpg">
        </div>
        <div class='flex-item'>
          <p>勒泰中心</p>
          <p>采集时间：2017-2-10 17:55:50</p>
        </div>
        <i class="el-icon-more"></i>
      </li>
      <li class='flex-box'>
        <div class='flex-item list-icon'>
          <img src="./assets/girl.jpg">
        </div>
        <div class='flex-item'>
          <p>万达广场</p>
          <p>采集时间：2017-2-10 17:55:50</p>
        </div>
        <i class="el-icon-more"></i>
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
      checked: false
    }
  },

  methods: {
    login () {
      window.location.href='/bmap';
    },
    goMlist() {
      window.location.href='/paths';
    }
  }
}
</script>

