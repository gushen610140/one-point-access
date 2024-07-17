<script lang="ts" setup>
  import { ref } from "vue";
  import { onLoad } from "@dcloudio/uni-app";
  import { checkUserEmailAPI, registerUserAPI } from "@/api/userAPIs";

  const previousStep = () => {
    uni.navigateBack();
  };

  const code = ref("");

  const email = ref("");
  onLoad(option => {
    email.value = option!.email;
  });

  const confirm = () => {
    checkUserEmailAPI(email.value, code.value).then(checkRes => {
      if (checkRes.data) {
        registerUserAPI(email.value).then(userInfoRes => {
          uni.setStorageSync("token", {
            openid: userInfoRes.data.userId,
            sessionKey: ""
          });
          uni.navigateTo({
            url: `/pages/my/login/welcome?id=${userInfoRes.data.userId}&email=${userInfoRes.data.email}`
          });
        });
      } else {
        uni.showToast({
          title: "验证码无效",
          icon: "error"
        });
      }
    });
  };
</script>

<template>
  <uni-nav-bar :border="false"></uni-nav-bar>
  <uni-nav-bar :border="false" left-icon="back" @clickLeft="previousStep"></uni-nav-bar>
  <view class="title">请查看您的邮箱</view>
  <view class="introduction">验证码将在五分钟后过期</view>
  <view class="input_container">
    <uni-icons size="30" type="mail-open"></uni-icons>
    <input v-model="code" class="input" placeholder="请输入六位数验证码" />
  </view>
  <button class="btn" @click="confirm">确认</button>
</template>

<style scoped>
  .title {
    font-size: 60rpx;
    font-weight: 600;
    color: #333;
    margin-left: 40rpx;
    margin-top: 60rpx;
  }

  .introduction {
    font-size: 40rpx;
    font-weight: 400;
    color: #666;
    margin-top: 30rpx;
    margin-left: 40rpx;
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
    margin-top: 100rpx;
  }
</style>
