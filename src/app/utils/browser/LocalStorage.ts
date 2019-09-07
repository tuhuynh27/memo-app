export const LOCAL_STORAGE_KEY = {
  JWT: "memoapp_jwt",
  MEMO: "memoapp_memo"
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

interface Memo {
  id: string;
  time: number;
  data: string;
  img: string;
}

function getMemos(): Memo[] {
  const memosStr = getItem(LOCAL_STORAGE_KEY.MEMO, null);
  const memos = JSON.parse(memosStr);

  return Array.isArray(memos) && memos.length ? memos : [];
}

function saveMemos(memos: Memo[]): void {
  const memosStr = JSON.stringify(memos);
  setItem(LOCAL_STORAGE_KEY.MEMO, memosStr);
}

function addMemo(memo: Memo): void {
  const memos = getMemos();
  memos.push(memo);

  saveMemos(memos);
}

function removeMemo(memoID: string): void {
  const memos = getMemos();
  const removed = memos.filter(e => e.id !== memoID);

  saveMemos(removed);
}

export default {
  getItem,
  setItem,
  removeItem,
  clear,
  isAuthenticated,
  getJWT,
  getMemos,
  addMemo,
  removeMemo
};
