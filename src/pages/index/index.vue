<template>
  <uni-nav-bar :border="false"></uni-nav-bar>
  <view class="top_bar">
    <input v-model="searchContent" class="search_input" placeholder="在这里搜索你想看的圈子" />
    <image class="publish" mode="scaleToFill" src="@/static/index/publish.png" @click="onPublish" />
  </view>
  <view class="moments">
    <swiper :autoplay="true" :circular="true" :indicator-dots="true" class="banner">
      <swiper-item v-for="banner in bannerList" :key="banner.url">
        <image :src="banner.url" class="banner_img" mode="scaleToFill" />
      </swiper-item>
    </swiper>
    <view v-for="moment in momentList" :key="moment.id" class="moment">
      <view class="moment_container">
        <view class="avatar">
          <image :src="moment.userAvatar" class="avatar_img" mode="scaleToFill" />
        </view>
        <view class="text_container">
          <view class="user_name">{{ moment.userName }}</view>
          <view class="content" v-html="moment.content"></view>
          <view class="image_container">
            <image
              v-for="(image, index) in JSON.parse(moment.images)"
              :key="index"
              :src="image"
              class="img"
              mode="scaleToFill"
              @click="preview(image, JSON.parse(moment.images))"
            />
          </view>
          <view class="bottom_area">
            <view class="date">{{ moment.date.substring(5, 16) }} </view>
            <view class="fill" style="flex: 1"></view>
            <image class="like" src="@/static/like_red.png" @click="addLike(moment.id)"> </image>
            <view class="likes_number">{{ JSON.parse(moment.likes).length }} </view>
            <image class="comment" src="@/static/comment.png" @click="handleComment(moment)"></image>
          </view>
          <view v-if="JSON.parse(moment.comments).length > 0" class="comments_container">
            <view
              v-for="commentItem in <Comment[]>JSON.parse(moment.comments)"
              :key="commentItem.id"
              class="comment_item"
            >
              <text class="comment_name">{{ commentItem.userName }}</text>
              :
              <text class="comment_content">{{ commentItem.content }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <uni-popup ref="publishComment" type="dialog">
      <uni-popup-dialog
        :value="commentInput"
        mode="input"
        placeholder="请不要发表不当言论哦"
        title="输入评论内容"
        @confirm="dialogInputConfirm"
      ></uni-popup-dialog>
    </uni-popup>
  </view>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from "vue";
  import { onLoad, onPullDownRefresh, onReachBottom } from "@dcloudio/uni-app";
  import { getBannerListAPI } from "@/api/getBannerList";
  import { getMomentsAPI, postMomentCommentsAPI, putMomentLikesAPI } from "@/api/momentAPIs";
  import { getUserInfoAPI } from "@/api/userAPIs";
  import { generateUUID } from "@/utils/generateUUID";
  import { detectVersion } from "@/utils/version";

  const searchContent = ref("");
  const onPublish = () => {
    if (uni.getStorageSync("token")) {
      uni.navigateTo({
        url: "/pages/index/publishMoment"
      });
    } else {
      uni.showToast({
        title: "请先登录",
        icon: "error",
        success() {
          uni.switchTab({
            url: "/pages/my/my"
          });
        }
      });
    }
  };

  const bannerList = ref<Banner[]>();
  onLoad(() => {
    detectVersion();
    getBannerListAPI().then(res => {
      bannerList.value = res.data;
    });
    uni.$on("backTop", () => {
      getMomentsAPI(1, pageProperty.value.size).then(momentListRes => {
        momentList.value = momentListRes.data;
        pageProperty.value.scroll_top = Math.random();
      });
    });
  });

  const momentList = ref<Moment[]>([]);

  type PageProperty = {
    current: number;
    size: number;
    scroll_top: number;
  };

  const pageProperty = ref<PageProperty>({
    current: 1,
    size: 10,
    scroll_top: 0
  });

  onReachBottom(() => {
    pageProperty.value.current += 1;
    getMomentsAPI(pageProperty.value.current, pageProperty.value.size).then(momentListRes => {
      momentList.value = momentList.value.concat(momentListRes.data);
    });
  });

  onPullDownRefresh(() => {
    pageProperty.value.current = 1;
    getMomentsAPI(pageProperty.value.current, pageProperty.value.size).then(momentListRes => {
      momentList.value = momentListRes.data;
      pageProperty.value.scroll_top = Math.random();
    });
    uni.stopPullDownRefresh();
  });

  onMounted(() => {
    getMomentsAPI(1, pageProperty.value.size).then(momentListRes => {
      momentList.value = momentListRes.data;
    });
  });

  const preview = (cur: string, img: string[]) => {
    uni.previewImage({
      urls: img,
      current: cur
    });
  };

  const addLike = (momentId: string) => {
    const userId: string = uni.getStorageSync("token").openid;
    if (userId) {
      putMomentLikesAPI(momentId, userId).then(newLikesRes => {
        if (newLikesRes.code == 400) {
          uni.showToast({
            title: "您已经点过赞了",
            icon: "none"
          });
        } else {
          uni.showToast({
            title: "点赞成功",
            icon: "success"
          });
          momentList.value.find(moment => moment.id == momentId)!.likes = newLikesRes.data;
        }
      });
    } else {
      uni.showToast({
        title: "请先登录",
        icon: "none"
      });
    }
  };

  const publishComment = ref();
  const commentInput = ref("");
  const currentOpenedMoment = ref<Moment>();

  const handleComment = (moment: Moment) => {
    if (!uni.getStorageSync("token").openid) {
      uni.showToast({
        title: "请先登录",
        icon: "none"
      });
    } else {
      currentOpenedMoment.value = moment;
      publishComment.value.open();
    }
  };

  const dialogInputConfirm = (value: string) => {
    if (value == "") {
      uni.showToast({
        title: "评论内容不能为空",
        icon: "none"
      });
    } else if (!uni.getStorageSync("token").openid) {
      uni.showToast({
        title: "请先登录",
        icon: "none"
      });
    } else {
      getUserInfoAPI(uni.getStorageSync("token")).then(userInfoRes => {
        const comment: Comment = <Comment>{
          id: generateUUID(),
          userId: userInfoRes.data.userId,
          userName: userInfoRes.data.userName,
          date: new Date().toString(),
          content: value,
          toUserId: currentOpenedMoment.value!.userId,
          toUserName: currentOpenedMoment.value!.userName,
          momentId: currentOpenedMoment.value!.id
        };
        postMomentCommentsAPI(comment).then(newMomentRes => {
          commentInput.value = "";
          momentList.value.find(item => item.id == currentOpenedMoment.value!.id)!.comments =
            newMomentRes.data.comments;
          uni.showToast({
            title: "评论成功",
            icon: "success"
          });
        });
      });
    }
  };
</script>

<style scoped>
  .top_bar {
    margin-top: 10rpx;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .search_input {
    border: 1px solid #707070;
    height: 60rpx;
    width: 500rpx;
    border-radius: 32rpx;
    padding-left: 60rpx;
    background-image: url("@/static/search_icon.png");
    background-repeat: no-repeat;
    background-position: 10rpx center;
  }

  .publish {
    margin-left: 10rpx;
    width: 60rpx;
    height: 60rpx;
  }

  .moments {
    margin: 10rpx auto 0;
    width: 660rpx;
  }

  .banner {
    margin: 40rpx auto;
    height: 300rpx;
    width: 100%;
  }

  .banner_img {
    width: 100%;
    height: 100%;
  }

  .moment {
    width: 100%;
    border-bottom: 3rpx solid #33333380;
  }

  .moment_container {
    display: flex;
    margin-top: 20rpx;
    margin-bottom: 20rpx;
  }

  .avatar {
    width: 60rpx;
    height: 60rpx;
  }

  .avatar_img {
    width: 100%;
    height: 100%;
  }

  .text_container {
    margin-left: 20rpx;
    width: 560rpx;
    box-sizing: border-box;
  }

  .user_name {
    font-weight: bold;
  }

  .content {
    margin-top: 20rpx;
    width: 100%;
    word-wrap: break-word;
  }

  .image_container {
    display: grid;
    grid-template-columns: repeat(3, 95px);
    grid-gap: 10rpx;
    margin-top: 10rpx;
  }

  .img {
    width: 160rpx;
    height: 160rpx;
  }

  .bottom_area {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 20rpx;
  }

  .like {
    margin-right: 10rpx;
    width: 40rpx;
    height: 40rpx;
  }

  .likes_number {
    margin-right: 20rpx;
    font-size: 26rpx;
    color: #707070;
  }

  .date {
    font-size: small;
    color: #707070;
  }

  .comment {
    width: 34rpx;
    height: 34rpx;
  }

  .comments_container {
    margin-top: 20rpx;
    padding: 10rpx;
    background-color: #70707030;
    width: 560rpx;
    box-sizing: border-box;
    border-radius: 10rpx;
  }

  .comment_item {
    margin-bottom: 10rpx;
  }

  .comment_name {
    color: #053e74;
    font-size: 28rpx;
  }

  .comment_content {
    font-size: 28rpx;
  }
</style>
