<template>
  <uni-nav-bar :border="false"></uni-nav-bar>
  <uni-nav-bar :border="false" left-icon="back" @clickLeft="previousStep"></uni-nav-bar>
  <view class="publish_container">
    <image :src="userInfo?.userAvatar || '@/static/loading.png'" class="avatar"></image>
    <view style="flex: 1"></view>
    <button class="publish button" size="mini" type="primary" @click="handlePublish">发表</button>
  </view>
  <editor class="editor" placeholder="这一刻的想法..." @input="handleInput"></editor>
  <view class="image_container">
    <image
      v-for="(img, index) in imageList"
      :key="index"
      :src="img"
      class="specific"
      @click="handlePreviewImage(img)"
    ></image>
    <image v-if="!isFull" class="add" src="@/static/add_image.png" @click="handleAddImage"></image>
  </view>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  import { onLoad, onShow } from "@dcloudio/uni-app";
  import { postMomentAPI } from "@/api/momentAPIs";
  import { getUserInfoAPI } from "@/api/userAPIs";
  import { path } from "@/utils/path";
  import { date } from "@/utils/date";

  const content = ref("");

  const handleInput = (e: any) => {
    content.value = e.detail.html;
  };

  const previousStep = () => {
    uni.navigateBack();
  };

  const userInfo = ref<User>(<User>{});

  onShow(() => {
    getUserInfoAPI(uni.getStorageSync("token")).then(userInfoRes => {
      userInfo.value = userInfoRes.data;
    });
  });

  const handlePublish = () => {
    if (content.value == "" && imageList.value.length == 0) {
      uni.showToast({
        title: "内容不能为空",
        icon: "error"
      });
    } else {
      const token = uni.getStorageSync("token");
      if (!token) {
        uni.showToast({
          title: "您尚未登录，正在为您跳转至登录页面",
          icon: "none"
        });
        setTimeout(() => {
          uni.switchTab({
            url: "/pages/my/my"
          });
        }, 1500);
      } else {
        getUserInfoAPI(uni.getStorageSync("token")).then(userInfo => {
          postMomentAPI(
            userInfo.data.userId,
            userInfo.data.userName,
            userInfo.data.userAvatar,
            date(new Date()),
            content.value.replace(/<[^>]+>/g, ""),
            JSON.stringify(imageList.value),
            JSON.stringify([]),
            JSON.stringify([])
          ).then(() => {
            uni.navigateBack();
            uni.$emit("backTop");
          });
        });
      }
    }
  };

  const imageList = ref<string[]>([]);
  const isFull = ref<boolean>(false);

  const handleAddImage = () => {
    if (imageList.value.length >= 9) {
      uni.showToast({
        title: "最多只能上传9张图片",
        icon: "none"
      });
    } else {
      uni.chooseImage({
        count: 1,
        success: chooseImageRes => {
          const tempFilePaths = chooseImageRes.tempFilePaths;
          uni.uploadFile({
            url: `${path.devServer}/api/upload`,
            filePath: tempFilePaths[0],
            name: "file",
            success: uploadFileRes => {
              imageList.value.push(JSON.parse(uploadFileRes.data).data);
              if (imageList.value.length >= 9) {
                isFull.value = true;
              }
            }
          });
        }
      });
    }
  };

  const handlePreviewImage = (img: string) => {
    uni.navigateTo({
      url: `/pages/functionPages/imagePreviewPage?img=${img}`
    });
  };

  onLoad(() => {
    uni.$on("deleteImage", props => {
      imageList.value = imageList.value.filter(item => item !== props.img);
      if (imageList.value.length < 9) {
        isFull.value = false;
      }
    });
  });
</script>

<style scoped>
  .editor {
    width: 85%;
    height: 600rpx;
    margin: 50rpx auto 0;
    padding: 20rpx;
    box-shadow: 0 0 5rpx #333;
    border-radius: 10rpx;
    font-size: 35rpx;
  }
  .publish_container {
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .button {
    padding: 0;
    width: 60px;
    border: #70707080 1px solid;
    margin: 0 30px 0 0;
  }

  .avatar {
    margin-left: 30px;
    width: 35px;
    height: 35px;
    border-radius: 5px;
  }

  .image_container {
    display: grid;
    grid-template-columns: 100px 100px 100px;
    grid-template-rows: 100px 100px 100px;
    grid-gap: 5px;
    width: 310px;
    margin: 20px auto 0;
  }

  .add {
    width: 100%;
    height: 100%;
  }

  .specific {
    width: 100%;
    height: 100%;
  }
</style>
