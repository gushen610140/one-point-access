<template>
  <uni-nav-bar :border="false"></uni-nav-bar>
  <uni-nav-bar :border="false" left-icon="back" @clickLeft="previousStep"></uni-nav-bar>
  <input
    v-model="updatedGender"
    class="input_box"
    placeholder="性别不只可以填男女哦！"
    placeholder-class="input-placeholder"
  />
  <button class="btn" @click="updateGender">保存</button>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  import { onShow } from "@dcloudio/uni-app";
  import { getUserInfoAPI, putUserAPI } from "@/api/userAPIs";

  const previousStep = () => {
    uni.navigateBack();
  };

  const updatedGender = ref("");

  onShow(() => {
    getUserInfoAPI(uni.getStorageSync("token")).then(UserInfoRes => {
      const userInfo = UserInfoRes.data;
      updatedGender.value = userInfo.gender;
    });
  });

  const updateGender = () => {
    getUserInfoAPI(uni.getStorageSync("token")).then(UserInfoRes => {
      const userInfo = UserInfoRes.data;
      userInfo.gender = updatedGender.value;
      putUserAPI(userInfo).then(() => {
        uni.showToast({
          title: "性别修改成功",
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
