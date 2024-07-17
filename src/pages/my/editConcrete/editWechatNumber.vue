<template>
  <uni-nav-bar :border="false"></uni-nav-bar>
  <uni-nav-bar :border="false" left-icon="back" @clickLeft="previousStep"></uni-nav-bar>
  <input
    v-model="updatedWechatNumber"
    class="input_box"
    placeholder="您的微信号将作为联系您的方式"
    placeholder-class="input-placeholder"
  />
  <button class="btn" @click="updateWechatNumber">保存</button>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  import { onShow } from "@dcloudio/uni-app";
  import { getUserInfoAPI, putUserAPI } from "@/api/userAPIs";

  const previousStep = () => {
    uni.navigateBack();
  };

  const updatedWechatNumber = ref("");

  onShow(() => {
    getUserInfoAPI(uni.getStorageSync("token")).then(UserInfoRes => {
      const userInfo = UserInfoRes.data;
      updatedWechatNumber.value = userInfo.wechatNumber;
    });
  });

  const updateWechatNumber = () => {
    getUserInfoAPI(uni.getStorageSync("token")).then(UserInfoRes => {
      const userInfo = UserInfoRes.data;
      userInfo.wechatNumber = updatedWechatNumber.value;
      putUserAPI(userInfo).then(() => {
        uni.showToast({
          title: "微信号修改成功",
          icon: "success"
        });
        uni.navigateBack();
      });
    });
  };
</script>

<style scoped>
  .input_box {
    height: 60px;
    width: 90%;
    margin: 0 auto;
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
