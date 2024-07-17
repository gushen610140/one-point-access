<script lang="ts" setup>
  import { onLoad } from "@dcloudio/uni-app";
  import { ref } from "vue";
  import { postUserEmailAPI } from "@/api/userAPIs";

  const previousStep = () => {
    uni.navigateBack();
  };

  const email = ref("");
  onLoad(option => {
    email.value = option!.email;
  });

  const confirm = () => {
    postUserEmailAPI(email.value);
    uni.navigateTo({
      url: `/pages/my/login/code?email=${email.value}`
    });
  };
</script>

<template>
  <uni-nav-bar :border="false"></uni-nav-bar>
  <uni-nav-bar :border="false" left-icon="back" @clickLeft="previousStep"></uni-nav-bar>
  <view class="title">以此邮箱注册:</view>
  <view class="email">{{ email }}</view>
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

  .email {
    font-size: 40rpx;
    margin-left: 50rpx;
    margin-top: 20rpx;
    color: #666;
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
</style>
