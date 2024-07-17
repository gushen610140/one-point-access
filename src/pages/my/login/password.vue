<script lang="ts" setup>
  import { ref } from "vue";
  import { loginAPI } from "@/api/userAPIs";
  import { onLoad } from "@dcloudio/uni-app";

  const email = ref("");
  onLoad(option => {
    email.value = option!.email;
  });

  const password = ref("");

  const previousStep = () => {
    uni.navigateBack();
  };

  const confirm = () => {
    loginAPI(email.value, password.value).then(userRes => {
      if (userRes.code == 400) {
        console.log(userRes);
        uni.showToast({
          title: userRes.msg,
          icon: "error"
        });
      } else {
        uni.setStorageSync("token", {
          openid: userRes.data.userId,
          sessionKey: ""
        });
        uni.switchTab({
          url: "/pages/index/index"
        });
      }
    });
  };
</script>

<template>
  <uni-nav-bar :border="false"></uni-nav-bar>
  <uni-nav-bar :border="false" left-icon="back" @clickLeft="previousStep"></uni-nav-bar>
  <view class="title">请输入您的密码:</view>
  <view class="input_container">
    <uni-icons size="30" type="locked-filled"></uni-icons>
    <input v-model="password" :password="true" class="input" placeholder="请严格保存您的密码" />
  </view>
  <button class="btn" @click="confirm">确认</button>
</template>

<style scoped>
  .title {
    font-size: 60rpx;
    font-weight: 600;
    margin-left: 50rpx;
    margin-top: 60rpx;
    color: #333;
  }

  .btn {
    width: 600rpx;
    height: 80rpx;
    border-radius: 30rpx;
    font-weight: bold;
    line-height: 80rpx;
    background-color: #303030;
    color: #ebebeb;
    margin-top: 100rpx;
  }

  .input_container {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 80rpx;
    margin-left: 40rpx;
  }

  .input {
    width: 560rpx;
    height: 80rpx;
    box-sizing: border-box;
    border: 4rpx solid #303030;
    border-radius: 40rpx;
    padding-left: 30rpx;
    padding-right: 30rpx;
    margin-left: 20rpx;
    font-size: 30rpx;
  }
</style>
