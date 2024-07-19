import { http } from "@/utils/http";

export const version = "v1.0.1";

export const detectVersion = () => {
  http<string>({
    url: "/api/version"
  }).then((res: Result<string>) => {
    if (res.data !== version) {
      uni.showModal({
        content: `您当前使用的版本为${version}，服务器最新版本为${res.data}，点击OK复制最新版本下载链接`,
        success(button) {
          if (button.confirm) {
            uni.setClipboardData({
              data: `https://palm-zjnu.oss-cn-beijing.aliyuncs.com/${res.data}.apk.1`,
              success() {}
            });
          }
        }
      });
    }
  });
};
