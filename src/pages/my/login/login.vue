<script lang="ts" setup>
  const gotoLogin = () => {
    uni.navigateTo({
      url: "/pages/my/login/email"
    });
  };

  const gotoIndex = () => {
    uni.switchTab({
      url: "/pages/index/index"
    });
  };
</script>

<template>
  <view class="text_container">
    <view class="title">加入一点通</view>
    <view class="introduction">知我所知</view>
  </view>
  <view class="button_container">
    <button class="login btn" @click="gotoLogin">登录</button>
    <button class="register btn" @click="gotoLogin">注册</button>
    <button class="visitor btn" @click="gotoIndex">以游客方式加入</button>
  </view>
</template>

<style scoped>
  body {
    height: 0;
  }

  .text_container {
    margin: 500rpx 0 auto;
  }

  .title {
    font-size: 60rpx;
    font-weight: 600;
    color: #333;
    text-align: center;
  }

  .introduction {
    font-size: 40rpx;
    font-weight: 400;
    color: #666;
    text-align: center;
    margin-top: 30rpx;
  }

  .button_container {
    margin-top: 450rpx;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 50rpx;
  }

  .btn {
    width: 600rpx;
    height: 100rpx;
    border-radius: 30rpx;
    font-weight: bold;
    line-height: 100rpx;
  }

  .login {
    background-color: #303030;
    color: #ebebeb;
  }

  .register {
    border: 5rpx solid #303030;
    box-sizing: border-box;
    line-height: 90rpx;
    box-shadow: none;
  }

  .visitor {
    margin-top: -20rpx;
    background-color: transparent;
    font-weight: 400;
    color: #333;
  }

  .visitor::after {
    border: none;
  }
</style>
