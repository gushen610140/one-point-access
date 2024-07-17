<template>
  <uni-nav-bar :border="false"></uni-nav-bar>
  <uni-nav-bar :border="false" left-icon="back" @clickLeft="previousStep"></uni-nav-bar>
  <input
    v-model="updatedStudentNumber"
    class="input_box"
    placeholder="请填写真实的学号"
    placeholder-class="input-placeholder"
  />
  <button class="btn" @click="updateStudentNumber">保存</button>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  import { onShow } from "@dcloudio/uni-app";
  import { getUserInfoAPI, putUserAPI } from "@/api/userAPIs";

  const previousStep = () => {
    uni.navigateBack();
  };

  const updatedStudentNumber = ref("");

  onShow(() => {
    getUserInfoAPI(uni.getStorageSync("token")).then(UserInfoRes => {
      const userInfo = UserInfoRes.data;
      updatedStudentNumber.value = userInfo.userStudentNumber;
    });
  });

  const updateStudentNumber = () => {
    getUserInfoAPI(uni.getStorageSync("token")).then(UserInfoRes => {
      const userInfo = UserInfoRes.data;
      userInfo.userStudentNumber = updatedStudentNumber.value;
      putUserAPI(userInfo).then(() => {
        uni.showToast({
          title: "学号修改成功",
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
