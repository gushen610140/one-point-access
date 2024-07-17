<template>
  <uni-nav-bar :border="false"></uni-nav-bar>
  <uni-nav-bar :border="false" left-icon="back" @clickLeft="previousStep"></uni-nav-bar>
  <input
    v-model="updatedUserName"
    class="input_box"
    placeholder="不允许使用空白昵称"
    placeholder-class="input-placeholder"
  />
  <button class="btn" @click="updateUserName">保存</button>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  import { onShow } from "@dcloudio/uni-app";
  import { getUserInfoAPI, putUserAPI } from "@/api/userAPIs";

  const previousStep = () => {
    uni.navigateBack();
  };

  const updatedUserName = ref("");

  onShow(() => {
    getUserInfoAPI(uni.getStorageSync("token")).then(UserInfoRes => {
      const userInfo = UserInfoRes.data;
      updatedUserName.value = userInfo.userName;
    });
  });

  const updateUserName = () => {
    getUserInfoAPI(uni.getStorageSync("token")).then(UserInfoRes => {
      const userInfo = UserInfoRes.data;
      userInfo.userName = updatedUserName.value;
      putUserAPI(userInfo).then(() => {
        uni.showToast({
          title: "昵称修改成功",
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
