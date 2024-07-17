import { http } from "@/utils/http";

export const putUserAPI = async (updatedUser: User): Promise<Result<User>> => {
  return http<User>({
    url: "/api/user",
    method: "PUT",
    data: {
      ...updatedUser
    }
  });
};

export const getUserInfoAPI = (token: Token) => {
  return http<User>({
    url: "/api/user/info",
    method: "GET",
    data: {
      ...token
    }
  });
};

export const loginAPI = (email: string, password: string): Promise<Result<User>> => {
  return http<User>({
    url: "/api/user/login",
    method: "GET",
    data: {
      email,
      password
    }
  });
};

export const getUserCheckAPI = async (email: string) => {
  return http<boolean>({
    url: "/api/user/check",
    method: "GET",
    data: {
      email
    }
  });
};

export const postUserEmailAPI = async (email: string) => {
  return http<string>({
    url: "/api/user/email",
    method: "GET",
    data: {
      email
    }
  });
};

export const checkUserEmailAPI = async (email: string, code: string): Promise<Result<boolean>> => {
  return http<boolean>({
    url: "/api/check/email",
    method: "GET",
    data: {
      email,
      code
    }
  });
};

export const registerUserAPI = async (email: string): Promise<Result<User>> => {
  return http<User>({
    url: "/api/user/register",
    method: "GET",
    data: {
      email
    }
  });
};
