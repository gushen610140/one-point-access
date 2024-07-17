<script lang="ts" setup>
  import { ref } from "vue";
  import { onLoad } from "@dcloudio/uni-app";
  import { putUserAPI } from "@/api/userAPIs";

  onLoad(option => {
    user.value.userId = option!.id;
    user.value.email = option!.email;
  });

  const user = ref<User>({
    userId: "",
    userName: "",
    userAvatar: "https://palm-zjnu.oss-cn-beijing.aliyuncs.com/default_avatar.png",
    userStudentNumber: "",
    gender: "",
    wechatNumber: "",
    password: "",
    email: ""
  });

  const confirm = () => {
    putUserAPI(user.value).then(() => {
      uni.switchTab({
        url: "/pages/index/index"
      });
    });
  };
</script>

<template>
  <uni-nav-bar :border="false"></uni-nav-bar>
  <view class="title"> 欢迎加入一点通 </view>
  <view class="introduction"> 请补充您的个人资料 </view>
  <view class="input_container">
    <uni-icons size="30" type="contact"></uni-icons>
    <input v-model="user.userName" class="input" placeholder="昵称" />
  </view>
  <view class="input_container">
    <uni-icons size="30" type="info"></uni-icons>
    <input v-model="user.userStudentNumber" class="input" placeholder="学号" />
  </view>
  <view class="input_container">
    <uni-icons size="30" type="staff"></uni-icons>
    <input v-model="user.gender" class="input" placeholder="性别" />
  </view>
  <view class="input_container">
    <uni-icons size="30" type="weixin"></uni-icons>
    <input v-model="user.wechatNumber" class="input" placeholder="微信号" />
  </view>
  <view class="input_container">
    <uni-icons size="30" type="eye-slash"></uni-icons>
    <input v-model="user.password" class="input" placeholder="密码" />
  </view>
  <button class="btn" @click="confirm">确认</button>
</template>

<style scoped>
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
    margin-top: 100rpx;
  }
</style>
