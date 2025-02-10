// If HOST is empty, it will use the proxy target defined in config/proxy.ts.
export const HOST = "";
export const HOST_REQUEST_TIMEOUT = 30000;
export const START_PAGE = 0;
export const PAGE_SIZE = 15;
export const PAGE_SIZE_OPTIONS = ["5", "15", "25", "50", "100"];
export const ACCESS_TOKEN_KEY = "access_token";
export const REFRESH_TOKEN_KEY = "refresh_token";
export const USER_KEY = "user";
export const USER_ID_KEY = "user_id";
export const USERNAME_KEY = "username";
export const EXPIRATION_TIME_KEY = "expiration_time";
export const AUTHORIZATION_KEY = "authorization";

// Frontend page constants
export const DEFAULT_MAIN_PAGE = "/dashboard/overview";
export const SIGN_IN_URL = `/sign-in`;
export const SIGN_UP_URL = `/sign-up`;
export const SIGN_OUT_URL = `/sign-out`;

// Backend API constants
export const API_REFRESH_TOKEN_URL = `/auth/refresh`;
