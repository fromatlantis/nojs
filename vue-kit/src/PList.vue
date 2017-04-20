<template>
  <div class="container">
    <div class='header'>
      <span class='go-back'>
        <a href="/login">
          <i class="el-icon-arrow-left"></i>
          返回
        </a>
      </span>
      信贷员列表
    </div>
    <div class='list-container'>
      <li class='flex-box' @click = 'goMlist'>
        <div class='flex-item list-icon'>
          <img src="./assets/girl.jpg">
        </div>
        <div class='flex-item'>
          <p>王二</p>
        </div>
        <i class="el-icon-more"></i>
      </li>
      <li class='flex-box'>
        <div class='flex-item list-icon'>
          <img src="./assets/girl.jpg">
        </div>
        <div class='flex-item'>
          <p>张三</p>
        </div>
        <i class="el-icon-more"></i>
      </li>
      <li class='flex-box'>
        <div class='flex-item list-icon'>
          <img src="./assets/girl.jpg">
        </div>
        <div class='flex-item'>
          <p>李四</p>
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
      window.location.href='/mlist';
    }
  }
}
</script>

