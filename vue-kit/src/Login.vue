<template>
  <div class="container">
    <div class="login-card">
      <el-input v-model="name" placeholder="用户名"></el-input>
      <el-input v-model="password" placeholder="密码"></el-input>
      <el-checkbox v-model="checked">记住密码</el-checkbox>
      <el-button class="full-width" type="primary" @click = "login">登录</el-button>
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
      window.location.href='/plist';
    }
  }
}
</script>

