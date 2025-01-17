import { request } from "@/utils/service";

/** Get captcha ID GET /api/v1/captcha/id */
export async function getCaptchaID(options?: API.RequestOptions) {
  return request<API.Result<API.Captcha>>("/api/v1/captcha/id", {
    method: "GET",
    ...(options || {}),
  });
}

/** Response captcha image GET /api/v1/captcha/image */
export function getCaptchaImageURL(id: string) {
  return `/api/v1/captcha/image?id=${id}&reload=1&ts=${new Date().getTime()}`;
}

/** Login system with username and password POST /api/v1/login */
export async function login(body: API.LoginForm, options?: API.RequestOptions) {
  return request<API.Result<API.LoginToken>>("/api/v1/login", {
    method: "POST",
    data: body,
    ...(options || {}),
  });
}

/** Logout system POST /api/v1/personal/logout */
export async function logout(options?: API.RequestOptions) {
  return request<API.Result<any>>("/api/v1/personal/logout", {
    method: "POST",
    ...(options || {}),
  });
}

/** Query personal user menus based on the personal user role GET /api/v1/personal/menus */
export async function listpersonalMenus(options?: API.RequestOptions) {
  return request<API.Result<API.Menu[]>>("/api/v1/personal/menus", {
    method: "GET",
    ...(options || {}),
  });
}

/** Change personal user password PUT /api/v1/personal/password */
export async function updatepersonalPassword(body: API.UpdateLoginPassword, options?: API.RequestOptions) {
  return request<API.Result<any>>("/api/v1/personal/password", {
    method: "PUT",
    data: body,
    ...(options || {}),
  });
}

/** Refresh personal access token POST /api/v1/personal/refresh/token */
export async function refreshToken(options?: API.RequestOptions) {
  return request<API.Result<API.LoginToken>>("/api/v1/personal/refresh/token", {
    method: "POST",
    ...(options || {}),
  });
}

/** Get personal user info GET /api/v1/personal/user */
export async function getpersonalUser(options?: API.RequestOptions) {
  return request<API.Result<API.User>>("/api/v1/personal/user", {
    method: "GET",
    ...(options || {}),
  });
}

/** Change personal user info PUT /api/v1/personal/user */
export async function updatepersonalUser(body: API.User, options?: API.RequestOptions) {
  return request<API.Result<any>>("/api/v1/personal/user", {
    method: "PUT",
    data: body,
    ...(options || {}),
  });
}

/** 发送验证码 POST /api/login/captcha */
export async function getFakeCaptcha(
  params: {
    // query
    /** 手机号 */
    phone?: string;
  },
  options?: API.RequestOptions,
) {
  return request<API.FakeCaptcha>("/api/login/captcha", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
