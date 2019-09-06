import uuidv4 from "uuid/v4";

export const LOCAL_STORAGE_KEY = {
  JWT: "cfapp_jwt",
  EMAIL: "cfapp_email",
  NICKNAME: "cfapp_nickname",
  SENDER: "cfapp_sendertoken",
  NOTIFICATION: "cfapp_notification_v1",
  PUSH_ID: "cfapp_push_id"
};

function getItem(key: string, defaultValue: any): any {
  if (typeof localStorage !== "undefined") {
    return localStorage.getItem(key) || defaultValue;
  }

  return "undefined";
}

function setItem(key: string, value: any): void {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(key, value);
  }
}

function removeItem(key: string): void {
  if (typeof localStorage !== "undefined") {
    localStorage.removeItem(key);
  }
}

function clear(): void {
  if (typeof localStorage !== "undefined") {
    localStorage.clear();
  }
}

function isAuthenticated(): boolean | string {
  const jwt: string = getItem(LOCAL_STORAGE_KEY.JWT, "");
  return jwt && jwt !== "undefined";
}

function getJWT(): string {
  return getItem(LOCAL_STORAGE_KEY.JWT, "");
}

export default {
  getItem,
  setItem,
  removeItem,
  clear,
  isAuthenticated,
  getJWT
};
