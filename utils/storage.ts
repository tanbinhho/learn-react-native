import * as SecureStore from "expo-secure-store";

type TokenType = "access" | "refresh";

const TOKEN_KEYS: Record<TokenType, string> = {
  access: "ACCESS_TOKEN",
  refresh: "REFRESH_TOKEN",
};

/**
 * ===============================
 * Token
 * ===============================
 */
export const setToken = async (token: string, type: TokenType = "access") => {
  await SecureStore.setItemAsync(TOKEN_KEYS[type], token);
};

export const getToken = async (type: TokenType = "access") => {
  return SecureStore.getItemAsync(TOKEN_KEYS[type]);
};

export const removeToken = async (type: TokenType = "access") => {
  await SecureStore.deleteItemAsync(TOKEN_KEYS[type]);
};

export const clearToken = async () => {
  await Promise.all([removeToken("access"), removeToken("refresh")]);
};

/**
 * ===============================
 * Generic storage (optional)
 * ===============================
 */
export const storage = {
  set: async (key: string, value: string) => {
    await SecureStore.setItemAsync(key, value);
  },
  get: async (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  remove: async (key: string) => {
    await SecureStore.deleteItemAsync(key);
  },
};
