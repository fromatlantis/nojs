<template>
  <div class="container">
    <div class='header'>
      <span class='go-back'>
        <a href="/mlist">
          <i class="el-icon-arrow-left"></i>
          返回
        </a>
      </span>
      导航信息
      <el-switch
        v-model="value"
        on-text="开"
        off-text="关"
        on-color="#13ce66">
      </el-switch>
    </div>
    <div class='flex-box'>
      <div class='flex-item paths-container'></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      password: '',
      value: true
    }
  },

  methods: {
    login () {
      window.location.href='/mlist';
    },
    goMlist() {
      window.location.href='/plist';
    }
  }
}
</script>

