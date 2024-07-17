declare interface Banner {
  url: string;
}

declare interface Comment {
  id: string;
  userId: string;
  userName: string;
  date: string;
  content: string;
  toUserId: string;
  toUserName: string;
  momentId: string;
}

declare interface Moment {
  comments: string;
  content: string;
  date: string;
  id: string;
  images: string;
  likes: string;
  userAvatar: string;
  userId: string;
  userName: string;
}

declare interface User {
  userId: string;
  userName: string;
  userAvatar: string;
  userStudentNumber: string;
  gender: string;
  wechatNumber: string;
  password: string;
  email: string;
}

declare interface Result<T> {
  code: number;
  msg: string;
  data: T;
}

declare interface Token {
  openid: string;
  sessionKey: string;
}
