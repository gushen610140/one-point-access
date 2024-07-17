<script lang="ts" setup>
  import { ref } from "vue";
  import { getUserCheckAPI } from "@/api/userAPIs";

  const email = ref("");

  const nextStep = () => {
    getUserCheckAPI(email.value).then(hasUserRes => {
      if (hasUserRes.data) {
        uni.navigateTo({
          url: `/pages/my/login/password?email=${email.value}`
        });
      } else {
        uni.navigateTo({
          url: `/pages/my/login/register?email=${email.value}`
        });
      }
    });
  };

  const previousStep = () => {
    uni.navigateBack();
  };
</script>

<template>
  <uni-nav-bar :border="false"></uni-nav-bar>
  <uni-nav-bar :border="false" left-icon="back" @clickLeft="previousStep"></uni-nav-bar>
  <view class="title"> 请问您邮箱是？ </view>
  <view class="introduction"> Can we get your email? </view>
  <view class="input_container">
    <uni-icons size="30" type="email-filled"></uni-icons>
    <input v-model="email" class="input" placeholder="xxxxxxxxxxx@email.com" />
  </view>
  <button class="btn" @click="nextStep">下一步</button>
</template>

<style scoped>
  body {
    height: 0;
  }

  .title {
    font-size: 60rpx;
    font-weight: 600;
    color: #333;
    margin-top: 60rpx;
    margin-left: 50rpx;
  }

  .introduction {
    font-size: 30rpx;
    font-weight: 400;
    color: #666;
    margin-top: 30rpx;
    margin-left: 50rpx;
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
    margin-left: 20rpx;
    font-size: 30rpx;
  }

  .btn {
    width: 600rpx;
    height: 80rpx;
    border-radius: 30rpx;
    font-weight: bold;
    line-height: 80rpx;
    background-color: #303030;
    color: #ebebeb;
    margin-top: 80rpx;
  }
</style>
