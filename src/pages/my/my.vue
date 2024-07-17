<template>
  <uni-nav-bar :border="false"></uni-nav-bar>
  <view class="info_container">
    <image :src="userInfo?.userAvatar || '@/static/loading.png'" class="avatar" mode="scaleToFill"> </image>
    <view class="text_container">
      <view class="name"> {{ userInfo?.userName || null }}</view>
      <view class="student_number"> {{ userInfo?.userStudentNumber || null }}</view>
    </view>
  </view>
  <view class="function_container">
    <button class="btn" @click="editUserInfo">编辑个人资料</button>
    <button class="btn" @click="logout">退出登录</button>
  </view>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  import { onShow } from "@dcloudio/uni-app";
  import { getUserInfoAPI } from "@/api/userAPIs";

  const userInfo = ref<User>(<User>{});
  const popup = ref();

  const editUserInfo = () => {
    uni.navigateTo({
      url: "/pages/my/edit"
    });
  };

  onShow(() => {
    if (uni.getStorageSync("token")) {
      getUserInfoAPI(uni.getStorageSync("token")).then(userInfoRes => {
        userInfo.value = userInfoRes.data;
      });
    } else {
      uni.navigateTo({
        url: "/pages/my/login/login"
      });
    }
  });

  const logout = () => {
    uni.removeStorageSync("token");
    uni.switchTab({
      url: "/pages/index/index"
    });
  };
</script>

<style scoped>
  .info_container {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 150px;
    width: 100%;
    border-bottom: 1px solid #70707080;
  }

  .avatar {
    height: 100rpx;
    width: 100rpx;
    margin-left: 50rpx;
    border-radius: 20rpx;
  }

  .text_container {
    margin-left: 20px;
  }

  .name {
    font-size: 20px;
    font-weight: bold;
  }

  .student_number {
    font-size: 14px;
    font-weight: lighter;
    margin-top: 5px;
  }

  .function_container {
    margin-top: 20px;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 40rpx;
  }

  .btn {
    width: 600rpx;
    height: 80rpx;
    border-radius: 30rpx;
    line-height: 80rpx;
    background-color: #303030;
    color: #ebebeb;
  }
</style>
